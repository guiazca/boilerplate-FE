// src/components/FormField.tsx

import React, { forwardRef } from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

// Usamos `forwardRef` para passar a ref para o input
const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, type, name, value, onChange, error }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input
          ref={ref} // Passa a ref dinamicamente
          type={type}
          name={name} // O nome do campo será capturado automaticamente pela ref
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
);

export default FormField;
