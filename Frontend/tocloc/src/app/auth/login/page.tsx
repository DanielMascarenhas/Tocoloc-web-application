'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Hook de autenticação
import Button from '@/components/Button'; 
import Input from '@/components/Input'; 
import axios from 'axios'; 
import { useRouter } from 'next/navigation'; 

const Login: React.FC = () => {
  const { setUser } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha ambos os campos.');
      return;
    }
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/api/pessoas/buscar`, { email, password });
  
      if (response.data.success) {
        const { id, name, admin } = response.data.user;
        const { token } = response.data;
  
        // Salvar o token no localStorage
        localStorage.setItem('userToken', token);
        // Salvar os dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify({ id, name, email }));
  
        // Atualizar o contexto do usuário
        setUser({ id, name, email });
  
        // Redirecionar baseado no tipo de usuário
        if (admin) {
          router.push('/admin'); // Vai para admin
        } else {
          router.push('/usuario'); // Vai para usuário
        }
      } else {
        setError('Credenciais inválidas');
        console.log('Erro de login:', response.data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Houve um erro ao tentar fazer login. Tente novamente.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-blue-500">Login</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>} 
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} className="w-full mb-4">Login</Button>

      <div className="text-center mt-4">
        <p className="text-gray-500">
          Não tem conta?{' '}
          <a
            href="/auth/register"
            className="text-blue-500 hover:underline"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
