"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

export default function SignInPage() {
  // Same fix as signup — don't gate on isLoaded, use signIn directly.
  const { signIn, setActive } = useSignIn() as any;

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  function clerkError(err: any): string {
    return (
      err?.errors?.[0]?.longMessage ||
      err?.errors?.[0]?.message     ||
      err?.message                  ||
      "Something went wrong — please try again."
    );
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const em = email.trim();
    if (!em)       return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");

    if (!signIn) {
      return setError("Auth is still starting up. Wait 1 second and try again.");
    }

    setLoading(true);
    try {
      const res = await signIn.create({ identifier: em, password });
      if (res.error) {
        setError(res.error.longMessage || res.error.message || "Sign in failed.");
        setLoading(false);
        return;
      }

      if (signIn.status === "complete") {
        const res2 = await signIn.finalize();
        if (res2.error) {
          setError(res2.error.longMessage || res2.error.message || "Failed to finalize session.");
          setLoading(false);
          return;
        }
        window.location.href = "/dashboard";
      } else {
        setError("Sign in incomplete — status: " + signIn.status);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during sign-in.");
      setLoading(false);
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px 12px 42px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12, color: "#fff", fontSize: 14, outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 11, color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.05em", textTransform: "uppercase",
  };

  return (
    <div style={{
      background: "#030408", minHeight: "100vh", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", position: "relative", overflow: "hidden",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>
      <div className="cyber-grid" style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }} />

      <motion.div
        animate={{ x: [0, 45, -25, 0], y: [0, -35, 35, 0], scale: [1, 1.06, 0.94, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-10%", left: "-10%", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none" }}
      />
      <motion.div
        animate={{ x: [0, -35, 45, 0], y: [0, 35, -25, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "-10%", right: "-10%", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none" }}
      />

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 10 }}>
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          color: "rgba(255,255,255,0.45)", textDecoration: "none",
          fontSize: 13, fontFamily: "var(--font-geist-mono), monospace",
          marginBottom: 28, transition: "color 0.2s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
        >
          <ArrowLeft size={16} /> Return to Home
        </a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{ borderRadius: 24, padding: "40px 32px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}>

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px", boxShadow: "0 0 20px rgba(59,130,246,0.2)",
            }}>
              <Shield size={22} color={BLUE} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Sign In</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {error && (
              <div style={{
                padding: "12px 14px", background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12,
                color: "#f87171", fontSize: 13, textAlign: "center",
              }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>Email</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <Mail size={16} />
                </span>
                <input type="email" autoComplete="email" placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  style={fieldStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = "rgba(59,130,246,0.02)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <Lock size={16} />
                </span>
                <input type={showPw ? "text" : "password"} autoComplete="current-password" placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  style={fieldStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.background = "rgba(0,240,255,0.02)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                />
                <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)} style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.35)", padding: 0, display: "flex", alignItems: "center",
                }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "14px", borderRadius: 12,
              background: `linear-gradient(135deg, ${BLUE}, ${BLUE}dd)`,
              color: "#fff", border: "none", fontWeight: 700, fontSize: 13,
              cursor: loading ? "wait" : "pointer",
              fontFamily: "var(--font-geist-mono), monospace",
              textTransform: "uppercase", letterSpacing: "0.1em",
              marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 20px rgba(59,130,246,0.35)`,
              transition: "transform 0.15s", opacity: loading ? 0.82 : 1,
            }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {loading ? (
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Signing In
                  <span style={{ display: "inline-flex", gap: 3, marginLeft: 8 }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} style={{
                        width: 4, height: 4, borderRadius: "50%", background: "#fff",
                        animation: "pulseDot 0.9s ease-in-out infinite alternate",
                        animationDelay: `${i * 0.18}s`,
                      }} />
                    ))}
                  </span>
                </span>
              ) : "Sign In"}
            </button>

            <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              Don&apos;t have an account?{" "}
              <a href="/signup" style={{ color: CYAN, textDecoration: "none", fontWeight: 600 }}>Create one</a>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%   { opacity: 0.25; transform: scale(0.85); }
          100% { opacity: 1;    transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
