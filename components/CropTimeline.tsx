import type { Crop } from "@/data/crops";
import { MONTH_NAMES } from "@/utils/cropRules";

interface CropTimelineProps {
  crop: Crop;
  currentMonth: number;
}

const MONTH_COLORS = {
  planting: { bg: "#4caf50", header: "#388e3c", cell: "rgba(46,125,50,0.10)", border: "#a5d6a7" },
  harvest:  { bg: "#f9a825", header: "#f57f17", cell: "rgba(249,168,37,0.15)", border: "#ffe082" },
  current:  { bg: "#f4b400", header: "#e65100", cell: "rgba(244,180,0,0.10)", border: "#f4b400" },
  neutral:  { bg: "#b0bec5", header: "#78909c", cell: "rgba(176,190,197,0.10)", border: "#cfd8dc" },
};

const WEEK_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

function MonthCard({
  name,
  monthIndex,
  isPlanting,
  isHarvest,
  isCurrent,
}: {
  name: string;
  monthIndex: number;
  isPlanting: boolean;
  isHarvest: boolean;
  isCurrent: boolean;
}) {
  const scheme = isPlanting
    ? MONTH_COLORS.planting
    : isHarvest
    ? MONTH_COLORS.harvest
    : MONTH_COLORS.neutral;

  const year = new Date().getFullYear();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div
      role="listitem"
      aria-label={`${name}${isPlanting ? " — Plantio" : isHarvest ? " — Colheita" : ""}${isCurrent ? " (mês atual)" : ""}`}
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        border: isCurrent ? `2px solid ${MONTH_COLORS.current.bg}` : `1px solid ${scheme.border}`,
        boxShadow: isCurrent ? `0 0 0 2px rgba(244,180,0,0.25)` : undefined,
        flex: 1,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-2 py-1.5"
        style={{ backgroundColor: scheme.bg }}
      >
        <span className="text-xs font-bold text-white tracking-wide uppercase">{name}</span>
        {isCurrent && (
          <span
            className="text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.3)", color: "white", fontSize: "9px" }}
          >
            HOJE
          </span>
        )}
      </div>

      {/* Day grid */}
      <div
        className="p-1.5 flex-1"
        style={{ backgroundColor: scheme.cell }}
      >
        {/* Week labels */}
        <div className="grid grid-cols-7 mb-0.5">
          {WEEK_LABELS.map((l, i) => (
            <span
              key={i}
              className="text-center"
              style={{ fontSize: "7px", color: scheme.header, fontWeight: 700 }}
            >
              {l}
            </span>
          ))}
        </div>
        {/* Day cells */}
        <div className="grid grid-cols-7 gap-px">
          {cells.map((d, i) => (
            <div
              key={i}
              className="aspect-square flex items-center justify-center rounded"
              style={{
                fontSize: "7px",
                color: d ? "#111827" : "transparent",
                fontWeight: 600,
                backgroundColor: d ? "rgba(255,255,255,0.82)" : "transparent",
              }}
            >
              {d ?? ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CropTimeline({ crop, currentMonth }: CropTimelineProps) {
  return (
    <div className="card p-5 flex flex-col h-full" style={{ borderLeft: "4px solid #f4b400" }}>
      <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
        Calendário Anual
      </h2>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
        Ciclo médio: <strong style={{ color: "var(--text-secondary)" }}>{crop.cycleDays}</strong>
      </p>

      <div
        className="grid gap-2 flex-1"
        style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 1fr)" }}
        role="list"
        aria-label="Calendário de plantio e colheita"
      >
        {MONTH_NAMES.map((name, idx) => (
          <MonthCard
            key={idx}
            name={name}
            monthIndex={idx}
            isPlanting={crop.plantingMonths.includes(idx)}
            isHarvest={crop.harvestMonths.includes(idx)}
            isCurrent={idx === currentMonth}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: MONTH_COLORS.planting.bg }} aria-hidden="true" />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Plantio</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: MONTH_COLORS.harvest.bg }} aria-hidden="true" />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Colheita</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ border: `2px solid ${MONTH_COLORS.current.bg}`, backgroundColor: "transparent" }} aria-hidden="true" />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Mês atual</span>
        </div>
      </div>
    </div>
  );
}
