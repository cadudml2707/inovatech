import type { Crop } from "@/data/crops";
import type { CurrentWeather } from "@/services/weatherService";

export function calcFavorableConditions(
  crop: Crop,
  weather: CurrentWeather,
  month: number
): number {
  let score = 0;

  // Mês de plantio (40 pts)
  if (crop.plantingMonths.includes(month)) {
    score += 40;
  } else {
    const prepMonths = crop.plantingMonths.map((m) => (m - 1 + 12) % 12);
    score += prepMonths.includes(month) ? 20 : 5;
  }

  // Temperatura (30 pts) — culturas tropicais preferem 24–34 °C
  const t = weather.temperature;
  if (t >= 24 && t <= 34) score += 30;
  else if ((t >= 20 && t < 24) || (t > 34 && t <= 38)) score += 18;
  else score += 6;

  // Umidade (20 pts) — > 65 % é ideal para Amazônia
  const h = weather.humidity;
  if (h >= 70) score += 20;
  else if (h >= 60) score += 14;
  else if (h >= 50) score += 8;
  else score += 3;

  // Precipitação (10 pts) — chuva moderada é ideal, forte é ruim
  const p = weather.precipitation;
  if (p >= 0.5 && p <= 8) score += 10;
  else if (p < 0.5) score += 7;
  else if (p <= 20) score += 5;
  else score += 1;

  return Math.min(score, 100);
}
