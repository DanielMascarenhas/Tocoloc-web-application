'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // usePathname para o caminho atual

interface User {
  id: string;
  name: string;
  email: string;
}

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Obtém o caminho atual da rota

  // Defina as rotas públicas
  const publicRoutes = ['/auth/login', '/auth/register', '/public-page'];

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const savedUser = localStorage.getItem('user');

    // Permitir rotas públicas sem redirecionamento
    if (publicRoutes.includes(pathname)) return;

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/auth/login'); // Redireciona para login se não for uma rota pública e não estiver autenticado
    }
  }, [pathname, router]); // Adicione pathname como dependência

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
