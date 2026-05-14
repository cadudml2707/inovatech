import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  role: ChatRole;
  text: string;
}

interface GeminiResponse {
  candidates?: Array<{
    finishReason?: string;
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
}

const CONTEXT_PATH = join(process.cwd(), "data", "chat-context.md");
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3-flash-preview";
const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_MESSAGES = 8;
const MAX_OUTPUT_TOKENS = 1200;

function isChatRole(value: unknown): value is ChatRole {
  return value === "assistant" || value === "user";
}

function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) return [];

  return history
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      role: item.role,
      text: item.text,
    }))
    .filter(
      (item): item is ChatMessage =>
        isChatRole(item.role) && typeof item.text === "string" && item.text.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => ({
      role: item.role,
      text: item.text.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));
}

function formatHistory(history: ChatMessage[]) {
  if (history.length === 0) return "Sem histórico anterior.";

  return history
    .map((message) => {
      const speaker = message.role === "user" ? "Usuário" : "Assistente";
      return `${speaker}: ${message.text}`;
    })
    .join("\n");
}

function buildPrompt({
  context,
  history,
  message,
}: {
  context: string;
  history: ChatMessage[];
  message: string;
}) {
  return `
Você é o assistente da plataforma AgroAmazônia Inteligente.

Regras obrigatórias:
- Responda sempre em português do Brasil.
- Use somente o CONTEXTO OFICIAL abaixo.
- Se a resposta não estiver no contexto, diga que não encontrou essa informação no contexto disponível.
- Não invente dados climáticos em tempo real.
- Não substitua orientação de um técnico agrícola.
- Seja direto e útil para produtores rurais.
- Entregue uma resposta completa, sem terminar no meio de uma frase ou item.
- Prefira respostas curtas: no máximo 6 frases ou 6 bullets, salvo se o usuário pedir detalhes.

CONTEXTO OFICIAL:
${context}

HISTÓRICO RECENTE:
${formatHistory(history)}

PERGUNTA DO USUÁRIO:
${message}
`.trim();
}

function extractGeminiText(data: GeminiResponse) {
  return data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter((text): text is string => Boolean(text))
    .join("")
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "A integração com Gemini ainda não está configurada. Defina GEMINI_API_KEY no arquivo .env.local.",
      },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("message" in body)) {
    return NextResponse.json({ error: "Mensagem obrigatória." }, { status: 400 });
  }

  const message = (body as { message?: unknown }).message;
  const history = sanitizeHistory((body as { history?: unknown }).history);

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Mensagem obrigatória." }, { status: 400 });
  }

  const trimmedMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);
  const context = await readFile(CONTEXT_PATH, "utf8");
  const prompt = buildPrompt({
    context,
    history,
    message: trimmedMessage,
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
        },
      }),
    }
  );

  const data = (await response.json().catch(() => ({}))) as GeminiResponse;

  if (!response.ok) {
    console.error("Gemini API error", data.error?.message ?? response.statusText);
    return NextResponse.json(
      { error: "Não foi possível obter resposta da IA agora." },
      { status: 502 }
    );
  }

  const answer = extractGeminiText(data);
  const finishReason = data.candidates?.[0]?.finishReason;

  if (finishReason === "MAX_TOKENS") {
    console.warn("Gemini response reached max output tokens");
  }

  if (!answer) {
    return NextResponse.json(
      { error: "A IA não retornou uma resposta em texto." },
      { status: 502 }
    );
  }

  return NextResponse.json({ answer });
}
