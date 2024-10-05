// src/hooks/useStore.ts

import { useRef, useEffect } from 'react';
import { useFieldStore } from '../store/useFieldStore';
import { useValidationStore } from '../store/useValidationStore';

interface UseStoreProps {
  rules: Array<(value: string) => boolean>;
}

export const useStore = ({ rules }: UseStoreProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setFieldValue, getFieldValue } = useFieldStore();
  const { validateField, errors } = useValidationStore();

  useEffect(() => {
    if (inputRef.current) {
      const field = inputRef.current.name; // Pega o nome do campo automaticamente
      const value = getFieldValue(field);
      validateField(field, value, rules);
    }
  }, [inputRef.current?.value]);

  const setValue = (value: string) => {
    if (inputRef.current) {
      const field = inputRef.current.name;
      setFieldValue(field, value);
      validateField(field, value, rules);
    }
  };

  return {
    inputRef,
    setValue,
    value: inputRef.current ? getFieldValue(inputRef.current.name) : '',
    error: inputRef.current ? errors[inputRef.current.name] : '',
  };
};
