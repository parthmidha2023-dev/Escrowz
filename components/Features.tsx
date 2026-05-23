"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, MessageSquare, Scale, Activity, ArrowUpRight } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

const features = [
  {
    title: "Secure Escrow",
    desc: "Funds locked in cold-storage multi-signature smart vault. Released only when both parties cryptographically sign off.",
    tech: "[ MULTI-SIG PROTOCOL ]",
    detail: "Cold vault storage, time-locked release",
    icon: Shield,
    accent: BLUE,
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.3)",
    hoverGlow: "0 0 30px rgba(59,130,246,0.2)",
  },
  {
    title: "Encrypted Chat",
    desc: "High-security peer-to-peer messaging with AES-GCM-256 end-to-end encryption. Files and messages never exposed.",
    tech: "[ AES-GCM-256 CIPHER ]",
    detail: "Zero-knowledge storage, P2P connection",
    icon: MessageSquare,
    accent: CYAN,
    accentBg: "rgba(0,240,255,0.07)",
    accentBorder: "rgba(0,240,255,0.25)",
    hoverGlow: "0 0 30px rgba(0,240,255,0.15)",
  },
  {
    title: "Dispute Protection",
    desc: "Invoke neutral peer-reviewed arbitrators who verify cryptographically-signed audit logs to resolve conflicts fast.",
    tech: "[ DUAL-KEY RESOLUTION ]",
    detail: "Expert-led review, verifiable state logs",
    icon: Scale,
    accent: "#a855f7",
    accentBg: "rgba(168,85,247,0.07)",
    accentBorder: "rgba(168,85,247,0.25)",
    hoverGlow: "0 0 30px rgba(168,85,247,0.2)",
  },
  {
    title: "Instant Deal Tracking",
    desc: "Track transaction lifecycle in real-time. Dynamic webhooks, email alerts, and live event ledgers notify both parties instantly.",
    tech: "[ WEBSOCKET-LIVE STATE ]",
    detail: "Millisecond syncing, ledger indicators",
    icon: Activity,
    accent: "#10b981",
    accentBg: "rgba(16,185,129,0.07)",
    accentBorder: "rgba(16,185,129,0.25)",
    hoverGlow: "0 0 30px rgba(16,185,129,0.2)",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="cyber-grid"
      style={{
        padding: "100px 24px",
        background: "rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 14px", borderRadius: 999,
              border: `1px solid rgba(59,130,246,0.25)`,
              background: "rgba(59,130,246,0.07)",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 10, color: CYAN, textTransform: "uppercase",
              letterSpacing: "0.14em", marginBottom: 20,
            }}
          >
            Platform Core
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900,
              lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff",
              marginBottom: 16,
            }}
          >
            Cryptographic Safety.<br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>For Every Transaction.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
              color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Multiple layers of industry-leading fintech security and cryptographic frameworks keep every transaction bulletproof.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: 24,
        }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="glass"
                style={{
                  borderRadius: 20, padding: "28px 30px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: "default", position: "relative", overflow: "hidden",
                  transition: "border-color 0.35s, box-shadow 0.35s, transform 0.3s",
                }}
                whileHover={{
                  y: -5,
                  boxShadow: f.hoverGlow,
                  borderColor: f.accentBorder,
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: f.accentBg, border: `1px solid ${f.accentBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={22} color={f.accent} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em",
                  }}>{f.tech}</span>
                </div>

                {/* Content */}
                <h3 style={{
                  fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: 10,
                  display: "flex", alignItems: "center", gap: 6,
                  transition: "color 0.2s",
                }}>
                  {f.title}
                  <ArrowUpRight size={16} color={f.accent} style={{ opacity: 0.5 }} />
                </h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                  {f.desc}
                </p>

                {/* Footer */}
                <div style={{
                  marginTop: 26, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 9, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em",
                  }}>
                    Specs: {f.detail}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                    <span style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 8, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.12em",
                    }}>Secure</span>
                  </div>
                </div>

                {/* Bottom neon line on hover */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(to right, transparent, ${f.accent}40, transparent)`,
                  transition: "opacity 0.4s",
                }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
