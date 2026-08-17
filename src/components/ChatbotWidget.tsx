"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "Halo Kang Bot! 👋",
  "Jadwal Posyandu bulan ini?",
  "Cara bikin surat keterangan?",
  "Siapa kepala desa Bojong?",
  "Ada UMKM apa di Desa Bojong?",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Halo! Saya Kang Bot 👋\n\nAsisten virtual resmi Desa Bojong, siap bantu kamu! 😄\n\nMau tanya soal layanan surat, jadwal posyandu, info desa, atau yang lainnya — langsung tanya aja, jangan malu-malu!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getHistory = () =>
    messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      text: m.text,
    }));

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history: getHistory() }),
      });
      const data = await res.json();
      const botMsg: Message = {
        role: "bot",
        text: data.reply || data.error || "Maaf, terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Maaf, tidak dapat terhubung ke server. Silakan coba lagi.", timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const panelVisible = isOpen && isVisible;

  return (
    <>
      {/* Chat panel */}
      <div
        style={{
          position: "fixed",
          bottom: "96px",
          right: "24px",
          width: "360px",
          maxWidth: "calc(100vw - 32px)",
          height: "520px",
          maxHeight: "calc(100vh - 140px)",
          zIndex: 9998,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--bg-white)",
          border: "1px solid var(--border)",
          opacity: panelVisible ? 1 : 0,
          transform: panelVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "42px", height: "42px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2 }}>
              Kang Bot
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#4ade80", display: "inline-block" }} />
              Asisten Virtual Desa Bojong 🌿
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
              width: "32px", height: "32px", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", color: "white", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", scrollbarWidth: "thin" }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
              {msg.role === "bot" && (
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary-dark), var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                </div>
              )}
              <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, var(--primary-dark), var(--primary))" : "var(--bg-surface)",
                  color: msg.role === "user" ? "white" : "var(--text-main)",
                  fontSize: "0.875rem", lineHeight: 1.6,
                  border: msg.role === "bot" ? "1px solid var(--border)" : "none",
                  wordBreak: "break-word",
                }}>
                  {msg.role === "bot" ? (
                    msg.text.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split("\n").length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    msg.text
                  )}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px", paddingLeft: "4px", paddingRight: "4px" }}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary-dark), var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
              </div>
              <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "var(--bg-surface)", border: "1px solid var(--border)", display: "flex", gap: "5px", alignItems: "center" }}>
                <span className="cbot-dot cbot-d0" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--primary)", display: "block" }} />
                <span className="cbot-dot cbot-d1" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--primary)", display: "block" }} />
                <span className="cbot-dot cbot-d2" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--primary)", display: "block" }} />
              </div>
            </div>
          )}

          {messages.length === 1 && !isLoading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Coba tanya ini 👇
              </div>
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: "var(--bg-surface)", border: "1px solid var(--border)",
                    borderRadius: "10px", padding: "8px 12px", fontSize: "0.8rem",
                    color: "var(--text-main)", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.background = "var(--bg-white)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-surface)"; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", flexShrink: 0, backgroundColor: "var(--bg-white)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              disabled={isLoading}
              style={{
                flex: 1, border: "1.5px solid var(--border)", borderRadius: "12px",
                padding: "10px 14px", fontSize: "0.875rem",
                backgroundColor: "var(--bg-surface)", color: "var(--text-main)",
                outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: inputValue.trim() && !isLoading ? "linear-gradient(135deg, var(--primary-dark), var(--primary))" : "var(--bg-surface)",
                border: "none",
                cursor: inputValue.trim() && !isLoading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
                color: inputValue.trim() && !isLoading ? "white" : "var(--text-muted)",
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* FAB Button */}
      <button
        id="chatbot-fab-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat dengan Asisten Desa"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: isOpen
            ? "linear-gradient(135deg, var(--primary-dark), var(--primary))"
            : "linear-gradient(135deg, #1e3a8a, #2563eb)",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(30,58,138,0.45)",
          zIndex: 9999,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(30,58,138,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(30,58,138,0.45)";
        }}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
        {!isOpen && (
          <span
            className="cbot-pulse"
            style={{
              position: "absolute", top: "4px", right: "4px",
              width: "12px", height: "12px", borderRadius: "50%",
              background: "var(--accent, #d97706)", border: "2px solid white",
            }}
          />
        )}
      </button>

      <style>{`
        .cbot-d0 { animation: cbotDot 1.2s ease-in-out 0s infinite; }
        .cbot-d1 { animation: cbotDot 1.2s ease-in-out 0.2s infinite; }
        .cbot-d2 { animation: cbotDot 1.2s ease-in-out 0.4s infinite; }
        @keyframes cbotDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .cbot-pulse { animation: cbotPulse 2s ease-in-out infinite; }
        @keyframes cbotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
      `}</style>
    </>
  );
}