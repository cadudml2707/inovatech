import { Leaf } from "lucide-react";
import type { Crop } from "@/data/crops";

interface CropRecommendationCardProps {
  crop: Crop;
}

export function CropRecommendationCard({ crop }: CropRecommendationCardProps) {
  return (
    <div className="card p-5" style={{ borderLeft: "4px solid #4caf50" }}>
      <div className="flex items-center gap-2 mb-4">
        <Leaf size={18} color="#2e7d32" />
        <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          Recomendações Sustentáveis
        </h2>
      </div>

      <ul className="space-y-3" role="list">
        {crop.sustainableRecommendations.map((rec, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl text-sm"
            style={{
              backgroundColor: "var(--bg-card-inner)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              lineHeight: "1.5",
            }}
          >
            <span
              className="text-base flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              🌿
            </span>
            {rec}
          </li>
        ))}
      </ul>

      <p
        className="text-xs mt-4 pt-3 text-center"
        style={{
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
        }}
      >
        Práticas sustentáveis preservam o solo amazônico para as próximas gerações.
      </p>
    </div>
  );
}
