import { Sprout } from "lucide-react";
import { fetchAllOpenFarmCrops } from "@/services/openFarmService";
import { calcFavorableConditions } from "@/utils/cropConditions";
import { getCropMonthStatus } from "@/utils/cropRules";
import { PlantingCard } from "@/components/PlantingCard";
import type { CurrentWeather } from "@/services/weatherService";
import { CROPS } from "@/data/crops";

interface PlantingRecommendationsProps {
  weather: CurrentWeather;
}

export async function PlantingRecommendations({ weather }: PlantingRecommendationsProps) {
  const currentMonth = new Date().getMonth();

  const openFarmData = await fetchAllOpenFarmCrops(CROPS.map((c) => c.id));

  const crops = CROPS.map((crop) => ({
    crop,
    score: calcFavorableConditions(crop, weather, currentMonth),
    monthStatus: getCropMonthStatus(crop, currentMonth).status,
    openFarm: openFarmData[crop.id] ?? null,
  })).sort((a, b) => b.score - a.score);

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Sprout size={20} color="#2e7d32" />
        <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          Recomendações de Plantio
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {crops.map(({ crop, score, monthStatus, openFarm }) => (
          <PlantingCard
            key={crop.id}
            crop={crop}
            score={score}
            monthStatus={monthStatus}
            openFarm={openFarm}
          />
        ))}
      </div>

      <p
        className="text-xs mt-3 text-right"
        style={{ color: "var(--text-muted)" }}
      >
        Dados de cultivo: OpenFarm · % calculado com clima atual da região
      </p>
    </section>
  );
}
