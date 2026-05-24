"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";
const PINK = "#ec4899";

const SOCIAL_LINKS = [
  {
    name: "Telegram",
    subtitle: "Secure channels for announcements & protocol updates.",
    tagline: "COMMUNICATION // SECURE",
    color: "#0088cc",
    href: "https://t.me/escrowz_lol",
    glow: "0 0 35px rgba(0, 136, 204, 0.22)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    )
  },
  {
    name: "Discord",
    subtitle: "Connect with developers, partners & elite traders in real-time.",
    tagline: "COMMUNITY // DISCORD_NODE",
    color: "#5865F2",
    href: "https://discord.gg/escrowz",
    glow: "0 0 35px rgba(88, 101, 242, 0.22)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    )
  },
  {
    name: "Twitter (X)",
    subtitle: "Get instant threat feeds, market metrics & active lockbox logs.",
    tagline: "INTEL_FEED // BROADCAST",
    color: "#ffffff",
    href: "https://x.com/escrowz_lol",
    glow: "0 0 35px rgba(255, 255, 255, 0.12)",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    )
  }
];

export default function SocialsPage() {
  return (
    <div style={{
      background: "#030408",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 24px 80px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>
      <Navbar />

      {/* Background patterns */}
      <div className="cyber-grid" style={{
        position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none"
      }} />

      <motion.div
        animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-10%", right: "-10%", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)`,
          filter: "blur(80px)", pointerEvents: "none"
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 30, 0], y: [0, 30, -30, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", bottom: "-10%", left: "-10%", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)`,
          filter: "blur(80px)", pointerEvents: "none"
        }}
      />

      {/* Card Wrapper */}
      <div style={{ width: "100%", maxWidth: 580, position: "relative", zIndex: 10 }}>
        
        {/* Back Link */}
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          color: "rgba(255,255,255,0.45)", textDecoration: "none",
          fontSize: 13, fontFamily: "var(--font-geist-mono), monospace",
          marginBottom: 28, transition: "color 0.2s"
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
        >
          <ArrowLeft size={16} /> Return to Home
        </a>

        {/* Outer card box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{
            borderRadius: 24,
            padding: "40px 32px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "rgba(0,240,255,0.06)", border: `1px solid rgba(0,240,255,0.25)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px", boxShadow: "0 0 20px rgba(0,240,255,0.12)"
            }}>
              <Shield size={22} color={CYAN} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
              Connect with Escrowz
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
              Join our active community nodes and intelligence feeds.
            </p>
          </div>

          {/* Social Links List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SOCIAL_LINKS.map((s, idx) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: 16,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}40`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.boxShadow = s.glow;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Left info container */}
                <div style={{ display: "flex", alignItems: "center", gap: 18, overflow: "hidden" }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: `${s.color}10`, border: `1.5px solid ${s.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.color, flexShrink: 0
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
                    <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", color: s.color, fontWeight: 700, letterSpacing: "0.08em" }}>
                      {s.tagline}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right chevron/link icon */}
                <div style={{ color: "rgba(255,255,255,0.25)", paddingLeft: 12, flexShrink: 0 }}>
                  <ExternalLink size={16} />
                </div>
              </motion.a>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}
