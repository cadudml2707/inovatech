import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login — AgroAmazônia Inteligente",
  description: "Acesse a plataforma de monitoramento climático para produtores rurais da Amazônia.",
};

export default function LoginPage() {
  return (
    <>
      {/* Preload hint para o browser buscar o vídeo com prioridade máxima */}
      <link
        rel="preload"
        as="video"
        href="/4013747541-preview.mp4"
        type="video/mp4"
      />
      <LoginClient />
    </>
  );
}
