// src/store/useAuthStore.ts

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('auth_token'), // Verifica se o token está no localStorage
  token: localStorage.getItem('auth_token'),

  login: (token: string) => {
    set({ isAuthenticated: true, token });
    localStorage.setItem('auth_token', token);
  },

  logout: () => {
    set({ isAuthenticated: false, token: null });
    localStorage.removeItem('auth_token');
  },
}));
