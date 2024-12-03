// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Importe o AuthProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tocloc",
  description: "Descrição do meu app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
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
