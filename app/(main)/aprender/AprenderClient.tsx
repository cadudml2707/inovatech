"use client";

import { useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { LEARN_TOPICS, type LearnBlock, type LearnSection, type LearnTopic } from "@/data/learn";

const TONE_STYLES = {
  info: {
    bg: "var(--alert-info-bg)",
    border: "var(--alert-info-border)",
    color: "var(--color-info-600)",
    icon: <Info size={18} strokeWidth={2} />,
  },
  safe: {
    bg: "var(--alert-safe-bg)",
    border: "var(--alert-safe-border)",
    color: "var(--color-safe-600)",
    icon: <CheckCircle2 size={18} strokeWidth={2} />,
  },
  caution: {
    bg: "var(--alert-caution-bg)",
    border: "var(--alert-caution-border)",
    color: "var(--color-caution-600)",
    icon: <AlertCircle size={18} strokeWidth={2} />,
  },
  warning: {
    bg: "var(--alert-warning-bg)",
    border: "var(--alert-warning-border)",
    color: "var(--color-warning-600)",
    icon: <AlertTriangle size={18} strokeWidth={2} />,
  },
} as const;

function BlockRenderer({ block }: { block: LearnBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-2" role="list">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
              style={{ backgroundColor: "rgba(76,175,80,0.18)", color: "#2e7d32" }}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "highlight") {
    const tone = TONE_STYLES[block.tone];
    return (
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{ backgroundColor: tone.bg, border: `1px solid ${tone.border}` }}
      >
        <span style={{ color: tone.color, flexShrink: 0, marginTop: "1px" }}>{tone.icon}</span>
        <div>
          {block.title && (
            <p className="font-bold text-sm" style={{ color: tone.color }}>
              {block.title}
            </p>
          )}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)", marginTop: block.title ? "0.125rem" : 0 }}
          >
            {block.text}
          </p>
        </div>
      </div>
    );
  }

  // links
  return (
    <ul className="space-y-2" role="list">
      {block.items.map((link, i) => (
        <li key={i}>
          {link.href ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 p-3 rounded-xl text-sm transition-colors duration-150"
              style={{
                backgroundColor: "var(--bg-card-inner)",
                color: "var(--color-info-600)",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-highlight)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-card-inner)";
              }}
            >
              <ExternalLink size={16} className="mt-0.5 flex-shrink-0" />
              <span className="break-words">{link.label}</span>
            </a>
          ) : (
            <div
              className="p-3 rounded-xl text-sm"
              style={{ backgroundColor: "var(--bg-card-inner)" }}
            >
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {link.label}
              </p>
              {link.note && (
                <p className="mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {link.note}
                </p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function SectionAccordion({
  section,
  isOpen,
  onToggle,
}: {
  section: LearnSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-shadow duration-150"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 lg:p-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
          style={{
            backgroundColor: isOpen ? "var(--color-sun-400)" : "var(--bg-sand)",
            color: isOpen ? "var(--color-forest-900)" : "var(--color-forest-800)",
            transition: "background-color 150ms ease",
          }}
          aria-hidden="true"
        >
          {section.number}
        </span>
        <h3
          className="flex-1 text-base lg:text-lg font-semibold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {section.title}
        </h3>
        <ChevronDown
          size={20}
          style={{
            color: "var(--text-muted)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="px-4 lg:px-5 pb-5 space-y-4"
          style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}
        >
          {section.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}

function TopicCard({
  topic,
  isActive,
  onClick,
}: {
  topic: LearnTopic;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left p-4 rounded-2xl transition-all duration-150 cursor-pointer"
      style={{
        backgroundColor: isActive ? "var(--color-forest-900)" : "var(--bg-card)",
        border: `1px solid ${isActive ? "var(--color-forest-900)" : "var(--border)"}`,
        boxShadow: isActive ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
      aria-pressed={isActive}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            backgroundColor: isActive ? "var(--color-sun-400)" : "var(--bg-sand)",
          }}
          aria-hidden="true"
        >
          {topic.emoji}
        </div>
        <div className="min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{
              color: isActive ? "var(--color-sun-300)" : "var(--text-muted)",
            }}
          >
            {topic.shortTitle}
          </p>
          <p
            className="text-sm font-semibold mt-1 leading-tight"
            style={{
              color: isActive ? "#ffffff" : "var(--text-primary)",
            }}
          >
            {topic.subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}

export function AprenderClient() {
  const [activeTopicId, setActiveTopicId] = useState<string>(LEARN_TOPICS[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    [`${LEARN_TOPICS[0].id}-0`]: true,
  });

  const topic = LEARN_TOPICS.find((t) => t.id === activeTopicId) ?? LEARN_TOPICS[0];

  const handleTopicChange = (id: string) => {
    setActiveTopicId(id);
    setOpenSections({ [`${id}-0`]: true });
  };

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    topic.sections.forEach((_, i) => {
      next[`${topic.id}-${i}`] = true;
    });
    setOpenSections(next);
  };

  const collapseAll = () => setOpenSections({});

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto" style={{ paddingTop: "4rem" }}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Aprender
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Guias práticos sobre <strong style={{ color: "var(--text-secondary)" }}>direitos, documentos e leis</strong> que valorizam o agricultor familiar.
        </p>
      </div>

      {/* Topic selector */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Escolha um tema
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEARN_TOPICS.map((t) => (
            <TopicCard
              key={t.id}
              topic={t}
              isActive={t.id === activeTopicId}
              onClick={() => handleTopicChange(t.id)}
            />
          ))}
        </div>
      </div>

      {/* Topic header */}
      <div
        className="card p-5 lg:p-6"
        style={{
          background:
            "linear-gradient(135deg, var(--color-forest-900) 0%, var(--color-forest-800) 100%)",
          color: "#fff",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            aria-hidden="true"
          >
            {topic.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl lg:text-2xl font-bold leading-tight">{topic.title}</h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>
              {topic.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Expand / Collapse controls */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          {topic.sections.length} seções
        </p>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-colors duration-150"
            style={{
              color: "var(--color-forest-800)",
              backgroundColor: "var(--bg-highlight)",
              border: "1px solid var(--border)",
            }}
          >
            Expandir tudo
          </button>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-colors duration-150"
            style={{
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            Recolher tudo
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {topic.sections.map((section, i) => {
          const key = `${topic.id}-${i}`;
          return (
            <SectionAccordion
              key={key}
              section={section}
              isOpen={!!openSections[key]}
              onToggle={() => toggleSection(key)}
            />
          );
        })}
      </div>
    </div>
  );
}
