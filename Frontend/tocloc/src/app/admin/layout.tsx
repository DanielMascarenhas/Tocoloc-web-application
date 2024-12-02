import type { Metadata } from "next";
import '../globals.css';

export const metadata = {
  title: 'Login',
  description: 'Descrição do meu app',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black">
      {children}
    </div>
  );
}
