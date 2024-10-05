import React from 'react';
import FormField from './FormField';
import { useStore } from '../hooks/useStore'; // Hook criado com useRef
import { useAuthStore } from '../store/useAuthStore'; // Store de autenticação
import { required } from '../validation/required';
import { minLength } from '../validation/minLength';
import { emailValidator } from '../validation/emailValidator';

const LoginForm = () => {
  const { login } = useAuthStore(); // Função de login da authStore

  // Usamos o hook `useStore` para gerenciar o estado do email
  const emailField = useStore({
    rules: [required, emailValidator], // Regras de validação para o campo de email
  });

  // Usamos o hook `useStore` para gerenciar o estado da senha
  const passwordField = useStore({
    rules: [required, minLength(6)], // Regras de validação para o campo de senha
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailField.error && !passwordField.error) {
      // Simula a obtenção de um token de autenticação
      const fakeToken = '123456'; 
      login(fakeToken); // Chama a função login da authStore
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
        ref={emailField.inputRef} // Passando a ref do campo email
      />

      {/* Campo de Senha */}
      <FormField
        label="Senha"
        type="password"
        name="password"
        value={passwordField.value}
        onChange={passwordField.setValue}
        error={passwordField.error}
        ref={passwordField.inputRef} // Passando a ref do campo senha
      />

      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
