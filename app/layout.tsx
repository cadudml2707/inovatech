import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AgroAmazônia Inteligente — Dashboard",
  description:
    "Plataforma de monitoramento climático para produtores rurais da Amazônia. Previsão do tempo, alertas de risco e recomendações de plantio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <div className="flex min-h-dvh">
          <Sidebar />
          <main
            className="flex-1 min-w-0"
            id="main-content"
            tabIndex={-1}
            aria-label="Conteúdo principal"
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
