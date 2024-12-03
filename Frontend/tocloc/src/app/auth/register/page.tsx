'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/api/pessoas/register`, {
        nome: name,
        email,
        senha: password,
      });

      if (response.data.success) {
        setMessage('Usuário registrado com sucesso!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(response.data.message || 'Erro ao registrar usuário.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 text-center">
      <h1 className="text-xl font-bold mb-4 text-blue-500">Registrar</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
      />

      <Button
        onClick={handleRegister}
        
      >
        Registrar
      </Button>

      <div className="mt-4">
        <p className="text-gray-500">
          Já tem conta?{' '}
          <a
            href="/auth/login"
            className="text-blue-500 hover:underline"
          >
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
