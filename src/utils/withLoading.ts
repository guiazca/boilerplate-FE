// src/utils/withLoading.ts

import { useLoadingStore } from '../store/useLoadingStore';

// Função para gerenciar automaticamente o loading
export const withLoading = async <T>(
  asyncFunction: () => Promise<T>,
): Promise<T> => {
  const { startLoading, stopLoading } = useLoadingStore.getState(); // Acessa diretamente a store

  try {
    startLoading(); // Inicia o loading
    const result = await asyncFunction(); // Executa a função assíncrona passada
    return result; // Retorna o resultado da função assíncrona
  } finally {
    stopLoading(); // Finaliza o loading
  }
};
