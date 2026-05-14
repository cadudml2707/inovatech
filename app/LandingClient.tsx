"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Leaf, Cloud, CloudRain, Thermometer, Wind, ArrowRight,
  ChevronDown, CheckCircle2, BarChart3, Bell, Calendar,
  Sprout, Shield, Zap,
} from "lucide-react";

// ── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,42,30,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
          >
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="block font-bold text-white text-sm leading-none">AgroAmazônia</span>
            <span className="block text-xs leading-none" style={{ color: "rgba(255,255,255,0.5)" }}>
              Inteligente
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Funcionalidades", href: "#funcionalidades" },
            { label: "Como funciona", href: "#como-funciona" },
            { label: "Impacto", href: "#impacto" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-semibold transition-colors"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Entrar
          </Link>
          <Link
            href="/login"
            className="btn-primary"
            style={{ minHeight: "38px", fontSize: "0.875rem", padding: "0 1.125rem" }}
          >
            Começar grátis
          </Link>
        </div>
      </nav>
    </header>
  );
}

// ── Floating card (hero) ─────────────────────────────────────────────────────

function FloatingCard({
  icon,
  label,
  value,
  sub,
  style,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{
        background: "rgba(255,255,255,0.09)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.09)" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
          {label}
        </p>
        <p className="text-lg font-bold text-white leading-tight">{value}</p>
        {sub && (
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-dvh flex flex-col overflow-hidden"
      style={{ background: "#0a2a1e" }}
    >
      <video
        src="/video_landing_page.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,42,30,0.93) 0%, rgba(10,42,30,0.72) 55%, rgba(5,15,10,0.92) 100%)",
        }}
      />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 pt-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100dvh-4rem)]">
            {/* Left — copy */}
            <div className="flex flex-col justify-center py-20 lg:py-0">
              {/* <div
                className="inline-flex items-center gap-2 mb-6 self-start px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(244,180,0,0.13)",
                  color: "#f4b400",
                  border: "1px solid rgba(244,180,0,0.22)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Monitoramento em tempo real
              </div> */}

              <h1
                className="text-5xl lg:text-6xl xl:text-[4.25rem] font-black leading-[0.93] tracking-tight text-white mb-6"
              >
                Cultive com<br />
                <span style={{ color: "#f4b400" }}>inteligência</span><br />
                na Amazônia.
              </h1>

              <p
                className="text-lg leading-relaxed mb-8 max-w-md"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                Dados climáticos em tempo real, alertas de risco e calendário agrícola
                personalizados para produtores rurais da Amazônia.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/login" className="btn-primary flex items-center gap-2">
                  Começar grátis <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#como-funciona"
                  className="btn-secondary flex items-center gap-2"
                  style={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.22)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  Ver como funciona
                </a>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {["Clima em tempo real", "Alertas de risco", "Calendário agrícola"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — floating dashboard */}
            <div className="hidden lg:flex items-center justify-center relative h-[520px]">
              <FloatingCard
                icon={<Thermometer className="w-5 h-5" style={{ color: "#f4b400" }} />}
                label="Temperatura"
                value="32 °C"
                sub="Máx. hoje: 35 °C"
                style={{ top: "8%", left: "2%" }}
              />
              <FloatingCard
                icon={<CloudRain className="w-5 h-5" style={{ color: "#64b5f6" }} />}
                label="Precipitação"
                value="18 mm"
                sub="Próx. 24 h"
                style={{ top: "26%", right: "0%" }}
              />
              <FloatingCard
                icon={<Wind className="w-5 h-5" style={{ color: "#a5d6a7" }} />}
                label="Vento"
                value="12 km/h"
                sub="NE · Estável"
                style={{ bottom: "30%", left: "0%" }}
              />

              {/* Central status card */}
              <div
                className="rounded-3xl p-6 w-60"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(22px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#4caf50", boxShadow: "0 0 6px #4caf50" }}
                  />
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Situação atual
                  </span>
                </div>
                <p className="text-3xl font-black text-white mb-1">Favorável</p>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Ótimo para plantio de mandioca
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: "Umidade", value: "78 %", color: "#64b5f6" },
                    { label: "Índice UV", value: "Alto", color: "#f4b400" },
                    { label: "Risco chuva", value: "Baixo", color: "#4caf50" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between items-center text-xs">
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{label}</span>
                      <span className="font-semibold" style={{ color }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert badge */}
              <div
                className="absolute rounded-2xl px-4 py-3"
                style={{
                  bottom: "8%",
                  right: "4%",
                  background: "rgba(244,180,0,0.13)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(244,180,0,0.22)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" style={{ color: "#f4b400" }} />
                  <span className="text-xs font-semibold text-white">Alerta emitido</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Chuvas intensas em 48 h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Role para explorar
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
        </div>
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Icon: Cloud,
    title: "Clima em Tempo Real",
    description:
      "Dados meteorológicos atualizados a cada hora para sua localização exata na Amazônia — temperatura, umidade e precipitação.",
    accent: "#64b5f6",
  },
  {
    Icon: Bell,
    title: "Alertas de Risco",
    description:
      "Notificações antecipadas sobre chuvas intensas, secas e ventos fortes antes que afetem sua produção.",
    accent: "#f4b400",
  },
  {
    Icon: Calendar,
    title: "Calendário Agrícola",
    description:
      "Planejamento de plantio e colheita com base no clima histórico e previsões sazonais para cada cultura.",
    accent: "#4caf50",
  },
  {
    Icon: Sprout,
    title: "Recomendações de Plantio",
    description:
      "IA analisa as condições atuais e sugere as melhores culturas e práticas para maximizar produtividade.",
    accent: "#a5d6a7",
  },
  {
    Icon: BarChart3,
    title: "Análise de Dados",
    description:
      "Visualize histórico climático e tendências para tomar decisões embasadas em dados concretos da sua região.",
    accent: "#f06292",
  },
  {
    Icon: Shield,
    title: "Gestão de Riscos",
    description:
      "Semáforo visual e pontuação de risco para avaliar rapidamente a situação do seu campo a qualquer momento.",
    accent: "#ff7043",
  },
];

function Features() {
  return (
    <section id="funcionalidades" className="py-24" style={{ background: "#0d1a12" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#2d7a53" }}
          >
            Funcionalidades
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 mb-4">
            Tudo que o produtor<br />rural precisa
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.52)" }}>
            Uma plataforma completa de inteligência climática pensada para a realidade do campo amazônico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, description, accent }) => (
            <div
              key={title}
              className="rounded-2xl p-6 transition-all duration-200 cursor-default"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.065)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${accent}1a` }}
              >
                <Icon className="w-6 h-6" style={{ color: accent }} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    Icon: Zap,
    title: "Informe sua localização",
    description:
      "Selecione o município ou deixe o GPS detectar automaticamente. Salvamos seu perfil para recomendações personalizadas.",
  },
  {
    n: "02",
    Icon: Cloud,
    title: "Monitore o clima",
    description:
      "Veja previsões horárias, diárias e semanais, além de alertas automáticos para eventos que impactam sua lavoura.",
  },
  {
    n: "03",
    Icon: Sprout,
    title: "Plante com confiança",
    description:
      "Consulte o calendário agrícola inteligente e receba recomendações de cultivo baseadas nas condições reais do seu campo.",
  },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24" style={{ background: "#0a2a1e" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#2d7a53" }}
          >
            Como funciona
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-3">
            Simples como plantar<br />uma semente
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          <div
            className="hidden md:block absolute h-px"
            style={{
              top: "52px",
              left: "calc(16.67% + 2rem)",
              right: "calc(16.67% + 2rem)",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
          />

          {STEPS.map(({ n, Icon, title, description }) => (
            <div key={n} className="flex flex-col items-center text-center">
              <div
                className="w-[6.5rem] h-[6.5rem] rounded-3xl flex flex-col items-center justify-center mb-6 relative z-10 gap-1"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Icon className="w-7 h-7" style={{ color: "#f4b400" }} />
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {n}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "500+", label: "Produtores atendidos", sub: "em toda a Amazônia Legal" },
  { value: "12", label: "Estados cobertos", sub: "na região amazônica" },
  { value: "98 %", label: "Acurácia nas previsões", sub: "validada por estações locais" },
];

function Stats() {
  return (
    <section
      id="impacto"
      className="py-20"
      style={{
        background: "#0d1a12",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {STATS.map(({ value, label, sub }) => (
            <div key={label}>
              <p className="text-6xl font-black mb-2" style={{ color: "#f4b400" }}>
                {value}
              </p>
              <p className="text-lg font-semibold text-white mb-1">{label}</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Final ─────────────────────────────────────────────────────────────────

function CtaFinal() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#0a2a1e" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(45,122,83,0.22) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Leaf className="w-8 h-8" style={{ color: "#f4b400" }} />
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          Comece a cultivar com<br />inteligência hoje
        </h2>
        <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.58)" }}>
          Gratuito para produtores rurais da Amazônia. Sem cartão de crédito.
        </p>
        <Link href="/login" className="btn-primary inline-flex items-center gap-2 text-base">
          Criar conta gratuita <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {["Sem custo inicial", "Dados em tempo real", "Suporte em português"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-1.5 text-sm"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#4caf50" }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="py-10"
      style={{
        background: "#040d08",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">AgroAmazônia Inteligente</span>
        </div>

        <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.32)" }}>
          © 2025 AgroAmazônia Inteligente. Todos os direitos reservados.
        </p>

        <div className="flex gap-6">
          {["Privacidade", "Termos", "Contato"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs transition-colors"
              style={{ color: "rgba(255,255,255,0.38)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

export default function LandingClient() {
  return (
    <div style={{ background: "#0a2a1e" }}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <CtaFinal />
      <Footer />
    </div>
  );
}
