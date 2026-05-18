export type LearnBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "highlight"; tone: "info" | "safe" | "caution" | "warning"; title?: string; text: string }
  | { type: "links"; items: { label: string; href?: string; note?: string }[] };

export interface LearnSection {
  number: string;
  title: string;
  blocks: LearnBlock[];
}

export interface LearnTopic {
  id: string;
  emoji: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  sections: LearnSection[];
}

export const LEARN_TOPICS: LearnTopic[] = [
  {
    id: "senaf",
    emoji: "🏷️",
    shortTitle: "SENAF",
    title: "Selo Nacional da Agricultura Familiar (SENAF)",
    subtitle: "Como valorizar o seu produto",
    sections: [
      {
        number: "Sobre",
        title: "O que é o SENAF?",
        blocks: [
          {
            type: "paragraph",
            text:
              "O Selo Nacional da Agricultura Familiar (SENAF) é uma marca oficial do governo que identifica e valoriza os produtos que vêm das mãos do agricultor familiar. Ter esse selo na embalagem mostra ao cliente que o seu produto tem qualidade, origem e apoia a economia local.",
          },
          {
            type: "paragraph",
            text: "Veja como é simples (e gratuito!) conseguir o seu:",
          },
        ],
      },
      {
        number: "1",
        title: "Quem tem direito ao Selo?",
        blocks: [
          {
            type: "list",
            items: [
              "Qualquer agricultor familiar que já possua o CAF (Cadastro Nacional da Agricultura Familiar) ativo.",
              "Existem selos especiais para valorizar ainda mais quem produz: SENAF Mulheres Rurais, SENAF Juventude, SENAF Indígenas do Brasil, SENAF Quilombos do Brasil, entre outros.",
            ],
          },
        ],
      },
      {
        number: "2",
        title: "Quanto custa?",
        blocks: [
          {
            type: "highlight",
            tone: "safe",
            title: "100% gratuito",
            text: "A solicitação e a emissão do selo são serviços totalmente gratuitos.",
          },
        ],
      },
      {
        number: "3",
        title: "A grande vantagem: A Vitrine da Agricultura Familiar",
        blocks: [
          {
            type: "paragraph",
            text:
              "Ao pedir o selo, o seu produto não ganha apenas uma imagem na embalagem. Ele vai parar na Vitrine da Agricultura Familiar na internet (vitrine.mda.gov.br).",
          },
          {
            type: "paragraph",
            text:
              "O sistema gera um Código de Barras (QR Code) para cada produto. Quando o cliente aponta o celular para o selo, consegue ver a origem do alimento, o valor nutricional e até os seus contatos para futuras encomendas.",
          },
        ],
      },
      {
        number: "4",
        title: "Documentos necessários",
        blocks: [
          {
            type: "paragraph",
            text: "Tenha em mãos os seguintes dados antes de acessar o sistema:",
          },
          {
            type: "list",
            items: [
              "Agricultor Individual: CPF e registro no CAF.",
              "Cooperativas / Associações: CNPJ e CAF Jurídico.",
            ],
          },
          {
            type: "highlight",
            tone: "info",
            title: "Atenção",
            text:
              "Para os selos Indígena ou Quilombola, é necessária uma declaração da FUNAI ou da Fundação Palmares confirmando que a associação pertence legalmente à comunidade.",
          },
        ],
      },
      {
        number: "5",
        title: "Passo a passo para solicitar online, sem sair de casa",
        blocks: [
          {
            type: "list",
            items: [
              "Passo 1: Acesse o site oficial da Vitrine e faça login com a sua conta GOV.BR.",
              "Passo 2: Insira o seu CPF (ou CNPJ) e preencha os dados da sua produção.",
              "Passo 3: Registre os produtos que deseja certificar (descreva as características e adicione fotos nítidas de cada um).",
              "Passo 4: Aguarde a avaliação. O governo tem até 30 dias para analisar o seu pedido.",
              "Passo 5: Assim que for aprovado, basta baixar o selo digital no próprio site e imprimi-lo nos rótulos dos seus produtos.",
            ],
          },
          {
            type: "highlight",
            tone: "caution",
            title: "Validade",
            text: "O selo tem validade de 2 anos e pode ser renovado.",
          },
        ],
      },
      {
        number: "🔗",
        title: "Links úteis e acessos diretos",
        blocks: [
          {
            type: "links",
            items: [
              { label: "Vitrine da Agricultura (pedir o selo)", href: "https://vitrine.mda.gov.br/" },
              {
                label: "Regras completas no Portal do Governo",
                href: "https://www.gov.br/pt-br/servicos/solicitar-o-selo-nacional-da-agricultura-familiar-senaf-e-expor-produtos-na-vitrine",
              },
              { label: "E-mail oficial para dúvidas", note: "senaf@mda.gov.br" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "car",
    emoji: "🌳",
    shortTitle: "CAR",
    title: "Cadastro Ambiental Rural (CAR)",
    subtitle: "O que é e por que você precisa dele",
    sections: [
      {
        number: "Sobre",
        title: "O que é o CAR?",
        blocks: [
          {
            type: "paragraph",
            text:
              "O Cadastro Ambiental Rural (CAR) é como se fosse a \"identidade\" ou o \"CPF\" da sua propriedade rural. Ele é um registro eletrônico obrigatório para todas as propriedades do Brasil.",
          },
          {
            type: "highlight",
            tone: "warning",
            title: "A regra",
            text:
              "Sem o CAR, o produtor não consegue crédito no banco (empréstimos agrícolas), não consegue tirar licenças e tem dificuldade para vender seus produtos legalmente.",
          },
          {
            type: "highlight",
            tone: "safe",
            title: "Benefício para a agricultura familiar",
            text:
              "Para pequenas propriedades (até 4 módulos fiscais), o governo (Estado ou Município) é obrigado a dar apoio técnico e jurídico gratuito para fazer a inscrição. Você não precisa pagar engenheiro particular.",
          },
        ],
      },
      {
        number: "1",
        title: "Reúna a documentação necessária",
        blocks: [
          {
            type: "paragraph",
            text: "Antes de sair de casa, junte os seguintes documentos (leve originais e cópias):",
          },
          {
            type: "list",
            items: [
              "Documentos pessoais: RG e CPF (ou CNH com foto).",
              "Comprovante de contato: endereço atualizado, telefone celular e e-mail. Se você não tiver e-mail ou o sinal for ruim, pode fornecer o contato de um familiar ou vizinho de confiança.",
              "Documentos da terra: prove que a área é sua ou que você trabalha nela — Título Definitivo, contrato de compra e venda, termo de doação ou recibo.",
              "O \"desenho\" da terra: coordenadas geográficas dos limites do terreno. Leve planta, memorial descritivo ou croqui mostrando o tamanho total, onde fica a mata e onde tem rios ou nascentes.",
            ],
          },
          {
            type: "highlight",
            tone: "info",
            title: "Dica",
            text: "Se você não tiver a planta, órgãos como o INCRA podem ajudar com o georreferenciamento.",
          },
          {
            type: "highlight",
            tone: "caution",
            title: "Uso de Procurador",
            text:
              "Se outra pessoa for fazer o cadastro no seu lugar, ela precisa levar os próprios documentos (RG e CPF) e uma procuração com firma reconhecida em cartório, assinada por você.",
          },
        ],
      },
      {
        number: "2",
        title: "Onde fazer o cadastro?",
        blocks: [
          {
            type: "paragraph",
            text:
              "Como a nossa lei apoia a agricultura familiar, você não precisa pagar despachante ou engenheiro! Basta reunir a documentação e ir presencialmente à Unidade Local do IDAM (Instituto de Desenvolvimento Agropecuário e Florestal Sustentável) mais próxima, no seu município. Os técnicos preenchem o sistema oficial para você.",
          },
        ],
      },
      {
        number: "3",
        title: "O que acontece depois?",
        blocks: [
          {
            type: "paragraph",
            text:
              "Ao terminar o pedido no balcão, você recebe um Recibo de Inscrição no CAR. Guarde esse recibo como se fosse o documento mais valioso da fazenda! É com ele que você prova que está regularizado, dá entrada na emissão do seu Cartão do Produtor e consegue pedir linhas de crédito nos bancos.",
          },
        ],
      },
    ],
  },
  {
    id: "caf",
    emoji: "📋",
    shortTitle: "CAF",
    title: "Cadastro Nacional da Agricultura Familiar (CAF)",
    subtitle: "O documento que abre as portas das políticas públicas",
    sections: [
      {
        number: "Sobre",
        title: "O que é o CAF?",
        blocks: [
          {
            type: "paragraph",
            text:
              "O CAF é o documento oficial que substituiu a antiga DAP (Declaração de Aptidão ao Pronaf). É ele que identifica, qualifica e comprova quem é agricultor familiar no Brasil.",
          },
        ],
      },
      {
        number: "1",
        title: "Para que serve o CAF?",
        blocks: [
          {
            type: "paragraph",
            text: "Ele é a principal \"chave\" para abrir as portas das políticas públicas. Com o CAF ativo, você pode:",
          },
          {
            type: "list",
            items: [
              "Acessar linhas de crédito rural, como o Pronaf (juros bem mais baixos).",
              "Vender a sua produção diretamente para o governo via PAA (Programa de Aquisição de Alimentos) e para a merenda escolar via PNAE.",
              "Pedir o SENAF (Selo Nacional da Agricultura Familiar) para colocar na sua embalagem.",
              "Ter acesso a benefícios como aposentadoria especial rural e programas de habitação no campo.",
            ],
          },
        ],
      },
      {
        number: "2",
        title: "Quem tem direito?",
        blocks: [
          {
            type: "list",
            items: [
              "Agricultores familiares e produtores rurais de pequeno porte.",
              "Pescadores artesanais e aquicultores.",
              "Assentados da reforma agrária.",
              "Povos indígenas, quilombolas, extrativistas e ribeirinhos.",
            ],
          },
        ],
      },
      {
        number: "3",
        title: "Como fazer a inscrição no CAF?",
        blocks: [
          {
            type: "highlight",
            tone: "warning",
            title: "Atenção",
            text:
              "Você não consegue fazer esse cadastro sozinho pela internet! Para se inscrever, o produtor precisa procurar um órgão autorizado pelo governo. Apenas os chamados agentes cadastradores autorizados podem acessar o sistema.",
          },
          {
            type: "paragraph",
            text:
              "Onde ir: se você mora no interior ou na Região Metropolitana, não precisa se deslocar até a capital. Procure a unidade do IDAM do seu município — o processo é totalmente gratuito.",
          },
          {
            type: "paragraph",
            text:
              "Onde solicitar no Estado: o cadastro pode ser realizado em qualquer uma das 75 Unidades Locais e postos avançados do IDAM espalhados pelos municípios amazonenses.",
          },
          {
            type: "paragraph",
            text:
              "Documentação básica: documentos pessoais (RG e CPF) de todos que moram na propriedade, comprovante de residência atualizado, documento da terra (contrato, escritura ou ITR) e o Cadastro Ambiental Rural (CAR).",
          },
          {
            type: "highlight",
            tone: "info",
            title: "Consultas",
            text:
              "Após a emissão, você pode baixar o seu extrato de forma online diretamente pela plataforma Meu Imóvel Rural do Governo Federal.",
          },
        ],
      },
      {
        number: "4",
        title: "Documentos básicos que você precisa levar",
        blocks: [
          {
            type: "paragraph",
            text: "Para a Unidade Familiar de Produção Agrária:",
          },
          {
            type: "list",
            items: [
              "Cópia da documentação pessoal.",
              "Documentação comprobatória de propriedade e/ou de posse.",
              "Documentação comprobatória de renda.",
            ],
          },
          {
            type: "paragraph",
            text: "Para empreendimentos familiares rurais e formas associativas de organização:",
          },
          {
            type: "list",
            items: [
              "CNPJ.",
              "Documentação comprobatória da legitimidade dos prepostos responsáveis pela pessoa jurídica.",
              "Cópia do contrato, estatuto social e regimentos internos ou instrumentos.",
            ],
          },
        ],
      },
      {
        number: "🔗",
        title: "Links úteis e acessos diretos",
        blocks: [
          {
            type: "links",
            items: [
              {
                label: "Página oficial do CAF (regras completas)",
                href: "https://www.gov.br/agricultura/pt-br/assuntos/agricultura-familiar/caf/como-obter-o-caf",
              },
              {
                label: "Onde encontrar ajuda",
                note:
                  "Dirija-se à Unidade Local do IDAM mais próxima para realizar o seu cadastro de forma presencial e gratuita com um agente autorizado.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "lei-12651",
    emoji: "🌱",
    shortTitle: "Lei Ambiental",
    title: "Lei 12.651/2012 — Código Florestal Brasileiro",
    subtitle: "Guia do Produtor: seus direitos e deveres ambientais",
    sections: [
      {
        number: "1",
        title: "O que são as Áreas de Preservação Permanente (APPs)?",
        blocks: [
          {
            type: "paragraph",
            text:
              "As APPs são áreas intocáveis da natureza que servem para proteger as águas, o solo e os animais. Ficam, por exemplo, nas beiras dos rios, ao redor de nascentes e em encostas muito íngremes.",
          },
          {
            type: "highlight",
            tone: "warning",
            title: "Regra geral",
            text: "A vegetação nativa dessas áreas não pode ser desmatada.",
          },
          {
            type: "highlight",
            tone: "safe",
            title: "Regra especial para a agricultura familiar (área consolidada)",
            text:
              "Se você já tinha plantações, pastos ou construções em uma APP antes de 22 de julho de 2008, não precisa destruir o que fez. A lei permite continuar suas atividades, mas exige a recuperação de apenas uma pequena faixa de mata na beira do rio, cujo tamanho varia conforme o tamanho da propriedade.",
          },
          {
            type: "highlight",
            tone: "info",
            title: "Culturas de vazante",
            text:
              "O pequeno produtor familiar pode plantar culturas de ciclo curto (como feijão ou melancia) na beira de rios e lagos durante o período de seca (vazante), desde que não desmate novas áreas e proteja a água e o solo.",
          },
        ],
      },
      {
        number: "2",
        title: "Reserva Legal para o pequeno produtor",
        blocks: [
          {
            type: "paragraph",
            text:
              "A Reserva Legal é uma porcentagem da sua terra que deve ser mantida com mata nativa (na Amazônia, esse número costuma ser de 80% para áreas de floresta).",
          },
          {
            type: "highlight",
            tone: "safe",
            title: "Benefício para a pequena propriedade",
            text:
              "Se sua propriedade tem até 4 módulos fiscais e você abriu áreas de plantio ou pasto antes de 22 de julho de 2008, você não é obrigado a replantar a mata para atingir a porcentagem exigida pela lei. A sua Reserva Legal será exatamente a quantidade de mata que sobrou naquele ano.",
          },
          {
            type: "highlight",
            tone: "warning",
            title: "Atenção",
            text: "É proibido fazer novos desmatamentos.",
          },
        ],
      },
      {
        number: "3",
        title: "Posso usar fogo (queimadas) na minha propriedade?",
        blocks: [
          {
            type: "highlight",
            tone: "warning",
            title: "Regra geral",
            text: "O uso do fogo na agricultura e nas florestas é proibido.",
          },
          {
            type: "paragraph",
            text:
              "Exceção (quando é permitido?): o fogo só pode ser usado em situações muito específicas, chamadas de Queima Controlada. Para a agricultura familiar e povos tradicionais, o uso é permitido nas práticas agrícolas de subsistência, ou quando recomendado para controle de pragas (questões fitossanitárias).",
          },
          {
            type: "highlight",
            tone: "caution",
            title: "Atenção",
            text:
              "Mesmo nesses casos permitidos, você precisa pedir autorização com antecedência ao órgão ambiental do seu estado (como o IPAAM, no Amazonas). Queimar sem autorização, mesmo na sua terra, gera multas graves.",
          },
        ],
      },
      {
        number: "4",
        title: "Atividades de \"baixo impacto\" (o que você pode fazer sem medo)",
        blocks: [
          {
            type: "paragraph",
            text:
              "A lei entende que o pequeno produtor precisa da terra para viver. Por isso, são permitidas algumas atividades de \"baixo impacto\" nas áreas de preservação, desde que não destruam a função ambiental da área:",
          },
          {
            type: "list",
            items: [
              "Construção de moradia: você pode construir a casa da sua família na propriedade.",
              "Acessos e pontes: é permitido abrir pequenas vias de acesso e construir pequenas pontes para atravessar rios ou pegar água.",
              "Coleta sustentável: você pode coletar sementes, castanhas e frutos (como o açaí) para consumo próprio ou venda, desde que não derrube as árvores.",
              "Plantio de nativas: é permitido plantar árvores frutíferas e nativas misturadas na mata.",
            ],
          },
        ],
      },
      {
        number: "5",
        title: "Uso de madeira e lenha para a família",
        blocks: [
          {
            type: "paragraph",
            text:
              "A lei sabe que quem vive no campo precisa da floresta para construir cercas ou usar no fogão a lenha.",
          },
          {
            type: "highlight",
            tone: "safe",
            title: "A regra",
            text:
              "O pequeno produtor e as populações tradicionais têm o direito de explorar a floresta de forma sustentável para o seu próprio sustento.",
          },
          {
            type: "paragraph",
            text:
              "Como fazer certo: é permitido retirar lenha para uso doméstico e madeira para construção de benfeitorias dentro da própria propriedade (como cercas ou um galinheiro), sem precisar de autorização prévia dos órgãos ambientais, desde que seja apenas para o uso da família e não para venda comercial.",
          },
        ],
      },
      {
        number: "6",
        title: "Sistemas Agroflorestais (plantar junto com a floresta)",
        blocks: [
          {
            type: "paragraph",
            text:
              "Se o produtor desmatou uma APP (como a beira de um rio) antes de 2008 e precisa recuperar esse pedaço, a lei oferece uma alternativa que gera renda.",
          },
          {
            type: "highlight",
            tone: "safe",
            title: "Regra da recuperação",
            text:
              "A agricultura familiar não precisa recuperar a área plantando apenas mato/árvores nativas que não dão lucro.",
          },
          {
            type: "highlight",
            tone: "info",
            title: "A vantagem",
            text:
              "É permitido fazer a recuperação plantando Sistemas Agroflorestais (SAFs). Você pode misturar árvores nativas da Amazônia com culturas que dão alimento e renda, como cacau, açaí, cupuaçu e banana, desde que mantenha a área sempre com cobertura vegetal.",
          },
        ],
      },
      {
        number: "7",
        title: "Programa de Regularização Ambiental (PRA)",
        blocks: [
          {
            type: "paragraph",
            text:
              "Se o produtor tiver alguma irregularidade ambiental (como desmatamento antigo), ele não precisa se desesperar ou abandonar a terra.",
          },
          {
            type: "highlight",
            tone: "safe",
            title: "A regra",
            text: "Ao se inscrever no CAR, o produtor pode aderir ao PRA (Programa de Regularização Ambiental).",
          },
          {
            type: "highlight",
            tone: "info",
            title: "A vantagem",
            text:
              "Ao entrar nesse programa e assinar um compromisso de que vai recuperar a área aos poucos, as multas ambientais antigas ficam suspensas e o produtor volta a ficar 100% legalizado para trabalhar, vender e conseguir crédito.",
          },
        ],
      },
    ],
  },
];
