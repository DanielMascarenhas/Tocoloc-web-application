'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Hook de autenticação
import LogoutButton from '@/components/LogoutButton';

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useAuth(); // Pegando o estado do usuário do contexto
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const token = localStorage.getItem('userToken'); // Verificando o token no localStorage

    if (!token) {
      setUser(null); // Reseta o estado do usuário caso o token não exista
      router.push('/auth/login'); // Redireciona para login caso não tenha token
      return;
    }

    // Verificar se o usuário já está carregado
    if (!user) {
      // Caso o usuário não esteja no contexto, buscamos no localStorage e atualizamos o estado
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser)); // Atualiza o estado com o usuário salvo no localStorage
      } else {
        setIsLoading(true); // Caso contrário, mantemos a tela de carregando até encontrar o usuário
      }
    } else {
      setIsLoading(false); // Se o usuário já foi carregado, liberamos a tela
    }
  }, [user, router, setUser]);

  // Se ainda estiver carregando, mostramos um loading
  if (isLoading) {
    return <div className="text-white bg-black text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* Cabeçalho com botão de voltar, logout e menu de navegação */}
      <header className="p-4 bg-gray-800 flex items-center justify-between">
        <a href="/usuario" className="text-blue-400 hover:underline flex items-center">
          <img
            src="/tocloc.png"
            alt="Voltar"
            className="h-10 w-12 mr-2"
          />
        </a>

        {/* Menu de navegação */}
        <nav className="flex space-x-4">
          <button
            onClick={() => router.push('/usuario/minhas-reservas')}
            className="text-white hover:text-blue-400"
          >
            Minhas Reservas
          </button>
          <button
            onClick={() => router.push('/usuario/reservar')}
            className="text-white hover:text-blue-400"
          >
            Reservar
          </button>
          <button
            onClick={() => router.push('/usuario/ver-locais')}
            className="text-white hover:text-blue-400"
          >
            Ver Locais
          </button>
        </nav>

        {/* Botão de logout */}
        <LogoutButton />
      </header>

      {/* Conteúdo da página */}
      <main className="flex-grow p-6">
        {children}
      </main>

      {/* Rodapé padrão */}
      <footer className="p-4 bg-gray-800 text-center">
        © {new Date().getFullYear()} Tocloc. Todos os direitos reservados.
      </footer>
    </div>
  );
}
