import React from 'react';
import FormField from './FormField';
import { useStore } from '../hooks/useStore'; // Hook para gerenciar valor e validação com debounce
import { useAuthStore } from '../store/useAuthStore'; // Store de autenticação
import { required } from '../validation/required';
import { minLength } from '../validation/minLength';
import { emailValidator } from '../validation/emailValidator';

const LoginForm = () => {
  const { login } = useAuthStore(); // Função de login da authStore

  // Hook para gerenciar o campo email com debounce de 300ms
  const emailField = useStore({
    rules: [required('Email'), emailValidator], // Regras de validação para o email
    debounceTime: 300, // Debounce de 300ms
  });

  // Hook para gerenciar o campo senha com debounce de 500ms
  const passwordField = useStore({
    rules: [required('Senha'), minLength(6)], // Regras de validação para a senha
    debounceTime: 500, // Debounce de 500ms
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailField.error && !passwordField.error) {
      const fakeToken = '123456';
      login(fakeToken); // Simulação de login
      alert('Login bem-sucedido!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
