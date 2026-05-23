"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Lock } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

/* ── Crypto deal definitions ── */
const deals = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: "0.142",
    usd: "$8,940",
    network: "Bitcoin Network Escrow",
    color: "#F7931A",
    bg: "rgba(247,147,26,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F7931A">
        <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z"/>
        <path d="M17.23 10.267c.238-1.587-.972-2.44-2.627-3.01l.537-2.15-1.31-.327-.523 2.096c-.345-.086-.699-.167-1.052-.247l.527-2.11-1.31-.327-.537 2.15c-.285-.065-.566-.129-.838-.197l.002-.007-1.808-.451-.348 1.398s.972.223.951.236c.53.133.626.484.61.763l-.612 2.453c.037.009.084.023.136.044l-.138-.034-.857 3.438c-.065.161-.23.402-.598.31.013.02-.953-.238-.953-.238l-.651 1.498 1.706.425c.317.08.629.163.936.241l-.542 2.176 1.309.327.537-2.153c.358.097.706.187 1.046.271l-.535 2.143 1.31.327.542-2.172c2.234.423 3.915.252 4.623-1.769.57-1.629-.028-2.569-1.205-3.181.857-.198 1.503-.762 1.675-1.929zm-2.996 4.202c-.405 1.629-3.148.748-4.037.527l.72-2.887c.89.222 3.743.663 3.317 2.36zm.406-4.223c-.37 1.483-2.65.729-3.39.545l.652-2.616c.74.184 3.123.528 2.738 2.071z" fill="#fff"/>
      </svg>
    ),
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: "2.85",
    usd: "$6,412",
    network: "ERC-20 Escrow",
    color: "#627EEA",
    bg: "rgba(98,126,234,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M11.998 2L12.066 2.228V15.929L11.998 15.997L5.998 12.375L11.998 2Z" fill="#627EEA"/>
        <path d="M11.998 2L18 12.375L11.998 15.997V2Z" fill="#8EA8F8"/>
        <path d="M11.998 17.115L11.921 17.209V21.98L11.998 22.2L18.004 13.496L11.998 17.115Z" fill="#627EEA"/>
        <path d="M11.998 22.2V17.115L5.994 13.496L11.998 22.2Z" fill="#8EA8F8"/>
        <path d="M11.998 15.997L18 12.375L11.998 9.664V15.997Z" fill="#3E5DC4"/>
        <path d="M5.998 12.375L11.998 15.997V9.664L5.998 12.375Z" fill="#627EEA"/>
      </svg>
    ),
  },
  {
    symbol: "BNB",
    name: "BNB Chain",
    amount: "3.39",
    usd: "$2,210",
    network: "BEP20 Escrow",
    color: "#F3BA2F",
    bg: "rgba(243,186,47,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F3BA2F">
        <path d="M16.624 13.921l2.716 2.716-7.353 7.353-7.353-7.352 2.716-2.716 4.637 4.636 4.637-4.637zM4.634 12L1.918 9.284l2.716-2.716 2.716 2.716L4.634 12zm14.732 0l-2.716-2.716 2.716-2.716L22.082 9.284 19.366 12zM12 4.637l4.637 4.636 2.716-2.716L12-.001 4.647 6.557l2.716 2.716L12 4.637z"/>
      </svg>
    ),
  },
  {
    symbol: "SOL",
    name: "Solana",
    amount: "48.50",
    usd: "$4,120",
    network: "Solana Network Escrow",
    color: "#9945FF",
    bg: "rgba(153,69,255,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 17.5h12.5l3.5-1.75H7.5L4 17.5z" fill="#9945FF"/>
        <path d="M4 6.5h12.5L20 8.25H7.5L4 6.5z" fill="#14F195"/>
        <path d="M20 12H7.5L4 13.75h12.5L20 12z" fill="#9945FF" opacity="0.7"/>
      </svg>
    ),
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    amount: "3,500",
    usd: "$3,500",
    network: "ERC-20 Escrow",
    color: "#2775CA",
    bg: "rgba(39,117,202,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#2775CA">
        <circle cx="12" cy="12" r="11" fill="#2775CA"/>
        <path d="M12.55 17.35v1.07c1.8-.23 3.35-1.1 4.43-2.38l-.86-.86c-.87 1.02-2.12 1.72-3.57 1.97zM6.97 9.85c0-2.18 1.52-4 3.57-4.5V4.28C7.9 4.8 5.97 7.1 5.97 9.85c0 2.75 1.93 5.05 4.57 5.57v-1.07c-2.05-.5-3.57-2.32-3.57-4.5zM12 6.25c2.05.5 3.57 2.32 3.57 4.5 0 2.18-1.52 4-3.57 4.5v1.07c2.64-.52 4.57-2.82 4.57-5.57 0-2.75-1.93-5.05-4.57-5.57V6.25z" fill="#fff"/>
        <text x="12" y="14" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">$</text>
      </svg>
    ),
  },
];

