'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginLayout from '@/app/usuario/layout';

interface Reserva {
  id: number;
  localId: number;
  userId: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

interface Local {
  id: number;
  nome: string;
}

const MinhasReservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [locais, setLocais] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = 1; // Substitua pelo ID do usuário autenticado (ex.: contexto, token, etc.)

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true);

        // Buscar reservas do usuário
        const reservasResponse = await axios.get(`/api/reservas?userId=${userId}`);
        setReservas(reservasResponse.data);

        // Buscar nomes dos locais
        const locaisResponse = await axios.get('/api/locais');
        const locaisMap: Record<number, string> = {};
        locaisResponse.data.forEach((local: Local) => {
          locaisMap[local.id] = local.nome;
        });
        setLocais(locaisMap);
      } catch (error) {
        console.error('Erro ao buscar reservas ou locais:', error);
        setError('Não foi possível carregar suas reservas.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [userId]);

  const handleCancelar = async (id: number) => {
    try {
      const confirm = window.confirm('Tem certeza que deseja cancelar esta reserva?');
      if (!confirm) return;

      // Chamar API para deletar a reserva
      await axios.delete(`/api/reservas/${id}`);

      // Atualizar a lista de reservas localmente após deletar
      setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
    } catch (error) {
      console.error('Erro ao cancelar a reserva:', error);
      alert('Não foi possível cancelar a reserva. Tente novamente.');
    }
  };

  if (loading) return <div>Carregando suas reservas...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Reservas</h1>
      {reservas.length === 0 ? (
        <p>Você não tem reservas.</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Local</th>
              <th className="px-4 py-2 text-left">Data Início</th>
              <th className="px-4 py-2 text-left">Hora Início</th>
              <th className="px-4 py-2 text-left">Data Fim</th>
              <th className="px-4 py-2 text-left">Hora Fim</th>
              <th className="px-4 py-2 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="border-t">
                <td className="px-4 py-2">{reserva.id}</td>
                <td className="px-4 py-2">{locais[reserva.localId] || 'Local não encontrado'}</td>
                <td className="px-4 py-2">{reserva.startDate}</td>
                <td className="px-4 py-2">{reserva.startTime}</td>
                <td className="px-4 py-2">{reserva.endDate}</td>
                <td className="px-4 py-2">{reserva.endTime}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleCancelar(reserva.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MinhasReservas;
