// src/store/useLoadingStore.ts

import { LoadingState } from 'constants/loadingState';
import { create } from 'zustand';

interface LoadingStore {
  loadingState: LoadingState;
  activeRequests: number; // Contador de requisições ativas
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>(set => ({
  loadingState: LoadingState.IDLE,
  activeRequests: 0, // Inicializa sem requisições ativas

  startLoading: () =>
    set(state => {
      const newActiveRequests = state.activeRequests + 1;
      return {
        activeRequests: newActiveRequests,
        loadingState: LoadingState.LOADING, // Loading é ativado se houver ao menos uma operação
      };
    }),

  stopLoading: () =>
    set(state => {
      const newActiveRequests = state.activeRequests - 1;
      return {
        activeRequests: newActiveRequests,
        loadingState:
          newActiveRequests === 0 ? LoadingState.IDLE : LoadingState.LOADING, // Loading desativado se não houver operações
      };
    }),
}));
