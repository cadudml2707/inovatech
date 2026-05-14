"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Leaf, MessageCircle, Send, X } from "lucide-react";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Olá! Sou o assistente AgroAmazônia. Posso responder com base no contexto da plataforma sobre clima, alertas, plantio e calendário agrícola.",
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping, isOpen]);

  function createMessage(role: ChatRole, text: string): ChatMessage {
    const id = `${role}-${nextId.current}`;
    nextId.current += 1;
    return { id, role, text };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const history = messages
      .filter((message) => message.id !== "welcome")
      .slice(-8)
      .map(({ role, text }) => ({ role, text }));
    const userMessage = createMessage("user", trimmed);

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        answer?: string;
        error?: string;
      };

      if (!response.ok || !data.answer) {
        throw new Error(data.error ?? "Não foi possível obter resposta da IA agora.");
      }

      setMessages((current) => [...current, createMessage("assistant", data.answer ?? "")]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível obter resposta da IA agora.";

      setMessages((current) => [...current, createMessage("assistant", message)]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="Chat do assistente AgroAmazônia"
          className="w-[calc(100vw-2.5rem)] max-w-[420px] overflow-hidden rounded-2xl border shadow-2xl"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "0 20px 56px rgba(15,61,46,0.26)",
          }}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3"
            style={{
              backgroundColor: "#0f3d2e",
              color: "#fff",
            }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#ffc107" }}
                aria-hidden="true"
              >
                <Leaf size={20} color="#0f3d2e" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">Assistente AgroAmazônia</h2>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.62)" }}>
                  IA com contexto da plataforma
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              aria-label="Fechar chat"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={messagesRef}
            className="flex max-h-[520px] min-h-[360px] flex-col gap-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
            style={{ backgroundColor: "var(--bg-card)" }}
          >
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className="max-w-[84%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                    style={{
                      backgroundColor: isUser ? "#2d7a53" : "var(--bg-card-inner)",
                      color: isUser ? "#fff" : "var(--text-secondary)",
                      border: isUser ? "1px solid #2d7a53" : "1px solid var(--border)",
                      borderBottomRightRadius: isUser ? "6px" : "16px",
                      borderBottomLeftRadius: isUser ? "16px" : "6px",
                    }}
                  >
                    {message.text}
                  </p>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <p
                  className="rounded-2xl px-3 py-2 text-sm"
                  style={{
                    backgroundColor: "var(--bg-card-inner)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    borderBottomLeftRadius: "6px",
                  }}
                >
                  digitando...
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t px-3 py-3"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isTyping}
              className="min-h-11 flex-1 rounded-xl border px-3 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: "var(--bg-card-inner)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="Digite sua dúvida..."
              aria-label="Mensagem para o assistente"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#f4b400", color: "#0f3d2e" }}
              aria-label="Enviar mensagem"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl shadow-lg transition-transform active:scale-95"
        style={{
          backgroundColor: "#0f3d2e",
          color: "#ffc107",
          boxShadow: "0 10px 28px rgba(15,61,46,0.28)",
        }}
        aria-label={isOpen ? "Minimizar chat" : "Abrir chat"}
        aria-expanded={isOpen}
      >
        <MessageCircle size={26} strokeWidth={2.2} />
      </button>
    </div>
  );
}
