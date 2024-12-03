'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Hook de autenticação
import LogoutButton from '@/components/LogoutButton';
import Button from '@/components/Button';

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    if (!token) {
      setUser(null);
      router.push('/auth/login');
      return;
    }

    if (!user) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setIsLoading(true);
      }
    } else {
      setIsLoading(false);
    }
  }, [user, router, setUser]);

  if (isLoading) {
    return <div className="text-white bg-black text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 opacity-90 text-white">
      {/* Cabeçalho com tamanho fixo */}
      <header className="p-4 bg-gray-800 flex items-center justify-between">
        <a href="/admin" className="text-blue-400 hover:underline flex items-center">
          <img src="/tocloc.png" alt="Voltar" className="h-10 w-12 mr-2" />
        </a>

        <nav className="flex space-x-4 gap-4">
          <Button onClick={() => router.push('/admin/reservas')} /* className="text-white hover:text-blue-400 border border-blue-400 px-4 py-2" */>
            Reservas
          </Button>
          <Button onClick={() => router.push('/admin/reservar')} >
            Reservar
          </Button>
          <Button onClick={() => router.push('/admin/locais')} >
            Locais
          </Button>
        </nav>

        <LogoutButton />
      </header>

      {/* Main flexível */}
      <main className="flex-grow p-6 bg-gray-700 overflow-auto w-screen">
        {children}
      </main>

      {/* Rodapé com tamanho fixo */}
      <footer className="p-4 bg-gray-800 text-center">
        © {new Date().getFullYear()} Tocloc. Todos os direitos reservados.
      </footer>
    </div>
  );
}
