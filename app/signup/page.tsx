"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, CheckCircle2, ShieldCheck, Key, RefreshCw, Eye, EyeOff } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";
const PINK = "#ec4899";
const EMERALD = "#10b981";
const PURPLE = "#a855f7";

// Definition of premium custom cybernetic presets
const AVATARS = [
  {
    id: "sentinel",
    name: "Sentinel Shield",
    color: CYAN,
    archetype: "SENTINEL PROTOCOL",
    description: "Active zero-trust vault firewall enabled.",
    svg: (size = 64) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 6L54 14V30C54 44.4 44.6 54.8 32 58C19.4 54.8 10 44.4 10 30V14L32 6Z" stroke={CYAN} strokeWidth="2.5" fill="rgba(0, 240, 255, 0.06)" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 18V44" stroke={CYAN} strokeWidth="2" strokeDasharray="3 3"/>
        <path d="M22 28H42" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
        <path d="M25 36H39" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="32" cy="28" r="4" stroke={CYAN} strokeWidth="2.5" fill="#030408"/>
      </svg>
    )
  },
  {
    id: "netrunner",
    name: "Netrunner Visor",
    color: PINK,
    archetype: "NETRUNNER NEXUS",
    description: "Decentralized anonymous routing nodes active.",
    svg: (size = 64) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="44" height="44" rx="10" stroke={PINK} strokeWidth="2.5" fill="rgba(236, 72, 153, 0.06)"/>
        <path d="M14 26H50V36H14V26Z" fill="rgba(236, 72, 153, 0.2)" stroke={PINK} strokeWidth="2" strokeLinejoin="round"/>
        <line x1="18" y1="31" x2="46" y2="31" stroke={PINK} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="18" r="2.5" fill={PINK}/>
        <circle cx="32" cy="46" r="2.5" fill={PINK}/>
        <path d="M6 32H10" stroke={PINK} strokeWidth="2"/>
        <path d="M54 32H58" stroke={PINK} strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: "quantum",
    name: "Quantum Orbit",
    color: EMERALD,
    archetype: "QUANTUM CORE",
    description: "Multi-layered escrow ledger sync protocol active.",
    svg: (size = 64) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" stroke={EMERALD} strokeWidth="2" fill="rgba(16, 185, 129, 0.05)"/>
        <circle cx="32" cy="32" r="14" stroke={EMERALD} strokeWidth="2.5" strokeDasharray="6 3"/>
        <circle cx="32" cy="32" r="6" fill={EMERALD}/>
        <path d="M32 4V12" stroke={EMERALD} strokeWidth="2"/>
        <path d="M32 52V60" stroke={EMERALD} strokeWidth="2"/>
        <path d="M4 32H12" stroke={EMERALD} strokeWidth="2"/>
        <path d="M52 32H60" stroke={EMERALD} strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: "hypercore",
    name: "Hyper-Drive",
    color: PURPLE,
    archetype: "HYPER-CORE DRIVE",
    description: "High-frequency cryptographic vault status normal.",
    svg: (size = 64) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,6 56,20 56,48 32,58 8,48 8,20" stroke={PURPLE} strokeWidth="2.5" fill="rgba(168, 85, 247, 0.06)"/>
        <polygon points="32,16 46,25 46,41 32,48 18,41 18,25" stroke={PURPLE} strokeWidth="1.5" strokeDasharray="3 3"/>
        <circle cx="32" cy="32" r="5" fill={PURPLE}/>
        <line x1="32" y1="6" x2="32" y2="58" stroke={PURPLE} strokeWidth="1"/>
        <line x1="8" y1="20" x2="56" y2="48" stroke={PURPLE} strokeWidth="1"/>
        <line x1="8" y1="48" x2="56" y2="20" stroke={PURPLE} strokeWidth="1"/>
      </svg>
    )
  }
];

