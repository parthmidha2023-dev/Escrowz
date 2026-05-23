"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ArrowRight, CheckCircle, Lock } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

/* ── Crypto deals ── */
const deals = [
  {
    symbol: "BTC", name: "Bitcoin", amount: "0.142", usd: "$8,940",
    network: "Bitcoin Network Escrow", color: "#F7931A", bg: "rgba(247,147,26,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#F7931A"/>
        <path d="M22.2 14.2c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6-.9-.2.7-2.7-1.7-.4-.7 2.7-2.2-.5-.3 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-2 7.9c-.1.2-.3.5-.8.4l-1.2-.3-.8 1.9 2.2.5-.7 2.7 1.7.4.7-2.7.9.2-.7 2.7 1.7.4.7-2.7c2.9.5 5.1.3 6-2.3.7-2.1-.04-3.3-1.6-4.1 1.1-.25 1.9-1 2.1-2.5zm-3.8 5.3c-.5 2.1-3.9 1-5 .7l.9-3.6c1.1.3 4.6.8 4.1 2.9zm.5-5.4c-.4 1.9-3.2.9-4.1.7l.8-3.3c.9.2 3.8.6 3.3 2.6z" fill="white"/>
      </svg>
    ),
  },
  {
    symbol: "ETH", name: "Ethereum", amount: "2.85", usd: "$6,412",
    network: "ERC-20 Escrow", color: "#627EEA", bg: "rgba(98,126,234,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#627EEA"/>
        <path d="M16 5L9 16.5l7 4 7-4L16 5z" fill="white" opacity="0.9"/>
        <path d="M9 18l7 4 7-4-7 9-7-9z" fill="white" opacity="0.7"/>
      </svg>
    ),
  },
  {
    symbol: "BNB", name: "BNB Chain", amount: "3.39", usd: "$2,210",
    network: "BEP20 Escrow", color: "#F3BA2F", bg: "rgba(243,186,47,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
        <path d="M12.1 13.9l3.9-3.9 3.9 3.9 2.3-2.3L16 8 9.8 11.6l2.3 2.3zm-4.1 2.1l2.3-2.3 2.3 2.3-2.3 2.3-2.3-2.3zm4.1 2.1l3.9 3.9 3.9-3.9 2.3 2.3L16 24l-6.2-3.6 2.3-2.3zm9.7-2.1L24 13.7l2.3 2.3L24 18.4l-2.2-2.3z" fill="white"/>
        <rect x="13.7" y="13.7" width="4.6" height="4.6" transform="rotate(45 16 16)" fill="white"/>
      </svg>
    ),
  },
  {
    symbol: "SOL", name: "Solana", amount: "48.50", usd: "$4,120",
    network: "Solana Network Escrow", color: "#9945FF", bg: "rgba(153,69,255,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#9945FF"/>
        <path d="M10 20.5h13.5l-2.5 2.5H7.5L10 20.5z" fill="white"/>
        <path d="M10 14h13.5l-2.5 2.5H7.5L10 14z" fill="#14F195"/>
        <path d="M23.5 7.5H10 L7.5 10h13.5l2.5-2.5z" fill="white" opacity="0.8"/>
      </svg>
    ),
  },
  {
    symbol: "USDC", name: "USD Coin", amount: "3,500", usd: "$3,500",
    network: "ERC-20 Escrow", color: "#2775CA", bg: "rgba(39,117,202,0.15)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#2775CA"/>
        <text x="16" y="21" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">$</text>
      </svg>
    ),
  },
];

const STAGES    = ["DEPOSIT", "SECURE", "RELEASE"];
const STAGE_MS  = [2200, 2200, 2200, 1800];
const PROGRESS  = [8, 50, 85, 100];

