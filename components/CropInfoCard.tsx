import { CheckCircle2, Clock, Scissors, Info } from "lucide-react";
import type { Crop } from "@/data/crops";
import type { CropMonthStatus } from "@/utils/cropRules";

interface CropInfoCardProps {
  crop: Crop;
  monthStatus: CropMonthStatus;
}

export function CropInfoCard({ crop, monthStatus }: CropInfoCardProps) {
  const STATUS_ICON = {
    ideal: <CheckCircle2 size={18} strokeWidth={2} />,
    preparing: <Clock size={18} strokeWidth={2} />,
    harvesting: <Scissors size={18} strokeWidth={2} />,
    offseason: <Info size={18} strokeWidth={2} />,
  };

  return (
    <div className="card p-5 flex flex-col gap-5 h-full">
      {/* Header da cultura */}
      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ backgroundColor: "var(--bg-sand)" }}
          aria-hidden="true"
        >
          {crop.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            {crop.name}
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>
            {crop.description}
          </p>
        </div>
      </div>

      {/* Status do mês atual */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{
          backgroundColor: monthStatus.bgColor,
          border: `1px solid`,
          borderColor: monthStatus.color,
        }}
        role="status"
        aria-live="polite"
      >
        <span style={{ color: monthStatus.color, flexShrink: 0, marginTop: "1px" }}>
          {STATUS_ICON[monthStatus.status]}
        </span>
        <div>
          <p className="font-bold text-sm" style={{ color: monthStatus.color }}>
            {monthStatus.label}
          </p>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
            {monthStatus.description}
          </p>
        </div>
      </div>

      {/* Cuidados principais */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-muted)" }}>
          Cuidados Principais
        </h3>
        <ul className="space-y-2" role="list">
          {crop.mainCare.map((care, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(76,175,80,0.18)", color: "#2e7d32" }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              {care}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
