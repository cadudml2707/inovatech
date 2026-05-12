import {
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  Droplets,
} from "lucide-react";
import type { DailyForecast } from "@/services/weatherService";
import { getWeatherIcon } from "@/services/weatherService";

interface ForecastCardProps {
  daily: DailyForecast[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  sun:               <Sun size={28} color="#f4b400" strokeWidth={1.5} />,
  "cloud-sun":       <CloudSun size={28} color="#f4b400" strokeWidth={1.5} />,
  cloud:             <Cloud size={28} color="#90a4ae" strokeWidth={1.5} />,
  "cloud-fog":       <Cloud size={28} color="#90a4ae" strokeWidth={1.5} />,
  "cloud-drizzle":   <CloudDrizzle size={28} color="#2e86ab" strokeWidth={1.5} />,
  "cloud-rain":      <CloudRain size={28} color="#1976d2" strokeWidth={1.5} />,
  snowflake:         <Sun size={28} color="#90caf9" strokeWidth={1.5} />,
  "cloud-rain-wind": <CloudRainWind size={28} color="#1565c0" strokeWidth={1.5} />,
  "cloud-lightning": <CloudLightning size={28} color="#c62828" strokeWidth={1.5} />,
};

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH_NAMES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function formatDate(dateStr: string, index: number): { day: string; date: string } {
  const d = new Date(dateStr + "T12:00:00");
  if (index === 0) return { day: "Hoje", date: `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}` };
  if (index === 1) return { day: "Amanhã", date: `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}` };
  return {
    day: DAY_NAMES[d.getDay()],
    date: `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`,
  };
}

function precipitationColor(prob: number): string {
  if (prob >= 70) return "#1976d2";
  if (prob >= 40) return "#2e86ab";
  return "#8a8f87";
}

export function ForecastCard({ daily }: ForecastCardProps) {
  return (
    <div className="card p-4 sm:p-6" style={{ borderLeft: "4px solid #4caf50" }}>
      <h2 className="text-xl font-bold mb-4 sm:mb-5" style={{ color: "var(--text-primary)" }}>
        Previsão — Próximos 7 Dias
      </h2>

      <div className="flex flex-col gap-1 sm:gap-2" role="list" aria-label="Previsão dos próximos dias">
        {daily.slice(0, 7).map((day, i) => {
          const { day: dayName, date } = formatDate(day.date, i);
          const iconKey = getWeatherIcon(day.weatherCode);

          return (
            <div
              key={day.date}
              className="flex items-center gap-1.5 sm:gap-3 py-2.5 sm:py-3 rounded-xl px-2 sm:px-3 transition-colors duration-150"
              style={{
                backgroundColor: i === 0 ? "var(--bg-highlight)" : "transparent",
                minHeight: "48px",
              }}
              role="listitem"
              aria-label={`${dayName}: ${day.tempMin}°C a ${day.tempMax}°C, ${day.precipitationProbability}% chance de chuva`}
            >
              {/* Dia */}
              <div className="w-12 sm:w-16 flex-shrink-0">
                <p className="font-semibold text-sm leading-tight" style={{ color: "var(--text-primary)" }}>
                  {dayName}
                </p>
                <p className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>
                  {date}
                </p>
              </div>

              {/* Ícone */}
              <div className="w-7 sm:w-8 flex-shrink-0 flex items-center justify-center" aria-hidden="true">
                {ICON_MAP[iconKey] ?? ICON_MAP["cloud"]}
              </div>

              {/* Chuva */}
              <div className="flex items-center gap-0.5 w-14 sm:w-20 flex-shrink-0">
                <Droplets
                  size={13}
                  color={precipitationColor(day.precipitationProbability)}
                  aria-hidden="true"
                />
                <span
                  className="text-xs sm:text-sm font-semibold tabular-nums"
                  style={{ color: precipitationColor(day.precipitationProbability) }}
                >
                  {day.precipitationProbability}%
                </span>
              </div>

              {/* Barra de temperatura */}
              <div className="flex-1 flex items-center gap-1 sm:gap-2 min-w-0">
                <span
                  className="text-xs sm:text-sm tabular-nums flex-shrink-0"
                  style={{ color: "var(--text-muted)", minWidth: "26px" }}
                >
                  {day.tempMin}°
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--border)" }}
                  role="presentation"
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      marginLeft: `${Math.max(0, ((day.tempMin - 18) / 20) * 100)}%`,
                      width: `${Math.min(100, ((day.tempMax - day.tempMin) / 20) * 100)}%`,
                      background: "linear-gradient(to right, #2e86ab, #f4b400, #c62828)",
                      minWidth: "6px",
                    }}
                  />
                </div>
                <span
                  className="text-xs sm:text-sm font-semibold tabular-nums flex-shrink-0"
                  style={{ color: "var(--text-primary)", minWidth: "26px", textAlign: "right" }}
                >
                  {day.tempMax}°
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
        % = chance de chuva · Barra = variação de temperatura
      </p>
    </div>
  );
}
