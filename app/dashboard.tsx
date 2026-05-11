import { RefreshCw, MapPin } from "lucide-react";
import {
  fetchWeatherData,
  AMAZON_LOCATIONS,
} from "@/services/weatherService";
import { assessRisk, generateAlerts, generateRecommendations } from "@/utils/riskRules";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { RiskSemaphore } from "@/components/RiskSemaphore";
import { AlertCard } from "@/components/AlertCard";
import { RecommendationCard } from "@/components/RecommendationCard";
import { LocationSelector } from "@/components/LocationSelector";

interface DashboardProps {
  searchParams?: Promise<{ loc?: string }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const params = await searchParams;
  const locIndex = Number(params?.loc ?? 0);
  const safeIndex = locIndex >= 0 && locIndex < AMAZON_LOCATIONS.length ? locIndex : 0;
  const location = AMAZON_LOCATIONS[safeIndex];

  let weatherData;
  let error: string | null = null;

  try {
    weatherData = await fetchWeatherData(location);
  } catch (e) {
    error = "Não foi possível carregar os dados climáticos. Tente novamente.";
    console.error(e);
  }

  if (error || !weatherData) {
    return (
      <div className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <RefreshCw size={48} color="#ef6c00" />
        <p className="text-lg font-semibold" style={{ color: "#1a1a1a" }}>
          {error}
        </p>
        <a
          href="/"
          className="btn-primary"
          style={{
            backgroundColor: "#f4b400",
            color: "#0f3d2e",
            borderRadius: "12px",
            padding: "12px 24px",
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <RefreshCw size={18} />
          Tentar novamente
        </a>
      </div>
    );
  }

  const risk = assessRisk(weatherData.current, weatherData.daily);
  const alerts = generateAlerts(weatherData.current, weatherData.daily);
  const recommendations = generateRecommendations(weatherData.current, weatherData.daily);

  const now = new Date();
  const updatedAt = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Manaus",
  });
  const dateLabel = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Manaus",
  });

  return (
    <div
      className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full"
      style={{ paddingTop: "4rem" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#1a1a1a" }}>
            Painel do Produtor
          </h1>
          <p className="mt-1 capitalize" style={{ color: "#5a5f57" }}>
            {dateLabel}
          </p>
        </div>
        <LocationSelector
          locations={AMAZON_LOCATIONS}
          currentIndex={safeIndex}
        />
      </div>

      {/* Banner de alerta crítico (se houver) */}
      {alerts.some((a) => a.level === "danger") && (
        <div
          className="flex items-center gap-4 p-4 rounded-2xl"
          style={{
            backgroundColor: "#ffebee",
            border: "1px solid #ef9a9a",
          }}
          role="alert"
          aria-live="assertive"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#c62828" }}
            aria-hidden="true"
          >
            <MapPin size={20} color="#fff" />
          </div>
          <p className="font-semibold text-base" style={{ color: "#c62828" }}>
            Situação crítica detectada na sua região. Verifique os alertas abaixo.
          </p>
        </div>
      )}

      {/* Linha 1: Clima atual + Semáforo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherCard
          current={weatherData.current}
          locationName={weatherData.locationName}
          updatedAt={updatedAt}
        />
        <RiskSemaphore assessment={risk} />
      </div>

      {/* Linha 2: Previsão 7 dias */}
      <ForecastCard daily={weatherData.daily} />

      {/* Linha 3: Alertas + Recomendações */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertCard alerts={alerts} />
        <RecommendationCard recommendations={recommendations} />
      </div>

      {/* Footer */}
      <footer
        className="text-center text-xs py-4"
        style={{ color: "#8a8f87", borderTop: "1px solid #e8eae6" }}
      >
        <p>
          Dados fornecidos por{" "}
          <span className="font-medium" style={{ color: "#2e86ab" }}>
            Open-Meteo
          </span>{" "}
          · Atualizado às {updatedAt} (horário de Manaus)
        </p>
        <p className="mt-1">AgroAmazônia Inteligente — ajudando produtores rurais com informação climática</p>
      </footer>
    </div>
  );
}
