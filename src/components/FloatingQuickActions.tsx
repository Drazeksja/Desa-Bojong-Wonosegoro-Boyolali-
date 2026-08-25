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

export default function FloatingQuickActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Halo! Saya Kang Bot 👋\n\nAsisten virtual resmi Desa Bojong, siap bantu kamu! 😄\n\nMau tanya soal layanan surat, jadwal posyandu, info desa, atau yang lainnya — langsung tanya aja, jangan malu-malu!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Close floating menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => setIsChatVisible(true), 10);
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setIsChatVisible(false);
    }
  }, [isChatOpen]);

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

  const panelVisible = isChatOpen && isChatVisible;

  // 4 items to display
  const actionItems = [
    {
      id: "instagram",
      label: "Instagram KKN",
      href: "https://www.instagram.com/kknbojong.wonosegoro?igsi=ZTN0YWllcHB6azB6",
      gradient: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      shadow: "0 4px 15px rgba(220, 39, 67, 0.4)",
      hoverShadow: "0 6px 20px rgba(220, 39, 67, 0.6)",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      id: "youtube",
      label: "Video Profil Desa",
      href: "https://youtu.be/LX78yRjf5bo?si=6whfT2Xze9XKbbvv",
      background: "#FF0000",
      shadow: "0 4px 15px rgba(255, 0, 0, 0.4)",
      hoverShadow: "0 6px 20px rgba(255, 0, 0, 0.6)",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      id: "whatsapp",
      label: "Hubungi WhatsApp",
      href: "https://wa.me/6208xxxxxxxxxx",
      background: "#25D366",
      shadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
      hoverShadow: "0 6px 20px rgba(37, 211, 102, 0.6)",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      id: "chatbot",
      label: "AI Chatbot Desa",
      onClick: () => {
        setIsChatOpen(true);
        setIsMenuOpen(false);
      },
      gradient: "linear-gradient(135deg, #1e3a8a, #2563eb)",
      shadow: "0 4px 15px rgba(37, 99, 235, 0.4)",
      hoverShadow: "0 6px 20px rgba(37, 99, 235, 0.6)",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ============================================================ */}
      {/* CHAT PANEL MODAL                                             */}
      {/* ============================================================ */}
      <div
        style={{
          position: "fixed",
          bottom: "92px",
          right: "24px",
          width: "360px",
          maxWidth: "calc(100vw - 32px)",
          height: "520px",
          maxHeight: "calc(100vh - 120px)",
          zIndex: 10000,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--bg-white, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          opacity: panelVisible ? 1 : 0,
          transform: panelVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: isChatOpen ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--primary-dark, #0f172a) 0%, var(--primary, #1e3a8a) 100%)",
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
            onClick={() => setIsChatOpen(false)}
            aria-label="Tutup Chat"
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
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                </div>
              )}
              <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #1e3a8a, #2563eb)" : "var(--bg-surface, #f8fafc)",
                  color: msg.role === "user" ? "white" : "var(--text-main, #1e293b)",
                  fontSize: "0.875rem", lineHeight: 1.6,
                  border: msg.role === "bot" ? "1px solid var(--border, #e2e8f0)" : "none",
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
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted, #64748b)", marginTop: "4px", paddingLeft: "4px", paddingRight: "4px" }}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
              </div>
              <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "var(--bg-surface, #f8fafc)", border: "1px solid var(--border, #e2e8f0)", display: "flex", gap: "5px", alignItems: "center" }}>
                <span className="cbot-dot cbot-d0" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--primary, #2563eb)", display: "block" }} />
                <span className="cbot-dot cbot-d1" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--primary, #2563eb)", display: "block" }} />
                <span className="cbot-dot cbot-d2" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--primary, #2563eb)", display: "block" }} />
              </div>
            </div>
          )}

          {messages.length === 1 && !isLoading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted, #64748b)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Coba tanya ini 👇
              </div>
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: "var(--bg-surface, #f8fafc)", border: "1px solid var(--border, #e2e8f0)",
                    borderRadius: "10px", padding: "8px 12px", fontSize: "0.8rem",
                    color: "var(--text-main, #1e293b)", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary, #2563eb)"; e.currentTarget.style.background = "var(--bg-white, #ffffff)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border, #e2e8f0)"; e.currentTarget.style.background = "var(--bg-surface, #f8fafc)"; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border, #e2e8f0)", flexShrink: 0, backgroundColor: "var(--bg-white, #ffffff)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              disabled={isLoading}
              style={{
                flex: 1, border: "1.5px solid var(--border, #e2e8f0)", borderRadius: "12px",
                padding: "10px 14px", fontSize: "0.875rem",
                backgroundColor: "var(--bg-surface, #f8fafc)", color: "var(--text-main, #1e293b)",
                outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--primary, #2563eb)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border, #e2e8f0)"; }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Kirim Pesan"
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: inputValue.trim() && !isLoading ? "linear-gradient(135deg, #1e3a8a, #2563eb)" : "var(--bg-surface, #f8fafc)",
                border: "none",
                cursor: inputValue.trim() && !isLoading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
                color: inputValue.trim() && !isLoading ? "white" : "var(--text-muted, #64748b)",
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FLOATING ACTION SPEED DIAL HUB                               */}
      {/* ============================================================ */}
      <div
        ref={menuContainerRef}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* Child Items Popup Menu */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-end",
            marginBottom: "16px",
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
        >
          {actionItems.map((item, index) => {
            // Calculate delay for staggered bounce
            const reverseIndex = actionItems.length - 1 - index;
            const delay = isMenuOpen ? `${reverseIndex * 50}ms` : "0ms";

            const buttonElement = (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0) scale(1)" : "translateY(24px) scale(0.6)",
                  transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}`,
                }}
              >
                {/* Tooltip Label */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    border: "1px solid rgba(255,255,255,0.1)",
                    letterSpacing: "0.2px",
                  }}
                >
                  {item.label}
                </div>

                {/* Circle Icon Button */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: item.gradient || item.background,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: item.shadow,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.12)";
                    e.currentTarget.style.boxShadow = item.hoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = item.shadow;
                  }}
                >
                  {item.icon}
                </div>
              </div>
            );

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {buttonElement}
                </a>
              );
            }

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                {buttonElement}
              </button>
            );
          })}
        </div>

        {/* Main Floating Trigger Button */}
        <button
          id="hub-fab-btn"
          onClick={() => {
            if (isChatOpen) {
              setIsChatOpen(false);
            }
            setIsMenuOpen(!isMenuOpen);
          }}
          title={isMenuOpen ? "Tutup Menu" : "Pusat Layanan & Media Desa"}
          aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu Layanan & Media"}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: isMenuOpen
              ? "#0f172a"
              : "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0284c7 100%)",
            color: "white",
            border: "2px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isMenuOpen
              ? "0 6px 25px rgba(15, 23, 42, 0.4)"
              : "0 6px 24px rgba(37, 99, 235, 0.45)",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, box-shadow 0.3s ease",
            transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = isMenuOpen ? "rotate(90deg) scale(1.08)" : "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(37, 99, 235, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = isMenuOpen ? "rotate(90deg)" : "scale(1)";
            e.currentTarget.style.boxShadow = isMenuOpen
              ? "0 6px 25px rgba(15, 23, 42, 0.4)"
              : "0 6px 24px rgba(37, 99, 235, 0.45)";
          }}
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          ) : (
            <div style={{ position: "relative", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              {/* Notification Ping Badge */}
              <span
                className="cbot-pulse"
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  border: "2px solid white",
                }}
              />
            </div>
          )}
        </button>
      </div>

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
