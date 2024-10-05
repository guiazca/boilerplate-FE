// src/components/LoginForm.tsx

import React from 'react';
import FormField from './FormField';
import { useStore } from '../hooks/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { useAsync } from '../hooks/useAsync'; // Importa o hook useAsync
import { useLoadingStore } from '../store/useLoadingStore';
import { required } from '../validation/required';
import { minLength } from '../validation/minLength';
import { emailValidator } from '../validation/emailValidator';
import { LoadingState } from 'constants/loadingState';

const LoginForm = () => {
  const { login } = useAuthStore();
  const { loadingState } = useLoadingStore(); // Estado de loading

  // Hook para gerenciar o campo email
  const emailField = useStore({
    rules: [required('Email'), emailValidator],
  });

  // Hook para gerenciar o campo senha
  const passwordField = useStore({
    rules: [required('Senha'), minLength(6)],
  });

  // Função de login com gerenciamento de loading automático
  const { execute } = useAsync(async () => {
    const fakeToken: string = await new Promise(resolve =>
      setTimeout(() => resolve('123456'), 2000),
    );
    login(fakeToken); // Simula a função de login
    alert('Login bem-sucedido!');
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailField.error && !passwordField.error) {
      await execute(); // Chama a função de login com loading automático
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* Exibe um spinner enquanto está carregando */}
      {loadingState === LoadingState.LOADING && <div>Carregando...</div>}

      {/* Campo de Email */}
      <FormField
        label="Email"
        type="email"
        name="email"
        value={emailField.value}
        onChange={emailField.setValue}
        error={emailField.error}
        ref={emailField.inputRef} // Ref do campo email
      />

      {/* Campo de Senha */}
      <FormField
        label="Senha"
        type="password"
        name="password"
        value={passwordField.value}
        onChange={passwordField.setValue}
        error={passwordField.error}
        ref={passwordField.inputRef} // Ref do campo senha
      />

      <button type="submit" disabled={loadingState === LoadingState.LOADING}>
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
