'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Local {
  id: number;
  nome: string;
  descricao: string;
}

const VerLocais: React.FC = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/api/locais`); // Requisição usando axios
        setLocais(response.data); // Atualiza os locais com os dados retornados
      } catch (error) {
        console.error('Erro ao buscar os locais:', error);
        setError('Erro ao buscar os locais. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocais();
  }, []);

  if (loading) return <div>Carregando locais...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Locais Disponíveis</h1>
      <ul className="space-y-4">
        {locais.map((local) => (
          <li
            key={local.id}
            className="bg-white shadow p-4 rounded border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{local.nome}</h2>
            <p>{local.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerLocais;