export default function SignUpPage() {
  const [step, setStep]                   = useState(1);
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [showPassword, setShowPassword]   = useState(false);
  const [otp, setOtp]                     = useState(["", "", "", "", "", ""]);
  const [username, setUsername]           = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [isLoading, setIsLoading]         = useState(false);
  const [feedback, setFeedback]           = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1: Submit Credentials
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setFeedback("");
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1200);
  };

  // Step 2: Handle OTP digit entering
  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next box if digit entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Step 2: Handle OTP backspacing
  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Step 2: Verify OTP code
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = otp.join("");
    if (finalCode.length < 6) {
      setFeedback("Please supply a valid 6-digit confirmation code.");
      return;
    }
    setIsLoading(true);
    setFeedback("");
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1200);
  };

  // Step 2: Resend Code simulation
  const handleResendOtp = () => {
    setFeedback("Transmitting new confirmation code sequence...");
    setTimeout(() => {
      setFeedback("Decentralized verification key resent to mailbox!");
    }, 800);
  };

  // Step 3: Complete registration
  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setIsLoading(true);
    setFeedback("");
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
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
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>
      {/* Grid and blurred glowing ambiance backdrop */}
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

      {/* Main card box */}
      <div style={{ width: "100%", maxWidth: step === 3 ? 520 : 460, position: "relative", zIndex: 10 }}>
        {/* Top return arrow */}
        {step < 4 && (
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
              marginBottom: 24,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
          >
            <ArrowLeft size={16} /> Return to Home
          </a>
        )}

        {/* Dynamic Card Container */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{
            borderRadius: 24,
            padding: step === 3 ? "36px 28px" : "40px 32px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            position: "relative",
            overflow: "hidden",
            transition: "padding 0.3s ease",
          }}
        >
          {/* Neon running header highlight based on Step colors */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: step === 2 
              ? `linear-gradient(to right, ${BLUE}, ${PINK})`
              : step === 3 
                ? `linear-gradient(to right, ${AVATARS[selectedAvatar].color}, ${BLUE})`
                : step === 4 
                  ? `linear-gradient(to right, ${EMERALD}, ${CYAN})`
                  : `linear-gradient(to right, ${CYAN}, ${BLUE})`,
            transition: "background 0.4s ease"
          }} />

          {/* Inline header "back" trigger to edit previous inputs */}
          {step === 2 && !isLoading && (
            <button
              onClick={() => { setStep(1); setFeedback(""); }}
              style={{
                position: "absolute",
                top: 20,
                right: 24,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontFamily: "var(--font-geist-mono), monospace",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = CYAN}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              <ArrowLeft size={12} /> Edit Email
            </button>
          )}

          {step === 3 && !isLoading && (
            <button
              onClick={() => { setStep(2); setFeedback(""); }}
              style={{
                position: "absolute",
                top: 20,
                right: 24,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontFamily: "var(--font-geist-mono), monospace",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = AVATARS[selectedAvatar].color}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              <ArrowLeft size={12} /> Edit Verification
            </button>
          )}

          {/* Logo & Header section */}
          {step < 4 && (
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: step === 3 ? "rgba(255,255,255,0.03)" : "rgba(0,240,255,0.06)",
                border: `1px solid ${step === 3 ? AVATARS[selectedAvatar].color + "4D" : "rgba(0,240,255,0.25)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: step === 3 
                  ? `0 0 20px ${AVATARS[selectedAvatar].color}1A` 
                  : `0 0 20px rgba(0,240,255,0.12)`,
                transition: "all 0.3s ease"
              }}>
                {step === 3 ? (
                  AVATARS[selectedAvatar].svg(22)
                ) : step === 2 ? (
                  <Key size={20} color={BLUE} />
                ) : (
                  <ShieldCheck size={22} color={CYAN} />
                )}
              </div>
              
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                {step === 1 && "Initialize Secure Identity"}
                {step === 2 && "Enter Handshake Code"}
                {step === 3 && "Establish Cyber Identity"}
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6, padding: "0 10px" }}>
                {step === 1 && "Start your onboarding process inside the zero-trust escrow network."}
                {step === 2 && "Transmit the OTP key sent to verify mailbox authenticity."}
                {step === 3 && "Configure username and choose a unique cybernetic node profile badge."}
              </p>
            </div>
          )}

          {/* Multi-step Animate forms */}
          <AnimatePresence mode="wait">
            
            {/* STEP 1: credentials form */}
            {step === 1 && (
              <motion.form
                key="step1"
                onSubmit={handleStep1Submit}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.05em", textTransform: "uppercase"
                  }}>
                    Secure Email
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
                    Secure Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 42px 12px 42px",
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
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(255,255,255,0.3)",
                        padding: 0,
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
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
                      e.currentTarget.style.transform = "scale(1.01)";
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
                      TRANSMITTING CREDENTIAL HANDSHAKE
                      <span style={{ display: "inline-flex", gap: 3 }}>
                        {[0, 1, 2].map((i) => (
                          <span key={i} style={{
                            width: 4, height: 4, borderRadius: "50%", background: "#030408",
                            animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                          }} />
                        ))}
                      </span>
                    </span>
                  ) : "Initialize Key Generation"}
                </button>

                <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  Already registered?{" "}
                  <a href="/signin" style={{ color: BLUE, textDecoration: "none", fontWeight: 600 }}>Access Vault</a>
                </div>
              </motion.form>
            )}

            {/* STEP 2: OTP verification */}
            {step === 2 && (
              <motion.form
                key="step2"
                onSubmit={handleStep2Submit}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Visual email recipient banner */}
                <div style={{
                  background: "rgba(59,130,246,0.04)",
                  border: "1px solid rgba(59,130,246,0.12)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    OTP sent to: <strong style={{ color: "#fff" }}>{email}</strong>
                  </span>
                  <span style={{ color: BLUE, fontSize: 10, fontFamily: "var(--font-geist-mono), monospace" }}>
                    6-DIGIT KEY
                  </span>
                </div>

                {/* Inline alerts / notifications */}
                {feedback && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    background: "rgba(59,130,246,0.06)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 12,
                    color: CYAN,
                    fontSize: 13,
                  }}>
                    <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                    <span>{feedback}</span>
                  </div>
                )}

                {/* 6-digit OTP Grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    textAlign: "center", marginBottom: 4
                  }}>
                    Security Handshake Code
                  </label>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        required
                        style={{
                          width: "48px",
                          height: "54px",
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 10,
                          textAlign: "center",
                          color: "#fff",
                          fontSize: 20,
                          fontWeight: 700,
                          outline: "none",
                          fontFamily: "var(--font-geist-mono), monospace",
                          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = BLUE;
                          e.currentTarget.style.background = "rgba(59,130,246,0.02)";
                          e.currentTarget.style.boxShadow = `0 0 10px rgba(59,130,246,0.15)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sub actions (Resend code) */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                      fontFamily: "var(--font-geist-mono), monospace",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = BLUE}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <RefreshCw size={12} /> Resend verification code
                  </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${BLUE}, ${PINK})`,
                    color: "#fff",
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
                    boxShadow: `0 4px 20px rgba(236,72,153,0.18)`,
                    transition: "transform 0.15s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow = `0 4px 30px rgba(236,72,153,0.35)`;
                      e.currentTarget.style.transform = "scale(1.01)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow = `0 4px 20px rgba(236,72,153,0.18)`;
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  {isLoading ? (
                    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                      DECRYPTING NETWORK HANDSHAKE
                      <span style={{ display: "inline-flex", gap: 3 }}>
                        {[0, 1, 2].map((i) => (
                          <span key={i} style={{
                            width: 4, height: 4, borderRadius: "50%", background: "#fff",
                            animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                          }} />
                        ))}
                      </span>
                    </span>
                  ) : "Verify Security Key"}
                </button>
              </motion.form>
            )}

            {/* STEP 3: username & profile picture selection */}
            {step === 3 && (
              <motion.form
                key="step3"
                onSubmit={handleStep3Submit}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Selected PFP Large Live Preview */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0" }}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      background: "rgba(3, 4, 8, 0.8)",
                      border: `2px solid ${AVATARS[selectedAvatar].color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 30px ${AVATARS[selectedAvatar].color}2A`,
                      position: "relative",
                      zIndex: 2,
                      transition: "all 0.3s ease"
                    }}>
                      {AVATARS[selectedAvatar].svg(54)}
                    </div>
                    {/* Glowing outer ring orb behind preview */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      background: AVATARS[selectedAvatar].color,
                      filter: "blur(20px)",
                      opacity: 0.15,
                      zIndex: 1,
                      transition: "all 0.3s ease"
                    }} />
                    <span style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      background: "#030408",
                      border: `1px solid ${AVATARS[selectedAvatar].color}`,
                      borderRadius: "50%",
                      width: 26,
                      height: 26,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 3,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.8)"
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: AVATARS[selectedAvatar].color }} />
                    </span>
                  </div>
                </div>

                {/* Username */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.05em", textTransform: "uppercase"
                  }}>
                    Public Username
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="agent_escrowz"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                        e.currentTarget.style.borderColor = AVATARS[selectedAvatar].color;
                        e.currentTarget.style.background = `${AVATARS[selectedAvatar].color}05`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      }}
                    />
                  </div>
                </div>

                {/* Avatar Selection Grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.05em", textTransform: "uppercase"
                  }}>
                    Select Profile Avatar Archetype
                  </label>
                  
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 12
                  }}>
                    {AVATARS.map((avatar, idx) => {
                      const isSelected = selectedAvatar === idx;
                      return (
                        <button
                          key={avatar.id}
                          type="button"
                          onClick={() => setSelectedAvatar(idx)}
                          style={{
                            background: "rgba(255,255,255,0.01)",
                            border: `1px solid ${isSelected ? avatar.color : "rgba(255,255,255,0.08)"}`,
                            borderRadius: 14,
                            padding: "14px 8px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 8,
                            boxShadow: isSelected ? `0 0 15px ${avatar.color}25` : "none",
                            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                            transform: isSelected ? "scale(1.04)" : "scale(1)"
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                              e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                            }
                          }}
                        >
                          {avatar.svg(28)}
                          <span style={{
                            fontSize: 9,
                            color: isSelected ? "#fff" : "rgba(255,255,255,0.35)",
                            fontFamily: "var(--font-geist-mono), monospace",
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                            textAlign: "center"
                          }}>
                            {avatar.id}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Archetype Description box */}
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    minHeight: 52,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 3,
                    transition: "all 0.3s ease"
                  }}>
                    <span style={{
                      fontSize: 10,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: AVATARS[selectedAvatar].color,
                      fontWeight: 700,
                      letterSpacing: "0.05em"
                    }}>
                      {AVATARS[selectedAvatar].archetype}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                      {AVATARS[selectedAvatar].description}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${AVATARS[selectedAvatar].color}, ${BLUE})`,
                    color: "#030408",
                    border: "none",
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono), monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 20px ${AVATARS[selectedAvatar].color}40`,
                    transition: "transform 0.15s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow = `0 4px 30px ${AVATARS[selectedAvatar].color}60`;
                      e.currentTarget.style.transform = "scale(1.01)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow = `0 4px 20px ${AVATARS[selectedAvatar].color}40`;
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  {isLoading ? (
                    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                      PROVISIONING SECURE NODE
                      <span style={{ display: "inline-flex", gap: 3 }}>
                        {[0, 1, 2].map((i) => (
                          <span key={i} style={{
                            width: 4, height: 4, borderRadius: "50%", background: "#030408",
                            animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                          }} />
                        ))}
                      </span>
                    </span>
                  ) : "Complete Protocol Onboarding"}
                </button>
              </motion.form>
            )}

            {/* STEP 4: Success state victory page */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {/* Large check success badge */}
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(16,185,129,0.06)",
                  border: `1px solid ${EMERALD}`,
                  display: "flex", alignItems: "center", justifyItems: "center",
                  justifyContent: "center", marginBottom: 20,
                  boxShadow: `0 0 25px rgba(16,185,129,0.2)`
                }}>
                  <CheckCircle2 size={26} color={EMERALD} />
                </div>

                <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
                  Vault Identity Initialized
                </h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6, maxWidth: 320 }}>
                  Decentralized node access credentials successfully authorized. Secure alias resolved.
                </p>

                {/* Final resolved profile preview display */}
                <div style={{
                  margin: "30px 0",
                  padding: "24px",
                  width: "100%",
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  position: "relative"
                }}>
                  {/* Glowing PFP in large size */}
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "#030408",
                      border: `2px solid ${AVATARS[selectedAvatar].color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 25px ${AVATARS[selectedAvatar].color}33`,
                      position: "relative",
                      zIndex: 2
                    }}>
                      {AVATARS[selectedAvatar].svg(46)}
                    </div>
                    {/* Shadow ambient glow blur ring */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: AVATARS[selectedAvatar].color,
                      filter: "blur(15px)",
                      opacity: 0.2,
                      zIndex: 1
                    }} />
                  </div>

                  {/* Profile Username details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
                      @{username}
                    </span>
                    <span style={{
                      fontSize: 10,
                      color: AVATARS[selectedAvatar].color,
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.06em",
                      fontWeight: 700
                    }}>
                      {AVATARS[selectedAvatar].archetype}
                    </span>
                  </div>

                  {/* Vault system transaction code details */}
                  <div style={{
                    width: "100%",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    fontFamily: "var(--font-geist-mono), monospace"
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>NODE_ROUTING_KEY</span>
                    <span style={{ color: CYAN, fontWeight: 700 }}>esc_v4_7d9e4c</span>
                  </div>
                </div>

                {/* Primary navigation button to dashboard */}
                <a
                  href="/"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${EMERALD}, ${CYAN})`,
                    color: "#030408",
                    border: "none",
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono), monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 20px rgba(16,185,129,0.25)`,
                    transition: "transform 0.15s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 30px rgba(16,185,129,0.45)`;
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(16,185,129,0.25)`;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Access Deal Console
                </a>

                {/* Secondary action */}
                <a
                  href="/signin"
                  style={{
                    marginTop: 16,
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 12,
                    fontFamily: "var(--font-geist-mono), monospace",
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                >
                  Sign Out of Node Session
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>

      {/* Embedded core CSS dot pulse keyframes for buttons & forms */}
      <style>{`
        @keyframes pulseDot {
          0% { opacity: 0.2; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
