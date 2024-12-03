'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';

interface Local {
  id: number;
  nome: string;
  descricao: string;
}

const VerLocais: React.FC = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para o formulário de cadastro
  const [newLocalName, setNewLocalName] = useState('');
  const [newLocalDescription, setNewLocalDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/api/locais`);
        setLocais(response.data);
      } catch (error) {
        console.error('Erro ao buscar os locais:', error);
        setError('Erro ao buscar os locais. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocais();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Editar local com ID: ${id}`);
    // Redirecione para uma página de edição ou abra um modal para editar
  };

  const handleDelete = async (id: number) => {
    const localToDelete = locais.find((local) => local.id === id);

    if (!localToDelete) {
      console.error(`Local com ID ${id} não encontrado`);
      return;
    }

    const confirmDelete = window.confirm(
      `Você tem certeza que deseja excluir o local: ${localToDelete.nome}?`
    );

    if (!confirmDelete) {
      console.log(`Exclusão cancelada para o local: ${localToDelete.nome}`);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.delete(`${apiUrl}/api/locais/${id}`);
      setLocais((prevLocais) => prevLocais.filter((local) => local.id !== id));
      console.log(`Local com nome ${localToDelete.nome} excluído com sucesso`);
    } catch (error) {
      console.error(`Erro ao excluir local com ID ${id}:`, error);
      alert('Erro ao excluir local. Tente novamente.');
    }
  };

  const handleAddLocal = async () => {
    if (!newLocalName || !newLocalDescription) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/api/locais/cadastrar`, {
        nome: newLocalName,
        descricao: newLocalDescription,
      });

      if (response.data) {
        setLocais((prevLocais) => [
          ...prevLocais,
          { id: response.data.id, nome: newLocalName, descricao: newLocalDescription },
        ]);
        setNewLocalName('');
        setNewLocalDescription('');
        setIsFormVisible(false);
        setError('');
      } else {
        setError('Erro ao cadastrar o local. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o local:', error);
      setError('Houve um problema ao tentar cadastrar o local. Tente novamente.');
    }
  };

  if (loading) return <div>Carregando locais...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Locais Disponíveis</h1>

      {/* Botão para exibir o formulário de cadastro */}
      <Button onClick={() => setIsFormVisible((prev) => !prev)}>
        {isFormVisible ? 'Cancelar Cadastro' : 'Cadastrar Novo Local'}
      </Button>

      {/* Formulário de cadastro de local */}
      {isFormVisible && (
        <div className="mt-4 bg-white p-4 rounded shadow-md">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome do local:</label>
            <input
              type="text"
              value={newLocalName}
              onChange={(e) => setNewLocalName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">Descrição do local:</label>
            <textarea
              value={newLocalDescription}
              onChange={(e) => setNewLocalDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <Button onClick={handleAddLocal}>Cadastrar</Button>
            <Button onClick={() => setIsFormVisible(false)} cor="bg-gray-500 text-white hover:bg-gray-600">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Lista de locais */}
      <ul className="space-y-4 mt-6">
        {locais.map((local) => (
          <li
            key={local.id}
            className="bg-white shadow p-4 rounded border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{local.nome}</h2>
              <p>{local.descricao}</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => handleEdit(local.id)}>Editar</Button>
              <Button
                onClick={() => handleDelete(local.id)}
                cor="bg-red-500 text-white hover:bg-red-600"
              >
                Excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerLocais;
