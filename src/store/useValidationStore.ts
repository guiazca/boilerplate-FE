import { create } from 'zustand';

interface ValidationState {
  errors: Record<string, string | null>;
  validateField: (field: string, value: string, rules: Array<(value: string) => boolean>) => string;
}

export const useValidationStore = create<ValidationState>((set) => ({
  errors: {},

  validateField: (field, value, rules) => {
    for (const rule of rules) {
      if (!rule(value)) {
        const errorMessage = `${field} é inválido`;
        set((state) => ({
          errors: { ...state.errors, [field]: errorMessage },
        }));
        return errorMessage;
      }
    }

    set((state) => ({
      errors: { ...state.errors, [field]: '' },
    }));

    return '';
  },
}));
