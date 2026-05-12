import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import type { Recommendation } from "@/utils/riskRules";

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

const STATUS_CONFIG = {
  plant: {
    label: "Pode plantar agora",
    icon: <CheckCircle size={16} strokeWidth={2} />,
    color: "#2e7d32",
    bgColor: "var(--alert-safe-bg)",
  },
  ending: {
    label: "Época acabando",
    icon: <AlertTriangle size={16} strokeWidth={2} />,
    color: "#f9a825",
    bgColor: "var(--alert-caution-bg)",
  },
  wait: {
    label: "Aguardar",
    icon: <Clock size={16} strokeWidth={2} />,
    color: "var(--text-muted)",
    bgColor: "var(--bg-card-inner)",
  },
};

const CROP_EMOJIS: Record<string, string> = {
  mandioca: "🌿",
  acai:     "🫐",
  milho:    "🌽",
  cupuacu:  "🍈",
};

function FavorabilityBar({ value }: { value: number }) {
  const barColor =
    value >= 70 ? "#2e7d32" : value >= 50 ? "#f9a825" : "#ef6c00";

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Condições favoráveis
        </span>
        <span
          className="text-xs font-bold tabular-nums"
          style={{ color: barColor }}
          aria-label={`${value}% favorável`}
        >
          {value}%
        </span>
      </div>
      <div
        className="w-full h-2.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Favorabilidade: ${value}%`}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
}

export function RecommendationCard({ recommendations }: RecommendationCardProps) {
  return (
    <div className="card p-6" style={{ borderLeft: "4px solid #f4b400" }}>
      <h2 className="text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
        Recomendações de Plantio
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        role="list"
        aria-label="Culturas recomendadas"
      >
        {recommendations.map((rec) => {
          const statusCfg = STATUS_CONFIG[rec.status];
          const emoji = CROP_EMOJIS[rec.id] ?? "🌱";

          return (
            <div
              key={rec.id}
              className="p-4 rounded-2xl transition-shadow duration-200 hover:shadow-md"
              style={{
                backgroundColor: "var(--bg-card-inner)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 8px rgba(15,61,46,0.06)",
              }}
              role="listitem"
              aria-label={`${rec.crop}: ${statusCfg.label}`}
            >
              {/* Header da cultura */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: "var(--bg-sand)" }}
                  aria-hidden="true"
                >
                  {emoji}
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
                    {rec.crop}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5"
                    style={{
                      backgroundColor: statusCfg.bgColor,
                      color: statusCfg.color,
                    }}
                  >
                    <span aria-hidden="true">{statusCfg.icon}</span>
                    {statusCfg.label}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-sm" style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>
                {rec.description}
              </p>

              {/* Barra de favorabilidade */}
              <FavorabilityBar value={rec.favorability} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
