// src/store/useAuthStore.ts

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,

  login: (token: string) => {
    set({ isAuthenticated: true, token });
    localStorage.setItem('auth_token', token); // Armazena o token no localStorage
  },

  logout: () => {
    set({ isAuthenticated: false, token: null });
    localStorage.removeItem('auth_token'); // Remove o token ao deslogar
  },
}));
