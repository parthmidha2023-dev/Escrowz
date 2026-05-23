"use client";

import React, { useState } from "react";
import { Shield, Send, Terminal, ArrowUpRight, Check, AlertCircle } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

export default function Footer() {
  const [dealId, setDealId] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealId.trim()) return;
    setStatus("verifying");
    setTimeout(() => {
      setStatus(
        dealId.toLowerCase().includes("esc-4402") || dealId.toLowerCase() === "demo"
          ? "success"
          : "error"
      );
    }, 1500);
  };

  return (
    <footer
      className="cyber-grid"
      style={{
        background: "#030408",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "80px 24px 36px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.8fr",
          gap: 48, marginBottom: 64,
        }} className="footer-grid">

          {/* Col 1: Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(59,130,246,0.12)",
                border: `1px solid rgba(59,130,246,0.35)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Shield size={17} color={BLUE} />
              </div>
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 700, fontSize: 17, color: "#fff",
              }}>
                escrowz<span style={{ color: CYAN }}>.</span>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 400, marginLeft: 2 }}>lol</span>
              </span>
            </a>
            <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 280 }}>
              The luxury standard for zero-trust digital escrow agreements. Securing high-value assets with hardware-grade cryptographic proof and neutral arbitration pools.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["[ SOC-2 TYPE II ]", "[ ISO 27001 ]", "[ AES-GCM-256 ]"].map((tag, i) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, fontWeight: 700,
                  color: i === 2 ? CYAN : "rgba(255,255,255,0.35)",
                  border: `1px solid ${i === 2 ? "rgba(0,240,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                  background: i === 2 ? "rgba(0,240,255,0.05)" : "rgba(255,255,255,0.02)",
                  padding: "4px 10px", borderRadius: 6,
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Col 2: Protocol links */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, fontWeight: 800,
              color: CYAN, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 18,
            }}>// PROTOCOL</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {["Secure Node", "Multisig Vault", "Arbitration Pool", "Audit Ledger"].map((item) => (
                <li key={item}>
                  <a href="#features" style={{
                    fontSize: "0.82rem", color: "rgba(255,255,255,0.5)",
                    textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    {item}
                    <ArrowUpRight size={11} style={{ opacity: 0.4 }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sectors links */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, fontWeight: 800,
              color: CYAN, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 18,
            }}>// SECTORS</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {["Gaming Accounts", "Crypto Swaps", "Freelance Jobs", "SaaS Licensing"].map((item) => (
                <li key={item}>
                  <a href="#categories" style={{
                    fontSize: "0.82rem", color: "rgba(255,255,255,0.5)",
                    textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    {item}
                    <ArrowUpRight size={11} style={{ opacity: 0.4 }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verify widget */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, fontWeight: 800,
              color: CYAN, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12,
            }}>// LEDGER INTEGRITY CHECK</h4>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 14 }}>
              Enter a deal code to verify its lockbox status. Try{" "}
              <span style={{ color: CYAN, fontFamily: "var(--font-geist-mono), monospace" }}>ESC-4402</span>.
            </p>
            <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ position: "relative" }}>
                <Terminal size={14} color="rgba(255,255,255,0.25)" style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                }} />
                <input
                  type="text"
                  value={dealId}
                  onChange={(e) => setDealId(e.target.value)}
                  placeholder="ESC-XXXX-XXXX"
                  style={{
                    width: "100%", paddingLeft: 36, paddingRight: 44, paddingTop: 10, paddingBottom: 10,
                    borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(0,0,0,0.4)",
                    fontFamily: "var(--font-geist-mono), monospace", fontSize: 12,
                    color: "#fff", outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = `rgba(0,240,255,0.5)`)}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button type="submit" style={{
                  position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                  width: 28, height: 28, borderRadius: 8,
                  background: "rgba(59,130,246,0.15)", border: `1px solid rgba(59,130,246,0.35)`,
                  color: CYAN, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "background 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.15)")}
                >
                  <Send size={12} />
                </button>
              </div>

              {status === "verifying" && (
                <p style={{
                  fontFamily: "var(--font-geist-mono), monospace", fontSize: 9,
                  color: "#eab308", display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#eab308", display: "inline-block" }} />
                  VERIFYING KEYS &amp; LEDGER STATE...
                </p>
              )}
              {status === "success" && (
                <div style={{
                  padding: "10px 12px", borderRadius: 10,
                  background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)",
                  fontFamily: "var(--font-geist-mono), monospace", fontSize: 9,
                  color: "#22c55e",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700, marginBottom: 4 }}>
                    <Check size={12} /> LEDGER MUTEX LOCKED [SECURE]
                  </div>
                  <p style={{ opacity: 0.7 }}>Hash: 8b4a...f30d // Balance: $14,500.00 USD</p>
                </div>
              )}
              {status === "error" && (
                <div style={{
                  padding: "10px 12px", borderRadius: 10,
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
                  fontFamily: "var(--font-geist-mono), monospace", fontSize: 9,
                  color: "#ef4444", display: "flex", alignItems: "center", gap: 5,
                }}>
                  <AlertCircle size={12} /> LEDGER NOT FOUND OR CORRUPTED KEYS
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "center", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
              © {new Date().getFullYear()} escrowz.lol. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Network Online
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* X */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{
              width: 32, height: 32, borderRadius: 9,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)", textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = `rgba(0,240,255,0.35)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              aria-label="X (Twitter)"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Discord */}
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" style={{
              width: 32, height: 32, borderRadius: 9,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)", textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = `rgba(0,240,255,0.35)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              aria-label="Discord"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
