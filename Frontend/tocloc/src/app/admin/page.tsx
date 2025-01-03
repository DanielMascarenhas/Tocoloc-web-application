'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Para navegação no App Router
// Para Page Router, use: import { useRouter } from 'next/router';
import Button from '@/components/Button'; // Importando o componente Button

const UsuarioPage: React.FC = () => {
  const router = useRouter(); // Hook para navegação

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo, Administrador!</h1>
      <div className="space-y-4 space-x-4">
        <Button onClick={() => router.push('/admin/usuarios')}>
            Usuarios
        </Button>
        <Button onClick={() => router.push('/admin/reservas')}>
          Reservas
        </Button>
        <Button onClick={() => router.push('/admin/locais')}>
          Locais
        </Button>
      </div>
    </div>
  );
};

export default UsuarioPage;
