import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Importe o AuthProvider


export const metadata: Metadata = {
  title: "Tocloc",
  description: "Descrição do meu app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Adicionando o favicon */}
        <link rel="icon" href="/tocloc.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/tocloc.png" />
      </head>
      <body
        className="h-full flex flex-col bg-[url('/Background_esportes.jpg')] bg-cover bg-fixed"
      >
        {/* Provedor de autenticação */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
