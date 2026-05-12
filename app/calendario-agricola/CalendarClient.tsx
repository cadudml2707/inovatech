"use client";

import { useState } from "react";
import { CROPS } from "@/data/crops";
import { getCropMonthStatus, MONTH_NAMES } from "@/utils/cropRules";
import { CropSelector } from "@/components/CropSelector";
import { CropInfoCard } from "@/components/CropInfoCard";
import { CropTimeline } from "@/components/CropTimeline";
import { CropRecommendationCard } from "@/components/CropRecommendationCard";

export function CalendarClient() {
  const [selectedId, setSelectedId] = useState<string>(CROPS[0].id);

  const currentMonth = new Date().getMonth();
  const crop = CROPS.find((c) => c.id === selectedId) ?? CROPS[0];
  const monthStatus = getCropMonthStatus(crop, currentMonth);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto" style={{ paddingTop: "4rem" }}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Calendário Agrícola
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Culturas amazônicas — <strong style={{ color: "var(--text-secondary)" }}>{MONTH_NAMES[currentMonth]}</strong> é o mês atual
        </p>
      </div>

      {/* Crop selector */}
      <CropSelector selectedId={selectedId} onChange={setSelectedId} />

      {/* Info + Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CropInfoCard crop={crop} monthStatus={monthStatus} />
        <div className="flex flex-col gap-6">
          <CropTimeline crop={crop} currentMonth={currentMonth} />
        </div>
      </div>

      {/* Sustainable recommendations */}
      <CropRecommendationCard crop={crop} />
    </div>
  );
}
