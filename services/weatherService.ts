export interface CurrentWeather {
  temperature: number;
  humidity: number;
  precipitation: number;
  rain: number;
  weatherCode: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  locationName: string;
  latitude: number;
  longitude: number;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  state: string;
}

export const AMAZON_LOCATIONS: Location[] = [
  { name: "Belém", state: "PA", latitude: -1.4558, longitude: -48.5039 },
  { name: "Manaus", state: "AM", latitude: -3.1019, longitude: -60.025 },
  { name: "Santarém", state: "PA", latitude: -2.4436, longitude: -54.7081 },
  { name: "Marabá", state: "PA", latitude: -5.3686, longitude: -49.1178 },
  { name: "Porto Velho", state: "RO", latitude: -8.7612, longitude: -63.9004 },
  { name: "Rio Branco", state: "AC", latitude: -9.9748, longitude: -67.8099 },
  { name: "Macapá", state: "AP", latitude: 0.0349, longitude: -51.0694 },
  { name: "Altamira", state: "PA", latitude: -3.2042, longitude: -52.2064 },
];

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: "Céu limpo",
  1: "Principalmente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Geada de neblina",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  71: "Neve leve",
  73: "Neve moderada",
  75: "Neve forte",
  77: "Granizo",
  80: "Pancadas de chuva leves",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva fortes",
  85: "Neve em pancadas",
  86: "Neve em pancadas intensas",
  95: "Tempestade",
  96: "Tempestade com granizo leve",
  99: "Tempestade com granizo intenso",
};

export function getWeatherDescription(code: number): string {
  return WMO_DESCRIPTIONS[code] ?? "Condição desconhecida";
}

export function getWeatherIcon(code: number): string {
  if (code === 0) return "sun";
  if (code <= 2) return "cloud-sun";
  if (code === 3) return "cloud";
  if (code <= 48) return "cloud-fog";
  if (code <= 55) return "cloud-drizzle";
  if (code <= 65) return "cloud-rain";
  if (code <= 77) return "snowflake";
  if (code <= 82) return "cloud-rain-wind";
  if (code <= 86) return "snowflake";
  return "cloud-lightning";
}

export async function fetchWeatherData(location: Location): Promise<WeatherData> {
  const { latitude, longitude, name, state } = location;

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m"
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max"
  );
  url.searchParams.set("timezone", "America/Manaus");
  url.searchParams.set("forecast_days", "7");

  const response = await fetch(url.toString(), { next: { revalidate: 1800 } });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados climáticos: ${response.statusText}`);
  }

  const data = await response.json();
  const c = data.current;
  const d = data.daily;

  const daily: DailyForecast[] = d.time.map((date: string, i: number) => ({
    date,
    weatherCode: d.weather_code[i],
    tempMax: Math.round(d.temperature_2m_max[i]),
    tempMin: Math.round(d.temperature_2m_min[i]),
    precipitationSum: d.precipitation_sum[i],
    precipitationProbability: d.precipitation_probability_max[i],
  }));

  return {
    locationName: `${name} — ${state}`,
    latitude,
    longitude,
    current: {
      temperature: Math.round(c.temperature_2m),
      humidity: c.relative_humidity_2m,
      precipitation: c.precipitation,
      rain: c.rain,
      weatherCode: c.weather_code,
      windSpeed: Math.round(c.wind_speed_10m),
    },
    daily,
  };
}
