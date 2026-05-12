import type { Crop } from "@/data/crops";
import { MONTH_NAMES } from "@/utils/cropRules";

interface CropTimelineProps {
  crop: Crop;
  currentMonth: number;
}

export function CropTimeline({ crop, currentMonth }: CropTimelineProps) {
  return (
    <div className="card p-5" style={{ borderLeft: "4px solid #f4b400" }}>
      <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
        Calendário Anual
      </h2>

      <div className="overflow-x-auto -mx-1 px-1">
        <div className="grid grid-cols-12 gap-1 min-w-[480px]" role="list" aria-label="Calendário de plantio e colheita">
          {MONTH_NAMES.map((name, idx) => {
            const isPlanting = crop.plantingMonths.includes(idx);
            const isHarvest = crop.harvestMonths.includes(idx);
            const isCurrent = idx === currentMonth;

            let bg = "var(--bg-card-inner)";
            let textColor = "var(--text-muted)";
            let label = "";

            if (isPlanting) {
              bg = "rgba(46,125,50,0.18)";
              textColor = "#2e7d32";
              label = "Plantio";
            } else if (isHarvest) {
              bg = "rgba(249,168,37,0.22)";
              textColor = "#f9a825";
              label = "Colheita";
            }

            return (
              <div
                key={idx}
                role="listitem"
                aria-label={`${name}: ${label || "fora da época"}${isCurrent ? " (mês atual)" : ""}`}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: isCurrent ? "#f4b400" : "var(--text-muted)",
                    fontWeight: isCurrent ? 700 : 500,
                  }}
                >
                  {name}
                </span>

                <div
                  className="w-full rounded-lg flex items-center justify-center"
                  style={{
                    height: "36px",
                    backgroundColor: bg,
                    border: isCurrent ? "2px solid #f4b400" : "2px solid transparent",
                    position: "relative",
                  }}
                >
                  {isCurrent && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f4b400",
                      }}
                      aria-hidden="true"
                    />
                  )}
                  {(isPlanting || isHarvest) && (
                    <span
                      className="text-xs font-bold"
                      style={{ color: textColor }}
                    >
                      {isPlanting ? "🌱" : "🌾"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "rgba(46,125,50,0.18)", border: "1px solid #a5d6a7" }}
            aria-hidden="true"
          />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Plantio</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "rgba(249,168,37,0.22)", border: "1px solid #f9a825" }}
            aria-hidden="true"
          />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Colheita</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-4 h-4 rounded"
            style={{ border: "2px solid #f4b400", backgroundColor: "transparent" }}
            aria-hidden="true"
          />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Mês atual</span>
        </div>
      </div>

      <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
        Ciclo médio: <strong style={{ color: "var(--text-secondary)" }}>{crop.cycleDays}</strong>
      </p>
    </div>
  );
}
