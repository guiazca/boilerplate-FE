// src/hooks/useStore.ts

import { useRef, useEffect } from 'react';
import { useFieldStore } from '../store/useFieldStore';
import { useValidationStore } from '../store/useValidationStore';

interface UseStoreProps {
  rules: Array<(value: string) => boolean | string>; // Regras de validação podem retornar um boolean ou uma string de erro
}

export const useStore = ({ rules }: UseStoreProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setFieldValue, getFieldValue } = useFieldStore();
  const { validateField, getError, setError } = useValidationStore();

  useEffect(() => {
    if (inputRef.current) {
      const field = inputRef.current.name;

      const value = getFieldValue(field);

      const errorMessage = validateField(field, value, rules);
      
      setError(field, errorMessage);
    }
  }, [inputRef.current?.value]);

  const setValue = (value: string) => {
    if (inputRef.current) {
      const field = inputRef.current.name;
      setFieldValue(field, value);
      const errorMessage = validateField(field, value, rules);
      setError(field, errorMessage);
    }
  };

  return {
    inputRef,
    setValue,
    value: inputRef.current ? getFieldValue(inputRef.current.name) : '',
    error: inputRef.current ? getError(inputRef.current.name) : '',
  };
};
