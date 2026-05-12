export interface Crop {
  id: string;
  name: string;
  emoji: string;
  description: string;
  plantingMonths: number[];
  harvestMonths: number[];
  cycleDays: string;
  mainCare: string[];
  sustainableRecommendations: string[];
}

// Month indices: 0 = January, 11 = December
export const CROPS: Crop[] = [
  {
    id: "mandioca",
    name: "Mandioca",
    emoji: "🌿",
    description:
      "Cultura essencial da Amazônia, tolerante ao calor e ao solo ácido. Base alimentar de comunidades ribeirinhas.",
    plantingMonths: [8, 9, 10], // Set, Out, Nov
    harvestMonths: [2, 3, 4],   // Mar, Abr, Mai
    cycleDays: "12–18 meses",
    mainCare: [
      "Plantar em solo bem drenado para evitar apodrecimento das raízes",
      "Espaçamento mínimo de 1 m entre plantas",
      "Capinar nos primeiros 3 meses para evitar concorrência",
      "Evitar irrigação excessiva; a mandioca tolera períodos secos",
      "Colher antes de 18 meses para manter qualidade do amido",
    ],
    sustainableRecommendations: [
      "Consórcio com feijão-caupi para fixação de nitrogênio no solo",
      "Cobertura morta de folhas secas reduz evaporação e capinas",
      "Aproveitar a parte aérea (manipueira) como bioinseticida",
      "Rotação com milho para quebrar ciclo de pragas",
    ],
  },
  {
    id: "acai",
    name: "Açaí",
    emoji: "🫐",
    description:
      "Palmeira nativa de alto valor econômico. Fruto símbolo da Amazônia, cultivado nas várzeas e terra firme.",
    plantingMonths: [2, 3, 4], // Mar, Abr, Mai
    harvestMonths: [6, 7, 8],  // Jul, Ago, Set
    cycleDays: "3–4 anos (1ª safra)",
    mainCare: [
      "Plantar mudas com 40–60 cm de altura já enraizadas",
      "Manter umidade constante no solo nos primeiros 2 anos",
      "Sombreamento parcial nas mudas jovens (50%)",
      "Adubar com composto orgânico a cada 6 meses",
      "Podar cachos velhos para estimular nova frutificação",
    ],
    sustainableRecommendations: [
      "Sistema agroflorestal com cacau e açaí maximiza uso da área",
      "Aproveitar resíduos do fruto (caroço) para produção de carvão",
      "Não derrubar árvores nativas para plantar açaí — usar clareiras",
      "Coleta manual preserva os cachos e reduz perdas pós-colheita",
    ],
  },
  {
    id: "milho",
    name: "Milho",
    emoji: "🌽",
    description:
      "Cereal de ciclo curto muito cultivado em roças de família. Fundamental para segurança alimentar e alimentação animal.",
    plantingMonths: [9, 10, 11], // Out, Nov, Dez
    harvestMonths: [1, 2, 3],    // Fev, Mar, Abr
    cycleDays: "90–120 dias",
    mainCare: [
      "Semear em solo previamente preparado com aração rasa",
      "Profundidade de semeadura: 3–5 cm",
      "Fertilização com NPK no plantio e ureia em cobertura",
      "Irrigar a cada 3 dias em fase de floração",
      "Controlar lagarta-do-cartucho nos 30 primeiros dias",
    ],
    sustainableRecommendations: [
      "Consórcio milho + feijão + abóbora (método tradicional Guarani)",
      "Palha do milho como cobertura morta para a próxima safra",
      "Usar variedades crioulas adaptadas ao clima amazônico",
      "Controle biológico da lagarta com Bacillus thuringiensis",
    ],
  },
  {
    id: "cupuacu",
    name: "Cupuaçu",
    emoji: "🍈",
    description:
      "Fruta amazônica de alto valor, parente do cacau. Polpa e semente usadas em chocolates, cremes e cosméticos.",
    plantingMonths: [3, 4],    // Abr, Mai
    harvestMonths: [11, 0, 1], // Dez, Jan, Fev
    cycleDays: "3–5 anos (1ª safra)",
    mainCare: [
      "Plantar em local com sombra parcial (árvores nativas ao redor)",
      "Regar 2x por semana nos primeiros 6 meses",
      "Poda de formação no 2º e 3º ano para copa equilibrada",
      "Controlar vassoura-de-bruxa com poda e destruição de ramos",
      "Colheita quando o fruto cair naturalmente ou soltar com leve toque",
    ],
    sustainableRecommendations: [
      "Integrar com açaí em sistema agroflorestal (SAF)",
      "Caroço processado vira manteiga — zero resíduo",
      "Manter mata ciliar ao redor da plantação para umidade",
      "Certificação orgânica agrega 30–40% no valor de venda",
    ],
  },
  {
    id: "cacau",
    name: "Cacau",
    emoji: "🍫",
    description:
      "Cultivado à sombra de árvores nativas, o cacau amazônico é base do chocolate fino e tem grande potencial de exportação.",
    plantingMonths: [3, 4, 5], // Abr, Mai, Jun
    harvestMonths: [9, 10, 11], // Out, Nov, Dez
    cycleDays: "2–3 anos (1ª safra)",
    mainCare: [
      "Exige sombra de 50–70% — plante sob floresta secundária",
      "Solo profundo, argiloso e bem drenado",
      "Combate preventivo à vassoura-de-bruxa com poda sanitária",
      "Fertirrigação com composto e cinzas de madeira",
      "Fermentação correta dos grãos é essencial para qualidade",
    ],
    sustainableRecommendations: [
      "Cacau cabruca integra floresta nativa — modelo sustentável",
      "Casca do cacau serve como adubo orgânico de alta qualidade",
      "Selo 'cacau amazônico' aumenta valor no mercado internacional",
      "Preservar polinizadores nativos (mosquitinhos Forcipomyia)",
    ],
  },
  {
    id: "pimenta-do-reino",
    name: "Pimenta-do-reino",
    emoji: "🌶️",
    description:
      "Especia de alto valor econômico amplamente cultivada no Pará. Cresce em espaldeiras e tolera bem o calor úmido.",
    plantingMonths: [5, 6, 7], // Jun, Jul, Ago
    harvestMonths: [1, 2, 3],  // Fev, Mar, Abr
    cycleDays: "18–24 meses (1ª colheita)",
    mainCare: [
      "Construir espaldeiras de madeira com 3 m de altura",
      "Solo levemente ácido (pH 5,5–6,5) e bem drenado",
      "Irrigação frequente no período seco (a cada 2 dias)",
      "Controlar Fusarium com rotação de área e fungicidas orgânicos",
      "Colher cachos ainda verdes para pimenta-do-reino preta",
    ],
    sustainableRecommendations: [
      "Usar estacas de madeira certificada nas espaldeiras",
      "Consórcio com maracujá no início aproveita a estrutura",
      "Compostagem de resíduos vegetais reduz insumos externos",
      "Monitoramento semanal evita surtos de Fusarium",
    ],
  },
];
