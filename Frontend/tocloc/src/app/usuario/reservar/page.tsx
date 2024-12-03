'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '@/components/Input'; // Importa o componente Input
import Button from '@/components/Button'; // Importa o componente Button
import { useRouter } from 'next/navigation'; // Importando o useRouter
import { useAuth } from '@/context/AuthContext'; // Importando o contexto de autenticação

interface Local {
  id: number;
  nome: string;
}

const ReservarLocais: React.FC = () => {
  const { user } = useAuth(); // Pegando o usuário do contexto
  const router = useRouter(); // Definindo o router aqui
  const [locais, setLocais] = useState<Local[]>([]);
  const [selectedLocal, setSelectedLocal] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState(''); // Hora de início
  const [endTime, setEndTime] = useState(''); // Hora de término
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Busca os locais no banco de dados ao carregar a página
  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/api/locais`);
        setLocais(response.data);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
        setError('Erro ao carregar os locais. Tente novamente.');
      }
    };

    fetchLocais();
  }, []);

  const handleSubmit = async () => {
    if (!user || !user.id) {
      alert('Você precisa estar logado para realizar uma reserva.');
      router.push('/auth/login');
      return;
    }
  
    if (!selectedLocal || !startDate || !endDate || !startTime || !endTime) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
      // Realiza a reserva
      const reservaResponse = await axios.post(`${apiUrl}/api/reservas/reservar`, {
        localId: Number(selectedLocal),
        startDate,
        endDate,
        startTime,
        endTime,
        pessoaId: Number(user.id),
      });
  
      if (reservaResponse.data.success) {
        setSuccess('Reserva realizada com sucesso!');
        setError('');
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
        setSelectedLocal(null);
      } else {
        setError('Erro ao realizar a reserva. Tente novamente.');
      }
    } catch (error: any) {
      console.error('Erro ao validar ou realizar reserva:', error);
  
      // Verifica se existe uma mensagem de erro vinda do backend
      const backendMessage =
        error.response?.data?.message || 'Houve um problema ao tentar realizar a reserva. Tente novamente.';
  
      setError(backendMessage);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Reservar Locais</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <div className="space-y-4">
        {/* Campo de seleção de local */}
        <div>
          <label className="block text-sm font-semibold mb-2">Escolha o local:</label>
          <select
            value={selectedLocal || ''}
            onChange={(e) => setSelectedLocal(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              -- Selecione um local --
            </option>
            {locais.map((local) => (
              <option key={local.id} value={local.id}>
                {local.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Data de início */}
        <div>
          <label className="block text-sm font-semibold mb-2">Data de início:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Data de término */}
        <div>
          <label className="block text-sm font-semibold mb-2">Data de término:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Hora de início */}
        <div>
          <label className="block text-sm font-semibold mb-2">Hora de início:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* Hora de término */}
        <div>
          <label className="block text-sm font-semibold mb-2">Hora de término:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Botão de envio */}
        <Button onClick={handleSubmit}>Reservar</Button>
      </div>
    </div>
  );
};

export default ReservarLocais;
