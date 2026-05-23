"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Mail, Lock, User, CheckCircle, ShieldCheck } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

export default function SignUpPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [sector, setSector]     = useState("gaming");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1600);
  };

  return (
    <div style={{
      background: "#030408",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>
      {/* Background grids and glowing orbs */}
      <div className="cyber-grid" style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, pointerEvents: "none"
      }} />
      
      <div style={{
        position: "absolute", top: "-10%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      
      <div style={{
        position: "absolute", bottom: "-10%", left: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* Main container */}
      <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 10 }}>
        {/* Back button */}
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.45)",
            textDecoration: "none",
            fontSize: 13,
            fontFamily: "var(--font-geist-mono), monospace",
            marginBottom: 28,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
        >
          <ArrowLeft size={16} /> Return to Home
        </a>

        {/* Card wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{
            borderRadius: 24,
            padding: "40px 32px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle colored accent line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(to right, ${CYAN}, ${BLUE})`
          }} />

          {/* Logo & Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "rgba(0,240,255,0.08)",
              border: `1px solid rgba(0,240,255,0.35)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: `0 0 20px rgba(0,240,255,0.18)`
            }}>
              <ShieldCheck size={22} color={CYAN} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              Initialize Secure Identity
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
              Onboard inside our decentralized v4.1 zero-trust escrow network.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Username */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em", textTransform: "uppercase"
              }}>
                Username
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="agent_escrowz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = BLUE;
                    e.currentTarget.style.background = "rgba(59,130,246,0.02)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em", textTransform: "uppercase"
              }}>
                Email
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="agent@escrowz.lol"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = BLUE;
                    e.currentTarget.style.background = "rgba(59,130,246,0.02)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em", textTransform: "uppercase"
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = CYAN;
                    e.currentTarget.style.background = "rgba(0,240,255,0.02)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`,
                color: "#030408",
                border: "none",
                fontWeight: 900,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "var(--font-geist-mono), monospace",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 20px rgba(0,240,255,0.25)`,
                transition: "transform 0.15s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.boxShadow = `0 4px 30px rgba(0,240,255,0.45)`;
                  e.currentTarget.style.transform = "scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,240,255,0.25)`;
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {isLoading ? (
                <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  Generating Wallet Address
                  <span style={{ display: "inline-flex", gap: 3 }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} style={{
                        width: 4, height: 4, borderRadius: "50%", background: "#030408",
                        animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                      }} />
                    ))}
                  </span>
                </span>
              ) : "Create Secure Account"}
            </button>

            <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              Already onboarding?{" "}
              <a href="/signin" style={{ color: BLUE, textDecoration: "none", fontWeight: 600 }}>Authorize access</a>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
