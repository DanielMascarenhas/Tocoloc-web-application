import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string; // Propriedade opcional para um label
  textColor?: string; // Nova propriedade para a cor do texto
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, label, textColor }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400`}
      />
    </div>
  );
};


export default Input;
