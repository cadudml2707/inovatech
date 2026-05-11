import { AlertTriangle, ShieldAlert, Info, ChevronRight } from "lucide-react";
import type { Alert } from "@/utils/riskRules";
import type { RiskLevel } from "@/utils/riskRules";

interface AlertCardProps {
  alerts: Alert[];
}

const LEVEL_CONFIG: Record<
  RiskLevel,
  {
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
  }
> = {
  safe: {
    icon: <Info size={22} strokeWidth={1.5} />,
    color: "#2e7d32",
    bgColor: "#e8f5e9",
    borderColor: "#a5d6a7",
    label: "Informação",
  },
  caution: {
    icon: <Info size={22} strokeWidth={1.5} />,
    color: "#f9a825",
    bgColor: "#fffde7",
    borderColor: "#fff176",
    label: "Atenção",
  },
  warning: {
    icon: <AlertTriangle size={22} strokeWidth={1.5} />,
    color: "#ef6c00",
    bgColor: "#fff3e0",
    borderColor: "#ffcc80",
    label: "Alerta",
  },
  danger: {
    icon: <ShieldAlert size={22} strokeWidth={1.5} />,
    color: "#c62828",
    bgColor: "#ffebee",
    borderColor: "#ef9a9a",
    label: "Perigo",
  },
};

function SingleAlert({ alert }: { alert: Alert }) {
  const cfg = LEVEL_CONFIG[alert.level];

  return (
    <div
      className="flex gap-4 p-4 rounded-2xl"
      style={{
        backgroundColor: cfg.bgColor,
        border: `1px solid ${cfg.borderColor}`,
      }}
      role="alert"
      aria-live={alert.level === "danger" ? "assertive" : "polite"}
    >
      {/* Ícone */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: cfg.color, color: "#fff" }}
        aria-hidden="true"
      >
        {cfg.icon}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className="tag text-xs mb-1"
              style={{
                backgroundColor: cfg.color,
                color: "#fff",
                borderRadius: "20px",
                padding: "2px 8px",
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              {cfg.label}
            </span>
            <p className="font-bold text-base mt-1" style={{ color: "#1a1a1a" }}>
              {alert.title}
            </p>
          </div>
        </div>
        <p className="text-sm mt-1" style={{ color: "#5a5f57" }}>
          {alert.description}
        </p>

        {/* Ação recomendada */}
        <div
          className="flex items-center gap-2 mt-3 p-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: cfg.color }}
        >
          <p className="text-sm font-semibold text-white flex-1">
            {alert.action}
          </p>
          <ChevronRight size={16} color="#fff" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function AlertCard({ alerts }: AlertCardProps) {
  if (alerts.length === 0) {
    return (
      <div
        className="card p-6 flex flex-col items-center gap-3 text-center"
        style={{ borderLeft: "4px solid #2e7d32" }}
        role="status"
        aria-label="Nenhum alerta ativo"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#e8f5e9" }}
          aria-hidden="true"
        >
          <Info size={32} color="#2e7d32" />
        </div>
        <div>
          <p className="font-bold text-lg" style={{ color: "#2e7d32" }}>
            Sem alertas agora
          </p>
          <p className="text-sm mt-1" style={{ color: "#5a5f57" }}>
            Condições favoráveis. Continue acompanhando a previsão.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6" style={{ borderLeft: "4px solid #ef6c00" }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>
          Alertas Ativos
        </h2>
        <span
          className="font-bold text-sm px-3 py-1 rounded-full"
          style={{ backgroundColor: "#ef6c00", color: "#fff" }}
          aria-label={`${alerts.length} alertas`}
        >
          {alerts.length}
        </span>
      </div>

      <div className="flex flex-col gap-4" role="list" aria-label="Lista de alertas">
        {alerts
          .sort((a, b) => {
            const order: Record<RiskLevel, number> = { danger: 0, warning: 1, caution: 2, safe: 3 };
            return order[a.level] - order[b.level];
          })
          .map((alert) => (
            <div key={alert.id} role="listitem">
              <SingleAlert alert={alert} />
            </div>
          ))}
      </div>
    </div>
  );
}
