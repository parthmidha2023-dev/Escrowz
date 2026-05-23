"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Mail, Lock, CheckCircle, HelpCircle } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

export default function SignInPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div style={{
      background: "#030408",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>
      {/* Background grids and glowing orbs */}
      <div className="cyber-grid" style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, pointerEvents: "none"
      }} />
      
      <div style={{
        position: "absolute", top: "-10%", left: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      
      <div style={{
        position: "absolute", bottom: "-10%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* Main container */}
      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 10 }}>
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
            background: `linear-gradient(to right, ${BLUE}, ${CYAN})`
          }} />

          {/* Logo & Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "rgba(59,130,246,0.12)",
              border: `1px solid rgba(59,130,246,0.3)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: `0 0 20px rgba(59,130,246,0.2)`
            }}>
              <Shield size={22} color={BLUE} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              Access Escrowz Vault
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
              Enter your secure keys to access multi-signature active deals.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: "center", padding: "20px 0" }}
            >
              <div style={{
                width: 54, height: 54, borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
              }}>
                <CheckCircle size={26} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Secure Connection Active</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8, lineHeight: 1.6 }}>
                Vault authorization succeeded. Redirecting to your active multi-signature terminal...
              </p>
              
              <div style={{
                marginTop: 24,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                color: CYAN,
                padding: "8px 12px",
                background: "rgba(0,240,255,0.06)",
                border: `1px solid rgba(0,240,255,0.2)`,
                borderRadius: 8,
                display: "inline-block"
              }}>
                STATUS: ENCRYPTED_TUNNEL_ESTABLISHED
              </div>

              <div style={{ marginTop: 24 }}>
                <a
                  href="/"
                  style={{
                    display: "inline-block",
                    padding: "12px 24px",
                    borderRadius: 12,
                    background: BLUE,
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  Go to Live Dashboard
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11, color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.05em", textTransform: "uppercase"
                }}>
                  Security Email ID
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.05em", textTransform: "uppercase"
                  }}>
                    Hardware Passkey / Password
                  </label>
                  <a href="#" style={{ fontSize: 11, color: BLUE, textDecoration: "none" }}>Forgot?</a>
                </div>
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
                  background: `linear-gradient(135deg, ${BLUE}, ${BLUE}dd)`,
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono), monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 20px rgba(59,130,246,0.35)`,
                  transition: "transform 0.15s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.boxShadow = `0 4px 30px rgba(59,130,246,0.55)`;
                    e.currentTarget.style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(59,130,246,0.35)`;
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                {isLoading ? (
                  <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                    Decrypting Vault keys
                    <span style={{ display: "inline-flex", gap: 3 }}>
                      {[0, 1, 2].map((i) => (
                        <span key={i} style={{
                          width: 4, height: 4, borderRadius: "50%", background: "#fff",
                          animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                        }} />
                      ))}
                    </span>
                  </span>
                ) : "Authorize Secure Access"}
              </button>

              <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                First time onboarding?{" "}
                <a href="/signup" style={{ color: CYAN, textDecoration: "none", fontWeight: 600 }}>Create an account</a>
              </div>
            </form>
          )}
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
