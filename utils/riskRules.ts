import type { CurrentWeather, DailyForecast } from "@/services/weatherService";

export type RiskLevel = "safe" | "caution" | "warning" | "danger";

export interface RiskAssessment {
  level: RiskLevel;
  score: number;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface Alert {
  id: string;
  level: RiskLevel;
  title: string;
  description: string;
  action: string;
}

export interface Recommendation {
  id: string;
  crop: string;
  status: "plant" | "wait" | "ending";
  statusLabel: string;
  description: string;
  favorability: number;
}

export function assessRisk(
  current: CurrentWeather,
  daily: DailyForecast[]
): RiskAssessment {
  let score = 0;

  // Chuva nas próximas 48h
  const next2Days = daily.slice(0, 2);
  const maxPrecipProb = Math.max(...next2Days.map((d) => d.precipitationProbability ?? 0));
  const totalPrecip = next2Days.reduce((sum, d) => sum + (d.precipitationSum ?? 0), 0);

  if (maxPrecipProb >= 80 || totalPrecip > 40) score += 3;
  else if (maxPrecipProb >= 60 || totalPrecip > 20) score += 2;
  else if (maxPrecipProb >= 40 || totalPrecip > 10) score += 1;

  // Temperatura muito alta (risco de seca/estresse hídrico)
  if (current.temperature >= 38) score += 2;
  else if (current.temperature >= 35) score += 1;

  // Chuva intensa atual
  const stormCodes = [65, 82, 95, 96, 99];
  const heavyCodes = [63, 80, 81];
  if (stormCodes.includes(current.weatherCode)) score += 3;
  else if (heavyCodes.includes(current.weatherCode)) score += 2;

  // Vento forte
  if (current.windSpeed >= 50) score += 2;
  else if (current.windSpeed >= 30) score += 1;

  if (score >= 6) {
    return {
      level: "danger",
      score,
      label: "Risco Alto",
      description: "Condições perigosas. Tome providências agora.",
      color: "#c62828",
      bgColor: "#ffebee",
      borderColor: "#ef9a9a",
    };
  } else if (score >= 4) {
    return {
      level: "warning",
      score,
      label: "Risco Moderado",
      description: "Fique alerta. Tome providências preventivas.",
      color: "#ef6c00",
      bgColor: "#fff3e0",
      borderColor: "#ffcc80",
    };
  } else if (score >= 2) {
    return {
      level: "caution",
      score,
      label: "Atenção",
      description: "Acompanhe a previsão nas próximas horas.",
      color: "#f9a825",
      bgColor: "#fffde7",
      borderColor: "#fff176",
    };
  }

  return {
    level: "safe",
    score,
    label: "Tudo Certo",
    description: "Condições favoráveis para o campo hoje.",
    color: "#2e7d32",
    bgColor: "#e8f5e9",
    borderColor: "#a5d6a7",
  };
}

export function generateAlerts(
  current: CurrentWeather,
  daily: DailyForecast[]
): Alert[] {
  const alerts: Alert[] = [];

  // Chuva intensa nas próximas 24h
  const tomorrow = daily[1];
  if (tomorrow && tomorrow.precipitationProbability >= 70 && tomorrow.precipitationSum > 20) {
    alerts.push({
      id: "heavy-rain",
      level: "warning",
      title: "Chuva Intensa Prevista",
      description: `Amanhã há ${tomorrow.precipitationProbability}% de chance de chuva com ${tomorrow.precipitationSum.toFixed(0)} mm esperados.`,
      action: "Proteja sua colheita e evite plantio novo.",
    });
  }

  // Tempestade atual
  const stormCodes = [95, 96, 99];
  if (stormCodes.includes(current.weatherCode)) {
    alerts.push({
      id: "storm-now",
      level: "danger",
      title: "Tempestade Agora",
      description: "Há tempestade na região neste momento. Evite ficar ao ar livre.",
      action: "Busque abrigo e proteja equipamentos.",
    });
  }

  // Calor extremo
  if (current.temperature >= 38) {
    alerts.push({
      id: "extreme-heat",
      level: "warning",
      title: "Calor Extremo",
      description: `Temperatura de ${current.temperature}°C. Risco de estresse hídrico nas plantas.`,
      action: "Aumente a irrigação e proteja mudas do sol direto.",
    });
  }

  // Vento forte
  if (current.windSpeed >= 40) {
    alerts.push({
      id: "strong-wind",
      level: "caution",
      title: "Vento Forte",
      description: `Ventos de ${current.windSpeed} km/h podem derrubar plantas e estruturas.`,
      action: "Escore plantas altas e recolha objetos soltos.",
    });
  }

  // Sem chuva por 5+ dias (verificar precipitação acumulada baixa)
  const weekPrecip = daily.slice(0, 7).reduce((s, d) => s + (d.precipitationSum ?? 0), 0);
  if (weekPrecip < 5 && current.temperature >= 33) {
    alerts.push({
      id: "drought-risk",
      level: "caution",
      title: "Risco de Seca",
      description: "Pouca chuva prevista para a semana e temperatura alta.",
      action: "Verifique a irrigação e conserve a umidade do solo.",
    });
  }

  return alerts;
}

export function generateRecommendations(
  current: CurrentWeather,
  daily: DailyForecast[]
): Recommendation[] {
  const weekPrecip = daily.slice(0, 7).reduce((s, d) => s + (d.precipitationSum ?? 0), 0);
  const avgPrecipProb = daily.slice(0, 3).reduce((s, d) => s + d.precipitationProbability, 0) / 3;
  const temp = current.temperature;

  const recs: Recommendation[] = [];

  // Mandioca
  const mandiocaFav = temp >= 25 && temp <= 35 && weekPrecip >= 10 ? 80 : temp > 35 ? 40 : 60;
  recs.push({
    id: "mandioca",
    crop: "Mandioca",
    status: mandiocaFav >= 70 ? "plant" : mandiocaFav >= 50 ? "ending" : "wait",
    statusLabel: mandiocaFav >= 70 ? "Pode plantar agora" : mandiocaFav >= 50 ? "Época ideal acabando" : "Aguardar",
    description: "Prefere clima quente e úmido. Evite plantio com chuvas muito fortes.",
    favorability: mandiocaFav,
  });

  // Açaí
  const acaiFav = avgPrecipProb >= 50 && temp >= 26 ? 85 : avgPrecipProb < 30 ? 35 : 65;
  recs.push({
    id: "acai",
    crop: "Açaí",
    status: acaiFav >= 70 ? "plant" : acaiFav >= 50 ? "ending" : "wait",
    statusLabel: acaiFav >= 70 ? "Boa umidade para crescimento" : acaiFav >= 50 ? "Condições moderadas" : "Aguardar chuva",
    description: "Precisa de umidade constante. Adapta bem às margens de rios.",
    favorability: acaiFav,
  });

  // Milho
  const milhoFav = temp >= 22 && temp <= 34 && weekPrecip >= 15 ? 75 : weekPrecip < 5 ? 30 : 55;
  recs.push({
    id: "milho",
    crop: "Milho",
    status: milhoFav >= 70 ? "plant" : milhoFav >= 50 ? "ending" : "wait",
    statusLabel: milhoFav >= 70 ? "Pode plantar agora" : milhoFav >= 50 ? "Risco moderado" : "Aguardar",
    description: "Necessita de boa umidade na germinação. Evite encharcamento.",
    favorability: milhoFav,
  });

  // Cupuaçu
  const cupuacuFav = temp >= 24 && weekPrecip >= 20 ? 78 : weekPrecip < 10 ? 40 : 60;
  recs.push({
    id: "cupuacu",
    crop: "Cupuaçu",
    status: cupuacuFav >= 70 ? "plant" : cupuacuFav >= 50 ? "ending" : "wait",
    statusLabel: cupuacuFav >= 70 ? "Condições ideais" : cupuacuFav >= 50 ? "Condições moderadas" : "Aguardar",
    description: "Fruta típica amazônica. Prefere sombra parcial e alta umidade.",
    favorability: cupuacuFav,
  });

  return recs;
}
