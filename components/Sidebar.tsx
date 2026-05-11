"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Bell,
  Sprout,
  BookOpen,
  MessageCircle,
  Leaf,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NAV_GROUPS = [
  {
    label: "Meu Painel",
    items: [
      { icon: <LayoutDashboard size={22} />, label: "Dashboard", active: true },
    ],
  },
  {
    label: "Monitoramento",
    items: [
      { icon: <Bell size={22} />, label: "Alertas" },
      { icon: <Sprout size={22} />, label: "Plantio" },
    ],
  },
  {
    label: "Conhecimento",
    items: [
      { icon: <BookOpen size={22} />, label: "Aprender" },
    ],
  },
];

function NavItemComponent({ item }: { item: NavItem }) {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-left cursor-pointer"
      style={{
        backgroundColor: item.active ? "rgba(76,175,80,0.18)" : "transparent",
        color: item.active ? "#a5d6a7" : "rgba(255,255,255,0.75)",
        borderLeft: item.active ? "3px solid #ffc107" : "3px solid transparent",
        fontWeight: item.active ? 600 : 400,
      }}
      aria-current={item.active ? "page" : undefined}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      <span className="text-base">{item.label}</span>
    </button>
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
          className="ml-auto lg:hidden text-white/60 hover:text-white"
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
                <NavItemComponent key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* CTA Técnico */}
      <div className="p-4">
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
      {/* Botão hamburguer mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-11 h-11 flex items-center justify-center rounded-xl shadow-md"
        style={{ backgroundColor: "#0f3d2e", color: "#fff" }}
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={mobileOpen}
      >
        <Menu size={22} />
      </button>

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
