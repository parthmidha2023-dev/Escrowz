"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Mail, Lock, User, CheckCircle2,
  ShieldCheck, RefreshCw, Eye, EyeOff, Camera
} from "lucide-react";
import { useSignUp, useUser } from "@clerk/nextjs";

const CYAN    = "#00f0ff";
const BLUE    = "#3b82f6";
const PINK    = "#ec4899";
const EMERALD = "#10b981";

const DEFAULT_PFP = (size = 46) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 6L54 14V30C54 44.4 44.6 54.8 32 58C19.4 54.8 10 44.4 10 30V14L32 6Z"
      stroke={CYAN} strokeWidth="2.5" fill="rgba(0,240,255,0.06)" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="28" r="4" stroke={CYAN} strokeWidth="2.5" fill="#030408"/>
    <path d="M22 28H42" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AVATAR_PLACEHOLDER = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function Dots({ dark = false }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginLeft: 8 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4, borderRadius: "50%",
          background: dark ? "#030408" : "#fff",
          animation: "pd 0.9s ease-in-out infinite alternate",
          animationDelay: `${i * 0.18}s`,
        }} />
      ))}
    </span>
  );
}

export default function SignUpPage() {
  const { signUp, setActive } = useSignUp() as any;
  const { user }              = useUser();

  const [step, setStep]         = useState(1);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [digits, setDigits]     = useState(["", "", "", "", "", ""]);
  const [username, setUsername] = useState("");
  const [pfp, setPfp]           = useState<string | null>(null);
  const [busy, setBusy]         = useState(false);
  const [err, setErr]           = useState("");
  const [msg, setMsg]           = useState("");

  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fileRef   = useRef<HTMLInputElement>(null);

  function clerkMsg(e: any): string {
    return e?.errors?.[0]?.longMessage || e?.errors?.[0]?.message || e?.message || "Something went wrong.";
  }

  // ─── Step 1: Create account → send email code ─────────────────────────────
  async function submit1(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setMsg("");
    const em = email.trim();
    if (!em)          return setErr("Please enter your email.");
    if (!password)    return setErr("Please enter a password.");
    if (password.length < 8) return setErr("Password must be at least 8 characters.");
    if (!signUp)      return setErr("Still loading — wait a second and try again.");

    setBusy(true);
    try {
      // 1. Create the signup attempt with email and password
      const res = await signUp.create({ emailAddress: em, password });
      if (res.error) {
        setErr(res.error.longMessage || res.error.message || "Failed to create signup.");
        setBusy(false);
        return;
      }

      // 2. Send the email verification code
      const res2 = await signUp.verifications.sendEmailCode();
      if (res2.error) {
        setErr(res2.error.longMessage || res2.error.message || "Failed to send verification code.");
        setBusy(false);
        return;
      }

      setStep(2);
    } catch (e: any) {
      setErr(e.message || "An unexpected error occurred during signup.");
    } finally {
      setBusy(false);
    }
  }

  // ─── Step 2: Verify code ───────────────────────────────────────────────────
  function onDigit(val: string, i: number) {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = d; setDigits(next);
    if (d && i < 5) digitRefs.current[i + 1]?.focus();
  }
  function onDigitKey(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits]; next[i - 1] = ""; setDigits(next);
      digitRefs.current[i - 1]?.focus();
    }
  }

  async function submit2(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setMsg("");
    const code = digits.join("");
    if (code.length < 6) return setErr("Enter all 6 digits.");
    setBusy(true);
    try {
      // Verify email code (but do NOT finalize the session yet)
      const res = await signUp.verifications.verifyEmailCode({ code });
      if (res.error) {
        setErr(res.error.longMessage || res.error.message || "Verification failed. Please check the code.");
        setBusy(false);
        return;
      }

      // Transition to Step 3 for Profile Setup (Username + PFP)
      setStep(3);
    } catch (e: any) {
      setErr(e.message || "An unexpected error occurred during verification.");
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setErr(""); setMsg("Sending new code…");
    try {
      const res = await signUp.verifications.sendEmailCode();
      if (res.error) {
        setErr(res.error.longMessage || res.error.message || "Failed to resend code.");
        setMsg("");
      } else {
        setMsg("New code sent! Check your inbox.");
      }
    } catch (e: any) {
      setMsg("");
      setErr(e.message || "Failed to resend code.");
    }
  }

  // ─── Step 3: Save profile ──────────────────────────────────────────────────
  function pickFile() { fileRef.current?.click(); }
  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onloadend = () => setPfp(r.result as string);
    r.readAsDataURL(f);
  }

  async function submit3(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const uname = username.trim();
    if (!uname) return setErr("Please choose a username.");
    setBusy(true);
    try {
      if (user) {
        // Double-Fallback A: If already signed in, update via the active user object
        await user.update({ username: uname });
      } else if (signUp) {
        // Double-Fallback B: If still a pending sign-up, update the attempt and finalize
        const res = await signUp.update({ username: uname });
        if (res.error) {
          setErr(res.error.longMessage || res.error.message || "Failed to set username.");
          setBusy(false);
          return;
        }
        const res2 = await signUp.finalize();
        if (res2.error) {
          setErr(res2.error.longMessage || res2.error.message || "Failed to finalize account creation.");
          setBusy(false);
          return;
        }
      } else {
        return setErr("No active authentication session found. Please try again.");
      }

      if (pfp) localStorage.setItem(`pfp_${email}`, pfp);
      localStorage.setItem(`username_${email}`, uname);
      setStep(4);
    } catch (err: any) {
      setErr(err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || "An unexpected error occurred while saving profile.");
    } finally {
      setBusy(false);
    }
  }

  // ─── Shared styles ─────────────────────────────────────────────────────────
  const field: React.CSSProperties = {
    width: "100%", padding: "12px 14px 12px 42px",
    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12, color: "#fff", fontSize: 14, outline: "none",
    transition: "border-color 0.2s, background 0.2s", boxSizing: "border-box",
  };
  const lbl: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace", fontSize: 11,
    color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em", textTransform: "uppercase",
  };
  const ico: React.CSSProperties = {
    position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.3)",
  };

  function CTA({ label, busyLabel, dark = false, gradient = "", glow = "" }: {
    label: string; busyLabel: string; dark?: boolean; gradient?: string; glow?: string;
  }) {
    const g = gradient || (dark ? `linear-gradient(135deg,${CYAN},${BLUE})` : `linear-gradient(135deg,${BLUE},${PINK})`);
    const s = glow    || (dark ? "0 4px 24px rgba(0,240,255,0.28)"         : "0 4px 24px rgba(236,72,153,0.22)");
    return (
      <button type="submit" disabled={busy} style={{
        width: "100%", padding: "14px", borderRadius: 12,
        background: g, color: dark ? "#030408" : "#fff",
        border: "none", fontWeight: 900, fontSize: 13,
        cursor: busy ? "wait" : "pointer",
        fontFamily: "var(--font-geist-mono), monospace",
        textTransform: "uppercase", letterSpacing: "0.1em",
        marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: s, transition: "transform 0.15s", opacity: busy ? 0.82 : 1,
      }}
        onMouseEnter={e => { if (!busy) e.currentTarget.style.transform = "scale(1.015)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {busy ? <><span>{busyLabel}</span><Dots dark={dark} /></> : label}
      </button>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{
      background: "#030408", minHeight: "100vh", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px", position: "relative", overflow: "hidden",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>

      {/* Clerk CAPTCHA mount point (required for bot protection) */}
      <div id="clerk-captcha" style={{ position: "fixed", bottom: -200, left: -200, zIndex: -1 }} />

      <div className="cyber-grid" style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }} />

      <motion.div animate={{ x: [0,45,-25,0], y: [0,-35,35,0], scale: [1,1.06,0.94,1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-10%", right: "-10%", width: 600, height: 600,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none" }} />
      <motion.div animate={{ x: [0,-35,45,0], y: [0,35,-25,0], scale: [1,0.94,1.06,1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 600, height: 600,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(0,240,255,0.06) 0%,transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 10 }}>

        {step < 4 && (
          <a href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "rgba(255,255,255,0.45)", textDecoration: "none",
            fontSize: 13, fontFamily: "var(--font-geist-mono), monospace",
            marginBottom: 24, transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
          >
            <ArrowLeft size={16} /> Return to Home
          </a>
        )}

        <motion.div layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{ borderRadius: 24, padding: "40px 32px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)", overflow: "hidden" }}>

          {/* Header */}
          {step < 4 && (
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", boxShadow: "0 0 20px rgba(0,240,255,0.12)",
              }}>
                <ShieldCheck size={22} color={CYAN} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                {["", "Create Your Account", "Verify Your Email", "Complete Your Profile"][step]}
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6, padding: "0 10px" }}>
                {step === 1 ? "Enter your details to get started."
                  : step === 2 ? `We sent a 6-digit code to ${email}.`
                  : "Choose a username and profile photo."}
              </p>
            </div>
          )}

          {/* Alerts */}
          <AnimatePresence>
            {err && (
              <motion.div key="e" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ padding: "12px 14px", marginBottom: 14,
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: 12, color: "#f87171", fontSize: 13, textAlign: "center" }}>
                {err}
              </motion.div>
            )}
            {msg && (
              <motion.div key="m" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ padding: "12px 14px", marginBottom: 14,
                  background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: 12, color: CYAN, fontSize: 13, textAlign: "center" }}>
                {msg}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">

            {/* ── STEP 1 ────────────────────────────────────────────────── */}
            {step === 1 && (
              <motion.form key="s1" onSubmit={submit1}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={lbl}>Email</label>
                  <div style={{ position: "relative" }}>
                    <span style={ico}><Mail size={16} /></span>
                    <input type="email" autoComplete="email" placeholder="you@example.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErr(""); }}
                      style={field}
                      onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = "rgba(59,130,246,0.02)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={lbl}>Password</label>
                  <div style={{ position: "relative" }}>
                    <span style={ico}><Lock size={16} /></span>
                    <input type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="Min. 8 characters"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setErr(""); }}
                      style={field}
                      onFocus={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.background = "rgba(0,240,255,0.02)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
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

                <CTA label="Continue" busyLabel="Creating account…" dark />

                <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  Already have an account?{" "}
                  <a href="/signin" style={{ color: BLUE, textDecoration: "none", fontWeight: 600 }}>Sign In</a>
                </div>
              </motion.form>
            )}

            {/* ── STEP 2 ────────────────────────────────────────────────── */}
            {step === 2 && (
              <motion.form key="s2" onSubmit={submit2}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ ...lbl, textAlign: "center", marginBottom: 4 }}>Verification Code</label>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    {digits.map((d, i) => (
                      <input key={i}
                        ref={el => { digitRefs.current[i] = el; }}
                        type="text" inputMode="numeric" maxLength={1}
                        value={d}
                        onChange={e => onDigit(e.target.value, i)}
                        onKeyDown={e => onDigitKey(e, i)}
                        style={{
                          width: 48, height: 54, background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                          textAlign: "center", color: "#fff", fontSize: 20, fontWeight: 700,
                          outline: "none", fontFamily: "var(--font-geist-mono), monospace",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = "0 0 10px rgba(59,130,246,0.18)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button type="button" onClick={resend} style={{
                    background: "none", border: "none", color: "rgba(255,255,255,0.4)",
                    fontSize: 12, fontFamily: "var(--font-geist-mono), monospace",
                    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = BLUE}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <RefreshCw size={12} /> Resend code
                  </button>
                </div>

                <CTA label="Verify Code" busyLabel="Verifying…" />
              </motion.form>
            )}

            {/* ── STEP 3 ────────────────────────────────────────────────── */}
            {step === 3 && (
              <motion.form key="s3" onSubmit={submit3}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                <input type="file" ref={fileRef} onChange={onFile} accept="image/*" style={{ display: "none" }} />

                <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
                  <div style={{ position: "relative" }}>
                    <button type="button" onClick={pickFile} style={{
                      width: 96, height: 96, borderRadius: "50%",
                      background: "rgba(255,255,255,0.01)",
                      border: `1.5px dashed ${pfp ? CYAN : "rgba(255,255,255,0.2)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      overflow: "hidden", cursor: "pointer", outline: "none",
                      boxShadow: pfp ? "0 0 25px rgba(0,240,255,0.15)" : "0 4px 24px rgba(0,0,0,0.4)",
                      transition: "all 0.3s",
                    }}>
                      {pfp
                        ? <img src={pfp} alt="PFP" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            {AVATAR_PLACEHOLDER}
                            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Upload</span>
                          </div>
                      }
                    </button>
                    <button type="button" onClick={pickFile} style={{
                      position: "absolute", bottom: 0, right: 0, background: "#030408",
                      border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%",
                      width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.8)",
                    }}>
                      <Camera size={13} color="rgba(255,255,255,0.6)" />
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: -8 }}>
                  <button type="button" onClick={pickFile} style={{
                    background: "none", border: "none",
                    color: pfp ? EMERALD : "rgba(255,255,255,0.45)",
                    fontSize: 12, fontFamily: "var(--font-geist-mono), monospace",
                    cursor: "pointer", textDecoration: "underline",
                  }}>
                    {pfp ? "Change photo" : "Select photo from device"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={lbl}>Username</label>
                  <div style={{ position: "relative" }}>
                    <span style={ico}><User size={16} /></span>
                    <input type="text" autoComplete="username" placeholder="your_username"
                      value={username}
                      onChange={e => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")); setErr(""); }}
                      style={field}
                      onFocus={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.background = "rgba(0,240,255,0.02)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                    />
                  </div>
                </div>

                <CTA label="Create Account" busyLabel="Saving profile…" dark />
              </motion.form>
            )}

            {/* ── STEP 4: Success ───────────────────────────────────────── */}
            {step === 4 && (
              <motion.div key="s4"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(16,185,129,0.06)", border: `1px solid ${EMERALD}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, boxShadow: "0 0 25px rgba(16,185,129,0.2)",
                }}>
                  <CheckCircle2 size={26} color={EMERALD} />
                </div>

                <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
                  Account Created!
                </h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6, maxWidth: 300 }}>
                  You&apos;re all set. Welcome to escrowz.
                </p>

                <div style={{
                  margin: "28px 0", padding: "24px", width: "100%",
                  background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%", background: "#030408",
                    border: `2px solid ${CYAN}`, overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 25px rgba(0,240,255,0.2)",
                  }}>
                    {pfp ? <img src={pfp} alt="PFP" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : DEFAULT_PFP()}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                      {pfp ? "Custom Upload" : "Default Assigned"}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>@{username}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{email}</div>
                  </div>
                </div>

                <a href="/dashboard" style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", padding: "14px",
                  background: `linear-gradient(135deg,${CYAN},${BLUE})`,
                  color: "#030408", borderRadius: 12, textDecoration: "none",
                  fontWeight: 900, fontSize: 13,
                  fontFamily: "var(--font-geist-mono), monospace",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  boxShadow: "0 4px 20px rgba(0,240,255,0.3)", transition: "transform 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.015)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Go to Dashboard →
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @keyframes pd {
          0%   { opacity: 0.25; transform: scale(0.85); }
          100% { opacity: 1;    transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
