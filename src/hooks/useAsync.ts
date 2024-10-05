import { useCallback } from 'react';
import { useLoadingStore } from '../store/useLoadingStore';

// Hook que gerencia o estado de loading para operações assíncronas
export const useAsync = <T>(asyncFunction: () => Promise<T>) => {
  const { startLoading, stopLoading } = useLoadingStore();

  // Função que gerencia o loading automaticamente
  const execute = useCallback(async () => {
    try {
      startLoading(); // Inicia o loading
      const result = await asyncFunction(); // Executa a função assíncrona
      return result;
    } finally {
      stopLoading(); // Finaliza o loading independentemente do resultado
    }
  }, [asyncFunction, startLoading, stopLoading]);

  return { execute };
};