const STAGES = ["DEPOSIT", "SECURE", "RELEASE"];
const STAGE_MS = [2200, 2200, 2200, 1800]; // ms per stage (0,1,2,3=released)

function progressForStage(stage: number) {
  return [8, 50, 85, 100][stage] ?? 100;
}

/* ── Animated Deal Card ── */
function DealCard() {
  const [dealIdx, setDealIdx] = useState(0);
  const [stage,   setStage]   = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (stage < 3) {
        setStage((s) => s + 1);
      } else {
        setPrevIdx(dealIdx);
        setDealIdx((d) => (d + 1) % deals.length);
        setStage(0);
      }
    }, STAGE_MS[stage]);
    return () => clearTimeout(t);
  }, [stage, dealIdx]);

  const deal     = deals[dealIdx];
  const released = stage === 3;
  const progress = progressForStage(stage);

  return (
    <div style={{
      width: "100%", maxWidth: 340,
      borderRadius: 22,
      background: "linear-gradient(145deg, #0e1118 0%, #080b10 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 28px 70px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04) inset",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top accent line */}
      <div style={{
        height: 2,
        background: `linear-gradient(to right, transparent, ${deal.color}, transparent)`,
        transition: "background 0.6s ease",
      }} />

      <div style={{ padding: "22px 22px 20px" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={dealIdx}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.35 }}
              style={{ display: "flex", alignItems: "center", gap: 11 }}
            >
              {/* Crypto icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: deal.bg,
                border: `1px solid ${deal.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 16px ${deal.color}30`,
              }}>
                {deal.icon}
              </div>
              <div>
                <p style={{
                  fontSize: 15, fontWeight: 800, color: "#fff",
                  lineHeight: 1.2, letterSpacing: "-0.01em",
                }}>{deal.name}</p>
                <p style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10, color: "rgba(255,255,255,0.35)",
                  marginTop: 2,
                }}>
                  vpwb...o9k7
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Live dot */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: released ? "#22c55e" : deal.color,
              display: "inline-block",
              boxShadow: `0 0 8px ${released ? "#22c55e" : deal.color}`,
              animation: released ? "none" : "livePulse 1.4s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Amount */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`amt-${dealIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center", marginBottom: 18 }}
          >
            <p style={{
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 900,
              color: "#fff", letterSpacing: "-0.03em", lineHeight: 1,
            }}>
              {deal.amount}{" "}
              <span style={{ color: deal.color, fontSize: "0.65em" }}>{deal.symbol}</span>
            </p>
            <p style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 5,
            }}>{deal.usd} USD</p>
          </motion.div>
        </AnimatePresence>

        {/* Network tag */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`net-${dealIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 6, marginBottom: 18,
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 14px", borderRadius: 999,
              background: `${deal.color}12`,
              border: `1px solid ${deal.color}35`,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: deal.color, display: "inline-block" }} />
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 10, color: deal.color, fontWeight: 600, letterSpacing: "0.04em",
              }}>{deal.network}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Status button */}
        <motion.div
          animate={{
            background: released
              ? "linear-gradient(135deg, #14532d, #166534)"
              : `linear-gradient(135deg, ${deal.color}22, ${deal.color}11)`,
            borderColor: released ? "rgba(34,197,94,0.5)" : `${deal.color}50`,
          }}
          transition={{ duration: 0.5 }}
          style={{
            borderRadius: 12, border: "1px solid",
            padding: "12px 16px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            marginBottom: 20, cursor: "default",
          }}
        >
          {released ? (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ display: "flex", alignItems: "center", gap: 7 }}
            >
              <CheckCircle size={16} color="#22c55e" />
              <span style={{ fontSize: 14, fontWeight: 800, color: "#22c55e", letterSpacing: "0.02em" }}>
                Released
              </span>
            </motion.div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Lock size={13} color={deal.color} />
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12, fontWeight: 700, color: deal.color, letterSpacing: "0.05em",
              }}>
                {STAGES[Math.min(stage, 2)]} IN PROGRESS
              </span>
              <span style={{
                display: "inline-flex", gap: 3, marginLeft: 4,
              }}>
                {[0,1,2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: deal.color, display: "inline-block",
                    }}
                  />
                ))}
              </span>
            </div>
          )}
        </motion.div>

        {/* Progress bar */}
        <div style={{ marginBottom: 10 }}>
          <div style={{
            height: 5, borderRadius: 99,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                height: "100%", borderRadius: 99,
                background: released
                  ? "linear-gradient(to right, #22c55e, #4ade80)"
                  : `linear-gradient(to right, ${deal.color}bb, ${deal.color})`,
                boxShadow: released ? "0 0 10px rgba(34,197,94,0.5)" : `0 0 10px ${deal.color}66`,
              }}
            />
          </div>

          {/* Stage labels */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: 8, paddingBottom: 2,
          }}>
            {STAGES.map((s, i) => (
              <span
                key={s}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: released
                    ? "#22c55e"
                    : stage >= i
                    ? deal.color
                    : "rgba(255,255,255,0.2)",
                  transition: "color 0.4s",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: 4,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 18, height: 18, borderRadius: 6,
              background: released ? "rgba(34,197,94,0.1)" : `${deal.color}18`,
              border: `1px solid ${released ? "rgba(34,197,94,0.3)" : `${deal.color}30`}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Lock size={9} color={released ? "#22c55e" : deal.color} />
            </div>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 9, color: released ? "#22c55e" : "rgba(255,255,255,0.35)",
              fontWeight: 600,
            }}>
              {released ? `${deal.symbol} Secured` : "Escrowz Vault Active"}
            </span>
          </div>
          <Lock size={12} color={released ? "#22c55e" : "rgba(255,255,255,0.2)"} />
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.4); }
        }
      `}</style>
    </div>
  );
}

/* ── Hero section ── */
export default function Hero() {
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
        position: "absolute", top: "18%", left: "8%",
        width: 520, height: 520, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)`,
        filter: "blur(70px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "12%", right: "6%",
        width: 420, height: 420, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)`,
        filter: "blur(70px)", pointerEvents: "none",
      }} />

      <div
        style={{
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
              display: "inline-block",
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
              letterSpacing: "-0.02em", color: "#fff", marginBottom: 18,
            }}>
              Zero-Trust Escrow.<br />
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Absolute Protection.</span>
            </h1>
            <p style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 480,
            }}>
              Secure gaming accounts, high-value crypto swaps, freelance work, and premium digital products inside our multi-signature vault.{" "}
              <span style={{ color: "rgba(255,255,255,0.8)" }}>Safe. E2E Encrypted. Unstoppable.</span>
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

        {/* ── Right column: Animated deal card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <DealCard />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
