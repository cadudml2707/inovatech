"use client";

import { CROPS } from "@/data/crops";

interface CropSelectorProps {
  selectedId: string;
  onChange: (id: string) => void;
}

export function CropSelector({ selectedId, onChange }: CropSelectorProps) {
  return (
    <div className="card p-5">
      <label
        htmlFor="crop-select"
        className="block text-sm font-semibold uppercase tracking-wide mb-3"
        style={{ color: "var(--text-muted)" }}
      >
        Selecionar Cultura
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Culturas disponíveis">
        {CROPS.map((crop) => {
          const isSelected = crop.id === selectedId;
          return (
            <button
              key={crop.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(crop.id)}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left"
              style={{
                backgroundColor: isSelected ? "rgba(76,175,80,0.18)" : "var(--bg-card-inner)",
                border: isSelected ? "2px solid #4caf50" : "2px solid var(--border)",
                color: isSelected ? "#2e7d32" : "var(--text-secondary)",
                fontWeight: isSelected ? 600 : 400,
              }}
            >
              <span className="text-xl flex-shrink-0" aria-hidden="true">
                {crop.emoji}
              </span>
              <span className="truncate">{crop.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
