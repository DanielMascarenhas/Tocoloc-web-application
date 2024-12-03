import React from 'react';

interface ButtonProps {
  onClick: () => void; // Função chamada ao clicar
  children: React.ReactNode; // O conteúdo do botão
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 rounded-lg"
    >
      {children}
    </button>
  );
};

export default Button;
