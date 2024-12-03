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
    <div className="min-h-screen flex flex-col items-center justify-center  text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Tocloc!</h1>
        <p className="text-xl mb-8">
          Tocloc! Tocou, locou e jogou com a melhor plataforma esportiva.
        </p>

        <Button
          onClick={handleExplore}>
          Ver locais disponíveis agora!
        </Button>
      </div>

      
    </div>
  );
};

export default Welcome;
