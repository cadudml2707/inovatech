import type { Crop } from "@/data/crops";

export type MonthStatus = "ideal" | "preparing" | "harvesting" | "offseason";

export interface CropMonthStatus {
  status: MonthStatus;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

export function getCropMonthStatus(crop: Crop, month: number): CropMonthStatus {
  if (crop.harvestMonths.includes(month)) {
    return {
      status: "harvesting",
      label: "Época de Colheita",
      description: `${crop.name} está em período de colheita este mês. Acompanhe o ponto ideal de maturação.`,
      color: "#f9a825",
      bgColor: "var(--alert-caution-bg)",
    };
  }

  if (crop.plantingMonths.includes(month)) {
    return {
      status: "ideal",
      label: "Período Ideal de Plantio",
      description: `Este é um dos melhores meses para plantar ${crop.name}. Aproveite as condições climáticas favoráveis.`,
      color: "#2e7d32",
      bgColor: "var(--alert-safe-bg)",
    };
  }

  // Check if 1–2 months before planting season
  const preparingMonths = crop.plantingMonths.map((m) => (m - 1 + 12) % 12);
  if (preparingMonths.includes(month)) {
    return {
      status: "preparing",
      label: "Prepare o Terreno",
      description: `O plantio de ${crop.name} começa no próximo mês. É hora de preparar o solo e separar as mudas.`,
      color: "#1976d2",
      bgColor: "var(--alert-info-bg)",
    };
  }

  return {
    status: "offseason",
    label: "Fora da Época",
    description: `${crop.name} não está em período de plantio ou colheita este mês. Mantenha os cuidados de manutenção.`,
    color: "var(--text-muted)",
    bgColor: "var(--bg-card-inner)",
  };
}

export const MONTH_NAMES = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];
