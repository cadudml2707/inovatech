import { ShieldCheck, AlertTriangle, AlertOctagon, ShieldAlert } from "lucide-react";
import type { RiskAssessment } from "@/utils/riskRules";

interface RiskSemaphoreProps {
  assessment: RiskAssessment;
}

const LEVEL_CONFIG = {
  safe: {
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg, #2e7d32, #4caf50)",
    label: "Tudo Certo",
  },
  caution: {
    icon: <AlertTriangle size={40} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg, #f9a825, #ffd54f)",
    label: "Atenção",
  },
  warning: {
    icon: <AlertOctagon size={40} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg, #ef6c00, #ffa726)",
    label: "Risco Moderado",
  },
  danger: {
    icon: <ShieldAlert size={40} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg, #c62828, #ef5350)",
    label: "Risco Alto",
  },
};

const ALL_LEVELS: Array<"safe" | "caution" | "warning" | "danger"> = [
  "safe",
  "caution",
  "warning",
  "danger",
];

const LEVEL_LABELS: Record<string, string> = {
  safe:    "Seguro",
  caution: "Atenção",
  warning: "Alerta",
  danger:  "Perigo",
};

const LEVEL_COLORS: Record<string, string> = {
  safe:    "#2e7d32",
  caution: "#f9a825",
  warning: "#ef6c00",
  danger:  "#c62828",
};

export function RiskSemaphore({ assessment }: RiskSemaphoreProps) {
  const config = LEVEL_CONFIG[assessment.level];
  const activeIndex = ALL_LEVELS.indexOf(assessment.level);

  return (
    <div
      className="card p-6 flex flex-col gap-5"
      style={{ borderLeft: `4px solid ${assessment.color}` }}
      aria-label={`Semáforo de risco: ${assessment.label}`}
      role="status"
    >
      <h2 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>
        Semáforo de Risco
      </h2>

      {/* Ícone central + nível */}
      <div className="flex items-center gap-5">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: config.gradient, color: "#fff" }}
          aria-hidden="true"
        >
          {config.icon}
        </div>
        <div>
          <p
            className="text-2xl font-bold leading-tight"
            style={{ color: assessment.color }}
          >
            {assessment.label}
          </p>
          <p className="text-base mt-1" style={{ color: "#5a5f57" }}>
            {assessment.description}
          </p>
        </div>
      </div>

      {/* Semáforo visual (4 níveis) */}
      <div
        className="flex items-center gap-2 pt-4"
        style={{ borderTop: "1px solid #e8eae6" }}
        role="presentation"
        aria-hidden="true"
      >
        {ALL_LEVELS.map((level, i) => (
          <div key={level} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i <= activeIndex ? LEVEL_COLORS[level] : "#e8eae6",
                opacity: i <= activeIndex ? 1 : 0.4,
              }}
            />
            <span
              className="text-xs font-medium"
              style={{
                color: i === activeIndex ? LEVEL_COLORS[level] : "#8a8f87",
                fontWeight: i === activeIndex ? 700 : 400,
              }}
            >
              {LEVEL_LABELS[level]}
            </span>
          </div>
        ))}
      </div>

      {/* Dica rápida */}
      {assessment.level !== "safe" && (
        <div
          className="flex items-start gap-3 p-3 rounded-xl text-sm"
          style={{
            backgroundColor: assessment.bgColor,
            border: `1px solid ${assessment.borderColor}`,
          }}
        >
          <AlertTriangle size={18} color={assessment.color} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p style={{ color: assessment.color, fontWeight: 500 }}>
            Verifique os alertas abaixo e tome as medidas recomendadas.
          </p>
        </div>
      )}
    </div>
  );
}
