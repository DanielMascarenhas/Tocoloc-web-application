'use client';

import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
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
      const response = await axios.post('/api/register', { name, email, password });

      if (response.data.success) {
        setMessage('Usuário registrado com sucesso!');
      } else {
        setMessage(response.data.message || 'Erro ao registrar usuário.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Registrar</h1>
      {message && <p className="text-red-500">{message}</p>}
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

      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Registrar
      </button>
    </div>
  );
};

export default Register;
