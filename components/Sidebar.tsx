"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  MessageCircle,
  Leaf,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NAV_GROUPS = [
  {
    label: "Meu Painel",
    items: [
      { icon: <LayoutDashboard size={22} />, label: "Dashboard", href: "/" },
    ],
  },
  {
    label: "Monitoramento",
    items: [
      { icon: <CalendarDays size={22} />, label: "Calendário Agrícola", href: "/calendario-agricola" },
    ],
  },
  {
    label: "Conhecimento",
    items: [
      { icon: <BookOpen size={22} />, label: "Aprender", href: "/aprender" },
    ],
  },
];

function NavItemComponent({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-left cursor-pointer"
      style={{
        backgroundColor: isActive ? "rgba(76,175,80,0.18)" : "transparent",
        color: isActive ? "#a5d6a7" : "rgba(255,255,255,0.75)",
        borderLeft: isActive ? "3px solid #ffc107" : "3px solid transparent",
        fontWeight: isActive ? 600 : 400,
        textDecoration: "none",
      }}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      <span className="text-base">{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: "#0f3d2e" }}
    >
      {/* Logo / Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#ffc107" }}
          aria-hidden="true"
        >
          <Leaf size={22} color="#0f3d2e" />
        </div>
        <div>
          <p className="font-bold text-white text-base leading-tight">AgroAmazônia</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
            Inteligente
          </p>
        </div>
        {/* Fechar no mobile */}
        <button
          className="ml-auto lg:hidden text-white/60 hover:text-white cursor-pointer"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-6 overflow-y-auto" aria-label="Menu principal">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p
              className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItemComponent key={item.label} item={item} onClick={() => setMobileOpen(false)} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Theme Toggle + CTA */}
      <div className="p-4 flex flex-col gap-3">
        {/* Toggle de tema */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
            Aparência
          </span>
          <ThemeToggle />
        </div>

        {/* Sair */}
        <button
          onClick={() => { window.location.href = "/"; }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 cursor-pointer"
          style={{ color: "rgba(255,255,255,0.55)", backgroundColor: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
          }}
          aria-label="Sair"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>

        {/* CTA Técnico */}
        <button
          className="w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl font-semibold text-sm transition-all duration-150 cursor-pointer"
          style={{
            backgroundColor: "#c62828",
            color: "#fff",
            minHeight: "52px",
          }}
          aria-label="Falar com técnico agrícola"
        >
          <span className="flex items-center gap-2">
            <MessageCircle size={18} />
            Falar com técnico
          </span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar mobile (drawer) */}
      <aside
        className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 shadow-xl transition-transform duration-300"
        style={{
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          backgroundColor: "#0f3d2e",
        }}
        aria-label="Menu lateral"
      >
        {sidebarContent}
      </aside>

      {/* Aba lateral mobile */}
      <button
        className="lg:hidden fixed z-50 flex items-center justify-center cursor-pointer"
        style={{
          top: "15%",
          left: "0px",
          transform: "translateY(-50%)",
          width: "20px",
          height: "56px",
          backgroundColor: "#0f3d2e",
          borderRadius: "0 8px 8px 0",
          color: "#ffc107",
          transition: "opacity 300ms ease",
          boxShadow: "2px 0 8px rgba(0,0,0,0.25)",
          border: "none",
          opacity: mobileOpen ? 0 : 1,
          pointerEvents: mobileOpen ? "none" : "auto",
        }}
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={mobileOpen}
      >
        <ChevronRight size={14} strokeWidth={3} />
      </button>

      {/* Sidebar desktop (fixo) */}
      <aside
        className="hidden lg:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0"
        aria-label="Menu lateral"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
