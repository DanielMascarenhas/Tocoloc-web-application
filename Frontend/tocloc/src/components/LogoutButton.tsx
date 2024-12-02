'use client';

import { useRouter } from 'next/navigation'; // Importa o hook de navegação do Next.js
import { useAuth } from '@/context/AuthContext'; // Importa o contexto de autenticação
import React from 'react';

const LogoutButton: React.FC = () => {
  const router = useRouter(); // Hook de navegação
  const { logout } = useAuth(); // Usa o método `logout` diretamente do contexto

  const handleLogout = () => {
    // Chama a função de logout definida no AuthContext
    logout();

    // Redireciona para a página de login
    router.push('/auth/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300 ease-in-out"
    >
      Sair
    </button>
  );
};

export default LogoutButton;
