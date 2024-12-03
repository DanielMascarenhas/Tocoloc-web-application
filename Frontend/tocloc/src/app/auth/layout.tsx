import type { Metadata } from "next";
import '../globals.css';

export const metadata = {
  title: 'Cadastro',
  description: 'Descrição do meu app',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-black opacity-80 rounded-lg p-10">

      {children}
      
      </div>

    </div>
  );
}
