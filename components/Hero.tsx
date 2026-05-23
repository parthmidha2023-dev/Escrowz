"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Key, Lock, Cpu, ShieldCheck, Layers } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

const steps = [
  { title: "INITIALIZE", desc: "Contract created with buyer & seller keys", icon: Key },
  { title: "DEPOSIT",    desc: "Funds locked in multisig security vault",    icon: Lock },
  { title: "VERIFY",     desc: "Asset transferred and cryptographically audited", icon: Cpu },
  { title: "RELEASE",    desc: "Dual signatures trigger instant payout",     icon: ShieldCheck },
];

export default function Hero() {
  const [step, setStep] = useState(0);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="cyber-grid"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "8%",
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1100, width: "100%", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 64, alignItems: "center",
        position: "relative", zIndex: 10,
      }}
        className="hero-grid"
      >
        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px", borderRadius: 999,
              border: `1px solid rgba(59,130,246,0.3)`,
              background: "rgba(59,130,246,0.08)",
              alignSelf: "flex-start",
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: CYAN, boxShadow: `0 0 8px ${CYAN}`,
              display: "inline-block", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
              color: CYAN, textTransform: "uppercase",
            }}>
              V4.1 Protocol Active
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 900, lineHeight: 1.1,
              letterSpacing: "-0.02em", color: "#fff",
              marginBottom: 18,
            }}>
              Zero-Trust Escrow.<br />
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Absolute Protection.</span>
            </h1>
            <p style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              color: "rgba(255,255,255,0.55)", fontWeight: 400,
              lineHeight: 1.7, maxWidth: 480,
            }}>
              Secure gaming accounts, high-value crypto swaps, freelance work, and premium digital products inside our multi-signature vault.{" "}
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Safe. E2E Encrypted. Unstoppable.</span>
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <button
              onClick={() => scrollTo("#features")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 12,
                background: BLUE, color: "#fff",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", border: "none", cursor: "pointer",
                boxShadow: "0 0 28px rgba(59,130,246,0.4)",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 45px rgba(59,130,246,0.7)"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 28px rgba(59,130,246,0.4)"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Start a Deal <ArrowRight size={15} />
            </button>
            <button
              onClick={() => scrollTo("#features")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)", color: "#fff",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(0,240,255,0.4)`; e.currentTarget.style.background = "rgba(0,240,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            >
              Live Escrow
            </button>
          </motion.div>

          {/* Spec badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            style={{
              display: "flex", gap: 20, flexWrap: "wrap",
              paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 11,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {[
              { dot: "#22c55e", label: "E2E Chat Encrypted" },
              { dot: BLUE,      label: "Multi-Sig Vault" },
              { dot: CYAN,      label: "Arbitration Enabled" },
            ].map(({ dot, label }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, display: "inline-block" }} />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: Terminal card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="glass"
            style={{
              width: "100%", maxWidth: 420, borderRadius: 20,
              padding: 22, border: `1px solid rgba(59,130,246,0.22)`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Terminal top bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)",
              marginBottom: 16, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10,
              color: "rgba(255,255,255,0.4)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["rgba(239,68,68,0.4)", "rgba(234,179,8,0.4)", "rgba(34,197,94,0.4)"].map((c, i) => (
                    <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
                  ))}
                </div>
                <span>LEDGER // ESC-4402</span>
              </div>
              <span style={{ color: CYAN, fontSize: 9, fontWeight: 700 }}>SYS.READY</span>
            </div>

            {/* Transaction details */}
            <div style={{
              background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 12, padding: "12px 14px", marginBottom: 12,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Initiator</p>
                <p style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "#fff", fontWeight: 700 }}>buyer_0x4f2d...b1</p>
              </div>
              <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.08)" }} />
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Recipient</p>
                <p style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "#fff", fontWeight: 700 }}>seller_valkyrie</p>
              </div>
            </div>

            {/* Asset info */}
            <div style={{
              background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 12, padding: "12px 14px", marginBottom: 14,
            }}>
              {[
                { label: "ASSET CODE:", value: "CS2_GLOVE_SAPPHIRE", color: "#fff" },
                { label: "LOCKED VAL:", value: "$14,500.00 USD", color: CYAN },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color, fontWeight: 700 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Protocol steps */}
            <p style={{
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 9,
              color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
              letterSpacing: "0.14em", marginBottom: 10,
            }}>Protocol Checkpoints</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isActive = step === idx;
                const isDone = step > idx;
                return (
                  <div
                    key={s.title}
                    onClick={() => setStep(idx)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "9px 11px", borderRadius: 10, cursor: "pointer",
                      border: `1px solid ${isActive ? "rgba(0,240,255,0.6)" : isDone ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)"}`,
                      background: isActive ? "rgba(0,240,255,0.06)" : isDone ? "rgba(34,197,94,0.04)" : "rgba(0,0,0,0.2)",
                      opacity: isActive ? 1 : isDone ? 0.65 : 0.4,
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isActive ? "rgba(0,240,255,0.15)" : isDone ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                      color: isActive ? CYAN : isDone ? "#22c55e" : "rgba(255,255,255,0.4)",
                    }}>
                      <Icon size={13} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.1em",
                        }}>{s.title}</span>
                        {isActive && <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, color: CYAN, fontWeight: 700 }}>ACTIVE</span>}
                        {isDone  && <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, color: "#22c55e", fontWeight: 700 }}>DONE</span>}
                      </div>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep((p) => (p + 1) % 4)}
              style={{
                width: "100%", padding: "11px",
                borderRadius: 12, cursor: "pointer",
                background: "rgba(59,130,246,0.1)",
                border: `1px solid rgba(59,130,246,0.4)`,
                color: CYAN, fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.12em", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 6, transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.1)")}
            >
              Cycle Ledger Status <Layers size={11} />
            </button>

            {/* Decorative lines */}
            <div style={{ position: "absolute", top: 0, right: "28%", width: 1, height: 44, background: `linear-gradient(to bottom, ${CYAN}80, transparent)` }} />
            <div style={{ position: "absolute", bottom: 0, left: "28%", height: 1, width: 44, background: `linear-gradient(to right, transparent, ${CYAN}80)` }} />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
