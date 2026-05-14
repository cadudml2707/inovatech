import { CheckCircle2, Clock, Scissors, Info, ExternalLink } from "lucide-react";
import type { Crop } from "@/data/crops";
import type { OpenFarmCrop } from "@/services/openFarmService";

interface PlantingCardProps {
  crop: Crop;
  score: number;
  monthStatus: "ideal" | "preparing" | "harvesting" | "offseason";
  openFarm: OpenFarmCrop | null;
}

const STATUS_CONFIG = {
  ideal: {
    label: "Pode plantar agora",
    color: "#2e7d32",
    bg: "var(--alert-safe-bg)",
    icon: <CheckCircle2 size={14} strokeWidth={2.5} />,
  },
  preparing: {
    label: "Prepare o terreno",
    color: "#1976d2",
    bg: "var(--alert-info-bg)",
    icon: <Clock size={14} strokeWidth={2.5} />,
  },
  harvesting: {
    label: "Época de colheita",
    color: "#f9a825",
    bg: "var(--alert-caution-bg)",
    icon: <Scissors size={14} strokeWidth={2.5} />,
  },
  offseason: {
    label: "Fora da época",
    color: "var(--text-muted)",
    bg: "var(--bg-card-inner)",
    icon: <Info size={14} strokeWidth={2.5} />,
  },
};

export function PlantingCard({ crop, score, monthStatus, openFarm }: PlantingCardProps) {
  const status = STATUS_CONFIG[monthStatus];
  const scoreColor =
    score >= 70 ? "#2e7d32" : score >= 50 ? "#f9a825" : "#c62828";

  const description =
    openFarm?.description?.trim()
      ? openFarm.description.slice(0, 120) + (openFarm.description.length > 120 ? "…" : "")
      : crop.description;

  return (
    <div
      className="card p-4 flex flex-col gap-3"
      style={{ height: "100%" }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: "var(--bg-sand)" }}
          aria-hidden="true"
        >
          {crop.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base leading-tight" style={{ color: "var(--text-primary)" }}>
            {crop.name}
          </h3>
          <span
            className="inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ color: status.color, backgroundColor: status.bg }}
          >
            {status.icon}
            {status.label}
          </span>
        </div>
      </div>

      {/* Descrição */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>

      {/* Fonte OpenFarm */}
      {openFarm && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          <ExternalLink size={10} className="inline mr-1" />
          Fonte: OpenFarm
        </p>
      )}

      {/* Barra de condições */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Condições favoráveis
          </span>
          <span className="text-sm font-bold" style={{ color: scoreColor }}>
            {score}%
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--border)" }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${score}%`,
              backgroundColor: scoreColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
