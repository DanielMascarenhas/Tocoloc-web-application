import React from 'react';

interface ButtonProps {
  onClick: () => void; // Função chamada ao clicar
  children: React.ReactNode; // O conteúdo do botão
  cor?: string; // Cor personalizada opcional
}

const Button: React.FC<ButtonProps> = ({ onClick, children, cor }) => {
  const estiloPadrao = 'bg-blue-500 text-white hover:bg-blue-600';
  const estiloPersonalizado = cor || estiloPadrao;

  return (
    <button
      onClick={onClick}
      className={`${estiloPersonalizado} p-2 rounded rounded-lg`}
    >
      {children}
    </button>
  );
};

export default Button;
