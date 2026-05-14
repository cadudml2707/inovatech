"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Leaf } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-dvh flex">
      {/* ── Painel esquerdo — Formulário ── */}
      <div
        className="relative flex flex-col justify-center w-full lg:w-[45%] px-8 py-12"
        style={{ background: "var(--bg-card)" }}
      >
        {/* Toggle de tema */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="max-w-sm mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--color-forest-800)" }}
            >
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span
                className="block font-bold text-base leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                AgroAmazônia
              </span>
              <span className="block text-xs" style={{ color: "var(--text-muted)" }}>
                Inteligente
              </span>
            </div>
          </div>

          {/* Cabeçalho */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Login
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Facilite o gerenciamento de sua produção com uma ferramenta elegante e intuitiva
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo e-mail */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 text-sm outline-none transition-colors"
                style={{
                  background: "var(--bg-card-inner)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-input)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-forest-600)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            {/* Campo senha */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 text-sm outline-none transition-colors"
                style={{
                  background: "var(--bg-card-inner)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-input)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-forest-600)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                ) : (
                  <Eye className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                )}
              </button>
            </div>

            {/* Botão principal */}
            <button type="submit" className="btn-primary w-full mt-2">
              Entrar
            </button>
          </form>

          {/* Links auxiliares */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Ainda não possui conta?{" "}
              <Link
                href="#"
                className="font-semibold transition-colors hover:underline"
                style={{ color: "var(--color-forest-600)" }}
              >
                Crie uma
              </Link>
            </p>
            <Link
              href="#"
              className="text-sm font-semibold block transition-colors hover:underline"
              style={{ color: "var(--color-forest-600)" }}
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>
      </div>

      {/* ── Painel direito — Vídeo ── */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <video
          src="https://res.cloudinary.com/dpjp0lqhm/video/upload/13795748_1920_1080_60fps_xow7ok.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Overlay escuro com tom amazônico */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10, 42, 30, 0.60)" }}
        />

        {/* Conteúdo sobre o vídeo */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-12 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            AgroAmazônia
            <br />
            Inteligente
          </h2>
          <p className="text-lg opacity-80 max-w-xs leading-relaxed">
            Monitoramento climático para produtores rurais da Amazônia
          </p>

          {/* Decoração — tags de status */}
          <div className="flex gap-2 mt-8 flex-wrap justify-center">
            {["Clima em tempo real", "Alertas de risco", "Calendário agrícola"].map((label) => (
              <span
                key={label}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
