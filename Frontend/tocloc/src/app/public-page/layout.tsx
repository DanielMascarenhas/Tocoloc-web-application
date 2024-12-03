'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Hook de autenticação
import LogoutButton from '@/components/LogoutButton';
import Button from '@/components/Button';

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // Correção: Chamada do useRouter no componente

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 opacity-90 text-white">
      {/* Cabeçalho com tamanho fixo */}
      <header className="p-4 bg-gray-800 flex items-center justify-between">
        <a href="/" className="text-blue-400 hover:underline flex items-center">
          <img src="/tocloc.png" alt="Voltar" className="h-10 w-12 mr-2" />
        </a>

        <div className="justify-end space-x-10 bg-gray-600 rounded p-2 ">
          <Button onClick={() => router.push('/auth/login')}>Logar</Button>
          <Button onClick={() => router.push('/auth/register')}>Cadastrar</Button>
        </div>


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
