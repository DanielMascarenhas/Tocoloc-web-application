'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // Importa o contexto de autenticação

interface Reserva {
  id: number;
  localId: number;
  localNome: string; // Adicione esta propriedade
  dataInicio: string; // Adicione esta propriedade
  dataFim: string; // Adicione esta propriedade
}


interface Local {
  id: number;
  nome: string;
}

const MinhasReservas: React.FC = () => {
  const { user } = useAuth(); // Obtem o usuário autenticado
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [locais, setLocais] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true);

        if (!user) {
          setError('Usuário não autenticado.');
          return;
        }

        // Buscar reservas do usuário
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const reservasResponse = await axios.get(`${apiUrl}/api/reservas?userId=${user.id}`);
        setReservas(reservasResponse.data);

        // Buscar nomes dos locais
        const locaisResponse = await axios.get(`${apiUrl}/api/locais`);
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
  }, [user]);

  const handleCancelar = async (id: number) => {
    try {
      const confirm = window.confirm('Tem certeza que deseja cancelar esta reserva?');
      if (!confirm) return;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.delete(`${apiUrl}/api/reservas/${id}`);
      setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
    } catch (error) {
      console.error('Erro ao cancelar a reserva:', error);
      alert('Não foi possível cancelar a reserva. Tente novamente.');
    }
  };

  // Função para formatar a data e hora
  const formatarDataHora = (data: string) => {
    const date = new Date(data);
    return date.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) return <div>Carregando suas reservas...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Minhas Reservas</h1>
      {reservas.length === 0 ? (
        <p>Você não tem reservas.</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Local</th>
              <th className="px-4 py-2 text-left">Data Início</th>
              <th className="px-4 py-2 text-left">Data Fim</th>
              <th className="px-4 py-2 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="border-t">
                <td className="px-4 py-2">{reserva.localNome}</td>
                <td className="px-4 py-2">{formatarDataHora(reserva.dataInicio)}</td>
                <td className="px-4 py-2">{formatarDataHora(reserva.dataFim)}</td>
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
