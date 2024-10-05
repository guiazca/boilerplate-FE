// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore(); // Acessa diretamente a store

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password); // Chama a função de login
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}{' '}
      {/* Exibe o erro se houver */}
      {isLoading && <div>Carregando...</div>}{' '}
      {/* Exibe o spinner de carregamento */}
      <div>
        <label>Usuário</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
