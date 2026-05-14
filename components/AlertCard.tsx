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
    bgColor: "var(--alert-safe-bg)",
    borderColor: "var(--alert-safe-border)",
    label: "Informação",
  },
  caution: {
    icon: <Info size={22} strokeWidth={1.5} />,
    color: "#f9a825",
    bgColor: "var(--alert-caution-bg)",
    borderColor: "var(--alert-caution-border)",
    label: "Atenção",
  },
  warning: {
    icon: <AlertTriangle size={22} strokeWidth={1.5} />,
    color: "#ef6c00",
    bgColor: "var(--alert-warning-bg)",
    borderColor: "var(--alert-warning-border)",
    label: "Alerta",
  },
  danger: {
    icon: <ShieldAlert size={22} strokeWidth={1.5} />,
    color: "#c62828",
    bgColor: "var(--alert-danger-bg)",
    borderColor: "var(--alert-danger-border)",
    label: "Perigo",
  },
};

function SingleAlert({ alert }: { alert: Alert }) {
  const cfg = LEVEL_CONFIG[alert.level];

  return (
    <div
      className="flex gap-3 p-3 rounded-2xl"
      style={{
        backgroundColor: cfg.bgColor,
        border: `1px solid ${cfg.borderColor}`,
      }}
      role="alert"
      aria-live={alert.level === "danger" ? "assertive" : "polite"}
    >
      {/* Ícone */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: cfg.color, color: "#fff" }}
        aria-hidden="true"
      >
        {cfg.icon}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-xs"
            style={{
              backgroundColor: cfg.color,
              color: "#fff",
              borderRadius: "20px",
              padding: "1px 7px",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            {cfg.label}
          </span>
          <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            {alert.title}
          </p>
        </div>
        <p className="text-xs" style={{ color: "var(--text-secondary)", lineHeight: "1.4" }}>
          {alert.description}
        </p>

        {/* Ação recomendada */}
        <div
          className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: cfg.color }}
        >
          <p className="text-xs font-semibold text-white flex-1">
            {alert.action}
          </p>
          <ChevronRight size={14} color="#fff" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function AlertCard({ alerts }: AlertCardProps) {
  if (alerts.length === 0) {
    return (
      <div
        className="card p-4 flex items-center gap-3"
        style={{ borderLeft: "4px solid #2e7d32" }}
        role="status"
        aria-label="Nenhum alerta ativo"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--alert-safe-bg)" }}
          aria-hidden="true"
        >
          <Info size={22} color="#2e7d32" />
        </div>
        <div>
          <p className="font-bold text-base" style={{ color: "#2e7d32" }}>
            Sem alertas agora
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Condições favoráveis. Continue acompanhando a previsão.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4" style={{ borderLeft: "4px solid #ef6c00" }}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          Alertas Ativos
        </h2>
        <span
          className="font-bold text-xs px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: "#ef6c00", color: "#fff" }}
          aria-label={`${alerts.length} alertas`}
        >
          {alerts.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list" aria-label="Lista de alertas">
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
