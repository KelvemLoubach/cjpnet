import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CJP NET - Soluções Digitais para Operações Corporativas",
  description: "Desenvolvemos plataformas digitais sob medida para empresas que precisam centralizar informações, automatizar processos, integrar sistemas e estruturar operações com segurança, estabilidade e visão gerencial.",
  keywords: ["CJP NET", "Soluções Digitais", "SaaS", "Integração", "Governança", "Plataformas Corporativas", "Indicadores Estratégicos"],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
