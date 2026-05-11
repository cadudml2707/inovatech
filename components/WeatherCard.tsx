import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudRainWind,
  CloudLightning,
  Droplets,
  Wind,
  Thermometer,
  MapPin,
} from "lucide-react";
import type { CurrentWeather } from "@/services/weatherService";
import { getWeatherDescription, getWeatherIcon } from "@/services/weatherService";

interface WeatherCardProps {
  current: CurrentWeather;
  locationName: string;
  updatedAt?: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  sun:              <Sun size={64} color="#f4b400" strokeWidth={1.5} />,
  "cloud-sun":      <CloudSun size={64} color="#f4b400" strokeWidth={1.5} />,
  cloud:            <Cloud size={64} color="#90a4ae" strokeWidth={1.5} />,
  "cloud-fog":      <CloudFog size={64} color="#90a4ae" strokeWidth={1.5} />,
  "cloud-drizzle":  <CloudDrizzle size={64} color="#2e86ab" strokeWidth={1.5} />,
  "cloud-rain":     <CloudRain size={64} color="#1976d2" strokeWidth={1.5} />,
  snowflake:        <Snowflake size={64} color="#90caf9" strokeWidth={1.5} />,
  "cloud-rain-wind":<CloudRainWind size={64} color="#1565c0" strokeWidth={1.5} />,
  "cloud-lightning":<CloudLightning size={64} color="#c62828" strokeWidth={1.5} />,
};

export function WeatherCard({ current, locationName, updatedAt }: WeatherCardProps) {
  const iconKey = getWeatherIcon(current.weatherCode);
  const description = getWeatherDescription(current.weatherCode);

  return (
    <div
      className="card p-6 flex flex-col gap-5"
      style={{ borderLeft: "4px solid #2e86ab" }}
      aria-label={`Clima atual em ${locationName}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={16} color="#8a8f87" />
            <p className="text-sm font-medium" style={{ color: "#5a5f57" }}>
              {locationName}
            </p>
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>
            Clima Agora
          </h2>
          {updatedAt && (
            <p className="text-xs mt-0.5" style={{ color: "#8a8f87" }}>
              Atualizado: {updatedAt}
            </p>
          )}
        </div>
        <div aria-label={description} role="img">
          {ICON_MAP[iconKey] ?? ICON_MAP["cloud"]}
        </div>
      </div>

      {/* Temperatura principal */}
      <div>
        <p
          className="font-bold leading-none"
          style={{ fontSize: "clamp(52px, 10vw, 72px)", color: "#0f3d2e" }}
          aria-label={`${current.temperature} graus Celsius`}
        >
          {current.temperature}
          <span className="text-3xl font-semibold" style={{ color: "#5a5f57" }}>
            °C
          </span>
        </p>
        <p className="text-lg mt-1 font-medium" style={{ color: "#2c2c2c" }}>
          {description}
        </p>
      </div>

      {/* Métricas secundárias */}
      <div
        className="grid grid-cols-3 gap-3 pt-4"
        style={{ borderTop: "1px solid #e8eae6" }}
      >
        <MetricItem
          icon={<Droplets size={20} color="#2e86ab" />}
          value={`${current.humidity}%`}
          label="Umidade"
        />
        <MetricItem
          icon={<Wind size={20} color="#5a5f57" />}
          value={`${current.windSpeed} km/h`}
          label="Vento"
        />
        <MetricItem
          icon={<Thermometer size={20} color="#ef6c00" />}
          value={`${current.precipitation.toFixed(1)} mm`}
          label="Chuva"
        />
      </div>
    </div>
  );
}

function MetricItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div aria-hidden="true">{icon}</div>
      <p className="font-bold text-base" style={{ color: "#1a1a1a" }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: "#8a8f87" }}>
        {label}
      </p>
    </div>
  );
}
