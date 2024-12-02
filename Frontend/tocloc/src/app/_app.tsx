// src/app/_app.tsx

import { AppProps } from 'next/app';  // Importando o tipo AppProps
import './globals.css';  // Importando os estilos globais

// Componente MyApp com a tipagem correta para AppProps
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Renderizando o componente de página atual */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
