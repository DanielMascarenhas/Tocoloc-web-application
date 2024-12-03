'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext'; // Hook de autenticação
import Button from '@/components/Button'; 
import { useRouter } from 'next/navigation';

const Welcome: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleExplore = () => {
    router.push('/public-page'); // Altere a rota para sua página de exploração
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Tocloc!</h1>
        <p className="text-xl mb-8">
          É hora de tocar, locar e jogar com a melhor plataforma esportiva.
        </p>

        <Button
          onClick={handleExplore}>
          Ver locais disponíveis agora!
        </Button>
      </div>

      <footer className="absolute bottom-4 text-center">
        <p className="text-sm text-gray-200">
          Precisa de ajuda?{' '}
          <a href="/ajuda" className="underline text-white">
            Clique aqui
          </a>
        </p>
        <button
          onClick={logout}
          className="mt-2 text-sm text-red-500 underline hover:text-red-600"
        >
          Sair
        </button>
      </footer>
    </div>
  );
};

export default Welcome;
