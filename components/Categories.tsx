"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, Coins, Briefcase, Globe, CheckCircle2 } from "lucide-react";

const CYAN = "#00f0ff";

const categories = [
  {
    title: "Gaming Accounts",
    tag: "HIGH VALUE DIGITAL ITEMS",
    icon: Gamepad2,
    items: ["Steam & Epic Games Accounts", "Valorant & League Profiles", "Rare CS2 Skins & Knives", "Clash of Clans & Mobile Assets"],
    metrics: { pool: "$1.4M+", time: "~4 Mins", active: "1,240 Deals" },
    accent: "#3b82f6",
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.2)",
    hoverBorder: "rgba(59,130,246,0.45)",
    hoverGlow: "0 0 40px rgba(59,130,246,0.18)",
  },
  {
    title: "Crypto Trades",
    tag: "DECENTRALIZED ASSETS",
    icon: Coins,
    items: ["OTC Token Agreements", "Rare NFTs & Digital Art", "Cross-Chain Asset Swaps", "Custom ERC-20 Escrow Vaults"],
    metrics: { pool: "$8.9M+", time: "<1 Min", active: "4,820 Deals" },
    accent: CYAN,
    bg: "rgba(0,240,255,0.05)",
    border: "rgba(0,240,255,0.18)",
    hoverBorder: "rgba(0,240,255,0.45)",
    hoverGlow: "0 0 40px rgba(0,240,255,0.12)",
  },
  {
    title: "Freelance Work",
    tag: "CONTRACTS & MILESTONES",
    icon: Briefcase,
    items: ["Software & App Development", "UI/UX & Branding Assets", "Copywriting & Marketing", "Consulting & Agreements"],
    metrics: { pool: "$3.1M+", time: "Custom", active: "910 Deals" },
    accent: "#6366f1",
    bg: "rgba(99,102,241,0.06)",
    border: "rgba(99,102,241,0.2)",
    hoverBorder: "rgba(99,102,241,0.45)",
    hoverGlow: "0 0 40px rgba(99,102,241,0.18)",
  },
  {
    title: "Digital Products",
    tag: "IP & DOMAIN PORTABILITY",
    icon: Globe,
    items: ["Premium Web Domains", "SaaS Licensing Codes", "Social Handles & Usernames", "Proprietary Source Code"],
    metrics: { pool: "$5.6M+", time: "~15 Mins", active: "2,350 Deals" },
    accent: "#a855f7",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.2)",
    hoverBorder: "rgba(168,85,247,0.45)",
    hoverGlow: "0 0 40px rgba(168,85,247,0.18)",
  },
];

export default function Categories() {
  return (
    <section
      id="categories"
      style={{
        padding: "100px 24px",
        background: "rgba(3,4,8,0.6)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 450, height: 450,
        background: `radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, width: 400, height: 400,
        background: `radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "flex-end", gap: 24,
          paddingBottom: 36, borderBottom: "1px solid rgba(255,255,255,0.05)",
          marginBottom: 56,
        }}>
          <div>
            <div style={{
              display: "inline-flex", padding: "5px 14px", borderRadius: 999,
              border: `1px solid rgba(59,130,246,0.25)`, background: "rgba(59,130,246,0.07)",
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 10,
              color: CYAN, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 16,
            }}>
              Supported Sectors
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900,
              lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff",
            }}>
              Endless Transaction<br />
              <span style={{
                background: "linear-gradient(135deg, #3b82f6, #00f0ff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Versatility.
              </span>
            </h2>
          </div>
          <p style={{
            fontSize: "0.9rem", color: "rgba(255,255,255,0.45)",
            maxWidth: 380, lineHeight: 1.7,
          }}>
            Whether swapping rare digital armor, milestone contracts, or domain portfolios — escrowz.lol delivers customized multi-signature lockboxes for complete escrow precision.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: 24,
        }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ borderColor: cat.hoverBorder, boxShadow: cat.hoverGlow, y: -4 }}
                className="glass"
                style={{
                  borderRadius: 20, padding: "28px 30px",
                  border: `1px solid ${cat.border}`,
                  cursor: "default", position: "relative", overflow: "hidden",
                  transition: "all 0.4s ease",
                }}
              >
                {/* Subtle bg gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(135deg, ${cat.bg} 0%, transparent 60%)`,
                  borderRadius: 20, pointerEvents: "none",
                }} />

                {/* Top row */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  marginBottom: 20, position: "relative",
                }}>
                  <div>
                    <span style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 9, color: cat.accent, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.12em",
                      display: "block", marginBottom: 6,
                    }}>
                      // {cat.tag}
                    </span>
                    <h3 style={{
                      fontSize: "1.45rem", fontWeight: 900, color: "#fff",
                      letterSpacing: "-0.01em",
                    }}>
                      {cat.title}
                    </h3>
                  </div>
                  <div style={{
                    width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                    background: `${cat.bg}`,
                    border: `1px solid ${cat.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={20} color={cat.accent} />
                  </div>
                </div>

                {/* Items */}
                <p style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 9, color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12,
                }}>Supported Agreements</p>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28,
                }}>
                  {cat.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <CheckCircle2 size={13} color={`${CYAN}99`} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics footer */}
                <div style={{
                  paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10,
                }}>
                  {[
                    { label: "Volume", value: cat.metrics.pool, color: "#fff" },
                    { label: "Speed", value: cat.metrics.time, color: CYAN },
                    { label: "Active", value: cat.metrics.active, color: "#fff" },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{
                      background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 10, padding: "10px 8px", textAlign: "center",
                    }}>
                      <p style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 4,
                      }}>{label}</p>
                      <p style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 12, color, fontWeight: 700,
                      }}>{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