/* ── Animated Deal Card ── */
function DealCard({ tiltX, tiltY }: { tiltX: number; tiltY: number }) {
  const [dealIdx, setDealIdx] = useState(0);
  const [stage,   setStage]   = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      if (stage < 3) {
        setStage((s) => s + 1);
      } else {
        setDealIdx((d) => (d + 1) % deals.length);
        setStage(0);
      }
    }, STAGE_MS[stage]);
    return () => clearTimeout(t);
  }, [stage, dealIdx]);

  const deal     = deals[dealIdx];
  const released = stage === 3;
  const progress = PROGRESS[stage];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 340,
        transform: `perspective(900px) rotateY(${tiltX * 10}deg) rotateX(${tiltY * -10}deg)`,
        transition: "transform 0.18s ease-out",
        willChange: "transform",
      }}
    >
      <div style={{
        borderRadius: 22,
        background: "linear-gradient(145deg, #0d1117 0%, #060810 100%)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: `0 28px 70px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 40px ${deal.color}15`,
        overflow: "hidden",
        transition: "box-shadow 0.5s ease",
      }}>
        {/* Color accent line at top */}
        <div style={{
          height: 2,
          background: `linear-gradient(to right, transparent, ${deal.color}, transparent)`,
          transition: "background 0.6s ease",
        }} />

        <div style={{ padding: "22px 22px 20px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={dealIdx}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.32 }}
                style={{ display: "flex", alignItems: "center", gap: 11 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: deal.bg, border: `1px solid ${deal.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 20px ${deal.color}25`,
                }}>
                  {deal.icon}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{deal.name}</p>
                  <p style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2,
                  }}>vpwb...o9k7</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Live indicator */}
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: released ? "#22c55e" : deal.color,
              display: "inline-block",
              boxShadow: `0 0 10px ${released ? "#22c55e" : deal.color}`,
              animation: released ? "none" : "livePulse 1.4s ease-in-out infinite",
            }} />
          </div>

          {/* Amount */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`amt-${dealIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{ textAlign: "center", marginBottom: 18 }}
            >
              <p style={{
                fontSize: "clamp(2rem, 5vw, 2.5rem)", fontWeight: 900,
                color: "#fff", letterSpacing: "-0.03em", lineHeight: 1,
              }}>
                {deal.amount}{" "}
                <span style={{ color: deal.color, fontSize: "0.62em", fontWeight: 700 }}>{deal.symbol}</span>
              </p>
              <p style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12, color: "rgba(255,255,255,0.38)", marginTop: 6,
              }}>{deal.usd} USD</p>
            </motion.div>
          </AnimatePresence>

          {/* Network pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`net-${dealIdx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 14px", borderRadius: 999,
                background: `${deal.color}12`, border: `1px solid ${deal.color}35`,
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
                ? "linear-gradient(135deg, rgba(20,83,45,0.8), rgba(22,101,52,0.8))"
                : `linear-gradient(135deg, ${deal.color}20, ${deal.color}10)`,
            }}
            transition={{ duration: 0.5 }}
            style={{
              borderRadius: 12,
              border: `1px solid ${released ? "rgba(34,197,94,0.5)" : `${deal.color}45`}`,
              padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 20, cursor: "default",
            }}
          >
            {released ? (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280 }}
                style={{ display: "flex", alignItems: "center", gap: 7 }}
              >
                <CheckCircle size={16} color="#22c55e" />
                <span style={{ fontSize: 14, fontWeight: 800, color: "#22c55e" }}>Released</span>
              </motion.div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Lock size={13} color={deal.color} />
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11, fontWeight: 700, color: deal.color, letterSpacing: "0.05em",
                }}>
                  {STAGES[Math.min(stage, 2)]} IN PROGRESS
                </span>
                {/* Breathing dots */}
                <span style={{ display: "inline-flex", gap: 3, marginLeft: 2 }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22 }}
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
              height: 5, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden",
            }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                  height: "100%", borderRadius: 99,
                  background: released
                    ? "linear-gradient(to right, #22c55e, #4ade80)"
                    : `linear-gradient(to right, ${deal.color}bb, ${deal.color})`,
                  boxShadow: released ? "0 0 12px rgba(34,197,94,0.5)" : `0 0 12px ${deal.color}66`,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              {STAGES.map((s, i) => (
                <span key={s} style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: released ? "#22c55e" : stage >= i ? deal.color : "rgba(255,255,255,0.2)",
                  transition: "color 0.4s",
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 4,
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
                fontFamily: "var(--font-geist-mono), monospace", fontSize: 9,
                color: released ? "#22c55e" : "rgba(255,255,255,0.3)", fontWeight: 600,
              }}>
                {released ? `${deal.symbol} Secured` : "Escrowz Vault Active"}
              </span>
            </div>
            <Lock size={12} color={released ? "#22c55e" : "rgba(255,255,255,0.18)"} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.5); }
        }
      `}</style>
    </div>
  );
}

/* ── Hero ── */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left)  / rect.width  - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top)   / rect.height - 0.5;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="cyber-grid"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
      {/* Ambient orbs — shift subtly with cursor */}
      <div style={{
        position: "absolute", top: "18%", left: "8%",
        width: 520, height: 520, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)`,
        filter: "blur(70px)", pointerEvents: "none",
        transform: `translate(${tilt.x * 30}px, ${tilt.y * 20}px)`,
        transition: "transform 0.4s ease-out",
      }} />
      <div style={{
        position: "absolute", bottom: "12%", right: "6%",
        width: 420, height: 420, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)`,
        filter: "blur(70px)", pointerEvents: "none",
        transform: `translate(${tilt.x * -20}px, ${tilt.y * -15}px)`,
        transition: "transform 0.4s ease-out",
      }} />

      <div
        className="hero-grid"
        style={{
          maxWidth: 1100, width: "100%", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center",
          position: "relative", zIndex: 10,
        }}
      >
        {/* ── Left column — subtle parallax counter-shift ── */}
        <div
          style={{
            display: "flex", flexDirection: "column", gap: 28,
            transform: `translateX(${tilt.x * -12}px) translateY(${tilt.y * -8}px)`,
            transition: "transform 0.25s ease-out",
            willChange: "transform",
          }}
        >
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
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 480,
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
                background: BLUE, color: "#fff", border: "none", cursor: "pointer",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
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
                background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.12)",
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
              { dot: BLUE,      label: "Multi-Sig Vault"     },
              { dot: CYAN,      label: "Arbitration Enabled" },
            ].map(({ dot, label }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, display: "inline-block" }} />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: 3D-tilting deal card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex", justifyContent: "center",
            /* Slight counter-motion for depth */
            transform: `translateX(${tilt.x * 10}px) translateY(${tilt.y * 8}px)`,
            transition: "transform 0.25s ease-out",
            willChange: "transform",
          }}
        >
          <DealCard tiltX={tilt.x} tiltY={tilt.y} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
