'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean; // Indica se o usuário é administrador
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
  const pathname = usePathname();

  const publicRoutes = ['/auth/login', '/auth/register', '/public-page', '/'];
  const adminRoutes = ['/admin']; // Rotas acessíveis apenas por administradores
  const userRoutes = ['/usuario']; // Rotas acessíveis apenas por usuários comuns

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const savedUser = localStorage.getItem('user');

    if (publicRoutes.includes(pathname)) return;

    if (token && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // Verificar permissões
      if (adminRoutes.includes(pathname) && !parsedUser.admin) {
        router.push('/usuario'); // Redireciona para usuário comum se não for admin
      } else if (userRoutes.includes(pathname) && parsedUser.admin) {
        router.push('/admin'); // Redireciona para admin se for admin
      }
    } else {
      router.push('/auth/login'); // Redireciona para login
    }
  }, [pathname, router]);

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
