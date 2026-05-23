"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Server, Cpu, Database, Eye } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

const statsList = [
  {
    label: "TOTAL FUNDS SECURED",
    value: "$42,891,402",
    suffix: "+",
    icon: ShieldCheck,
    detail: "No leakage, zero capital risk history",
    status: "SECURED VAULTS",
    color: BLUE,
  },
  {
    label: "ACTIVE NETWORK USERS",
    value: "120,402",
    suffix: "+",
    icon: Server,
    detail: "E2E P2P network handshakes",
    status: "NODES: ACTIVE",
    color: CYAN,
  },
  {
    label: "DEALS COMPLETED",
    value: "502,890",
    suffix: "+",
    icon: Cpu,
    detail: "Automatic escrow resolutions",
    status: "VERIFIED SIGNATURES",
    color: "#a855f7",
  },
];

const TICK_IDS = ["TX-8802", "TX-1094", "TX-5531", "TX-7740", "TX-9102"];
const TICK_VALS = ["$350", "$14,500", "$8,200", "$1,950", "$28,000"];
const TICK_TYPES = ["GAMING", "CRYPTO", "WORK", "DIGITAL", "CRYPTO"];

export default function Stats() {
  const [txFeed, setTxFeed] = useState([
    { id: "TX-4029", val: "$1,250", type: "GAMING" },
    { id: "TX-9910", val: "$22,400", type: "CRYPTO" },
    { id: "TX-3122", val: "$4,500", type: "WORK" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const i = Math.floor(Math.random() * TICK_IDS.length);
      setTxFeed((prev) => [{ id: TICK_IDS[i], val: TICK_VALS[i], type: TICK_TYPES[i] }, prev[0], prev[1]]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="stats"
      className="cyber-grid"
      style={{
        padding: "100px 24px",
        background: "rgba(3,4,8,0.8)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scan-line accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, transparent, ${CYAN}30, transparent)`,
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2,
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 64, alignItems: "center",
      }}
        className="stats-grid"
      >
        {/* ── Left: Header + stat cards ── */}
        <div>
          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", padding: "5px 14px", borderRadius: 999,
              border: `1px solid rgba(59,130,246,0.25)`, background: "rgba(59,130,246,0.07)",
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 10,
              color: CYAN, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 18,
            }}>
              Network Statistics
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900,
              lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff",
            }}>
              Secured Ledger.<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Verified Live Data.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="stats-cards">
            {statsList.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass"
                  style={{
                    borderRadius: 16, padding: "20px 18px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "border-color 0.3s",
                  }}
                  whileHover={{ borderColor: "rgba(59,130,246,0.25)" }}
                >
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14,
                  }}>
                    <span style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 8, color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase", letterSpacing: "0.1em",
                    }}>{s.status}</span>
                    <Icon size={14} color="rgba(255,255,255,0.25)" />
                  </div>
                  <p style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "clamp(1.3rem, 2vw, 1.7rem)", fontWeight: 900,
                    color: s.color, lineHeight: 1,
                    textShadow: `0 0 20px ${s.color}44`,
                  }}>
                    {s.value}<span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>{s.suffix}</span>
                  </p>
                  <p style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6,
                  }}>{s.label}</p>
                  <p style={{
                    fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 10,
                    paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}>{s.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Right: Live feed ── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ width: 280, flexShrink: 0 }}
        >
          <div
            className="glass"
            style={{
              borderRadius: 18, padding: "18px 16px",
              border: `1px solid rgba(59,130,246,0.2)`,
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Scan line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(to right, transparent, ${CYAN}40, transparent)`,
              animation: "scan-line 4s linear infinite",
            }} />

            {/* Header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Database size={14} color={CYAN} />
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 9, fontWeight: 700, color: "#fff",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>Live Deal Ledger</span>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "3px 8px", borderRadius: 6,
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                  display: "inline-block",
                }} />
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 8, fontWeight: 700, color: "#22c55e", textTransform: "uppercase",
                }}>SYNCED</span>
              </div>
            </div>

            {/* Feed items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {txFeed.map((tx, idx) => (
                <motion.div
                  key={`${tx.id}-${idx}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 12px", borderRadius: 11,
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(0,0,0,0.25)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: `${BLUE}80`, display: "inline-block" }} />
                    <div>
                      <span style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 10, fontWeight: 700, color: "#fff", display: "block",
                      }}>{tx.id}</span>
                      <span style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                      }}>{tx.type}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 12, fontWeight: 700, color: CYAN,
                      textShadow: `0 0 10px ${CYAN}66`, display: "block",
                    }}>{tx.val}</span>
                    <span style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 8, fontWeight: 700, color: "#22c55e", textTransform: "uppercase",
                    }}>LOCKED</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 8,
              color: "rgba(255,255,255,0.25)",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Eye size={10} color="rgba(255,255,255,0.25)" /> INTEGRITY: SHA-512
              </span>
              <span>LATENCY: 14MS</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
