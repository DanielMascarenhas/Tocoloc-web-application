'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Para navegação no App Router
import { useAuth } from '@/context/AuthContext'; // Hook de autenticação
import Button from '@/components/Button'; // Importando o componente Button

const UsuarioPage: React.FC = () => {
  const router = useRouter(); // Hook para navegação
  const { user } = useAuth(); // Obtendo informações do usuário do contexto


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">
        Bem-vindo {user?.name ? `, ${user.name}` : ''}!
      </h1>
      <div className="space-y-4 space-x-4">
        <Button onClick={() => router.push('/usuario/minhas-reservas')}>
          Minhas Reservas
        </Button>
        <Button onClick={() => router.push('/usuario/reservar')}>
          Reservar
        </Button>
        <Button onClick={() => router.push('/usuario/ver-locais')}>
          Ver Locais
        </Button>
      </div>
    </div>
  );
};

export default UsuarioPage;
