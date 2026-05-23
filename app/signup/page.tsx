"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, CheckCircle2, ShieldCheck, RefreshCw, Eye, EyeOff, Upload, Camera } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";
const PINK = "#ec4899";
const EMERALD = "#10b981";

// Default Assigned PFP SVG
const DEFAULT_PFP_SVG = (size = 64) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 6L54 14V30C54 44.4 44.6 54.8 32 58C19.4 54.8 10 44.4 10 30V14L32 6Z" stroke={CYAN} strokeWidth="2.5" fill="rgba(0, 240, 255, 0.06)" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="28" r="4" stroke={CYAN} strokeWidth="2.5" fill="#030408"/>
    <path d="M22 28H42" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Generic Silhouette User Placeholder
const PLACEHOLDER_AVATAR = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function SignUpPage() {
  const [step, setStep]                   = useState(1);
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [showPassword, setShowPassword]   = useState(false);
  const [code, setCode]                   = useState(["", "", "", "", "", ""]);
  const [username, setUsername]           = useState("");
  const [customPfp, setCustomPfp]         = useState<string | null>(null);
  const [isLoading, setIsLoading]         = useState(false);
  const [feedback, setFeedback]           = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Step 2: Handle Code digit entering
  const handleCodeChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Auto-focus next box if digit entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Step 2: Handle Code backspacing
  const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Step 2: Verify Code
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = code.join("");
    if (finalCode.length < 6) {
      setFeedback("Please enter the full 6-digit code.");
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
  const handleResendCode = () => {
    setFeedback("Sending a new verification code...");
    setTimeout(() => {
      setFeedback("New verification code sent to your email!");
    }, 800);
  };

  // Step 3: File Upload trigger & handle
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomPfp(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      {/* Grid background */}
      <div className="cyber-grid" style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, pointerEvents: "none"
      }} />
      
      {/* Drifting and pulsing glowing ambient orbs */}
      <motion.div
        animate={{
          x: [0, 45, -25, 0],
          y: [0, -35, 35, 0],
          scale: [1, 1.06, 0.94, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)`,
          filter: "blur(80px)", pointerEvents: "none",
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -35, 45, 0],
          y: [0, 35, -25, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)`,
          filter: "blur(80px)", pointerEvents: "none",
        }}
      />

      {/* Main card container */}
      <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 10 }}>
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

        {/* Card Panel */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
              onMouseEnter={(e) => e.currentTarget.style.color = CYAN}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              <ArrowLeft size={12} /> Edit Verification
            </button>
          )}

          {/* Header section */}
          {step < 4 && (
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(0,240,255,0.06)",
                border: `1px solid rgba(0,240,255,0.25)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: `0 0 20px rgba(0,240,255,0.12)`,
                transition: "all 0.3s ease"
              }}>
                <ShieldCheck size={22} color={CYAN} />
              </div>
              
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                {step === 1 && "Create Your Account"}
                {step === 2 && "Verify Your Email"}
                {step === 3 && "Complete Your Profile"}
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6, padding: "0 10px" }}>
                {step === 1 && "Enter your details to create an account."}
                {step === 2 && "Enter the 6-digit verification code sent to your email."}
                {step === 3 && "Choose a username and set a profile picture."}
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
                    Email
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
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
                      CREATING ACCOUNT
                      <span style={{ display: "inline-flex", gap: 3 }}>
                        {[0, 1, 2].map((i) => (
                          <span key={i} style={{
                            width: 4, height: 4, borderRadius: "50%", background: "#030408",
                            animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                          }} />
                        ))}
                      </span>
                    </span>
                  ) : "Continue"}
                </button>

                <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  Already have an account?{" "}
                  <a href="/signin" style={{ color: BLUE, textDecoration: "none", fontWeight: 600 }}>Sign In</a>
                </div>
              </motion.form>
            )}

            {/* STEP 2: Code verification */}
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
                    Sent to: <strong style={{ color: "#fff" }}>{email}</strong>
                  </span>
                  <span style={{ color: BLUE, fontSize: 10, fontFamily: "var(--font-geist-mono), monospace" }}>
                    6-DIGIT CODE
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

                {/* 6-digit Code Grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    textAlign: "center", marginBottom: 4
                  }}>
                    Verification Code
                  </label>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(e.target.value, i)}
                        onKeyDown={(e) => handleCodeKeyDown(e, i)}
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
                    onClick={handleResendCode}
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
                    <RefreshCw size={12} /> Resend code
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
                      VERIFYING CODE
                      <span style={{ display: "inline-flex", gap: 3 }}>
                        {[0, 1, 2].map((i) => (
                          <span key={i} style={{
                            width: 4, height: 4, borderRadius: "50%", background: "#fff",
                            animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                          }} />
                        ))}
                      </span>
                    </span>
                  ) : "Verify Code"}
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
                {/* Invisible input file */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: "none" }} 
                />

                {/* Selected PFP Large Live Preview */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0" }}>
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      onClick={triggerFileUpload}
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.01)",
                        border: `1.5px dashed rgba(255, 255, 255, 0.2)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        outline: "none",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = CYAN;
                        e.currentTarget.style.background = "rgba(0, 240, 255, 0.02)";
                        e.currentTarget.style.boxShadow = `0 0 25px rgba(0, 240, 255, 0.15)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = customPfp ? CYAN : "rgba(255, 255, 255, 0.2)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.01)";
                        e.currentTarget.style.boxShadow = customPfp ? `0 0 25px rgba(0, 240, 255, 0.1)` : "0 4px 30px rgba(0, 0, 0, 0.4)";
                      }}
                    >
                      {customPfp ? (
                        <img 
                          src={customPfp} 
                          alt="Custom Upload PFP" 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          {PLACEHOLDER_AVATAR}
                          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Upload</span>
                        </div>
                      )}
                    </button>
                    {/* Glowing outer ring orb behind preview */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      background: CYAN,
                      filter: "blur(20px)",
                      opacity: customPfp ? 0.15 : 0,
                      zIndex: 1,
                      transition: "opacity 0.3s ease"
                    }} />
                    
                    {/* Clickable camera badge to quick upload */}
                    <button
                      type="button"
                      onClick={triggerFileUpload}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        background: "#030408",
                        border: `1px solid rgba(255,255,255,0.15)`,
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 3,
                        cursor: "pointer",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.8)",
                        transition: "transform 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                        e.currentTarget.style.borderColor = CYAN;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                    >
                      <Camera size={13} color="rgba(255,255,255,0.6)" />
                    </button>
                  </div>
                </div>

                {/* Upload Action Label */}
                <div style={{ textAlign: "center", marginTop: -8 }}>
                  <button
                    type="button"
                    onClick={triggerFileUpload}
                    style={{
                      background: "none",
                      border: "none",
                      color: customPfp ? EMERALD : "rgba(255,255,255,0.45)",
                      fontSize: 12,
                      fontFamily: "var(--font-geist-mono), monospace",
                      cursor: "pointer",
                      textDecoration: "underline",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = CYAN}
                    onMouseLeave={(e) => e.currentTarget.style.color = customPfp ? EMERALD : "rgba(255,255,255,0.45)"}
                  >
                    {customPfp ? "Change profile photo" : "Select photo from Downloads"}
                  </button>
                </div>

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
                      placeholder="Username"
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
                    marginTop: 10,
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
                      CREATING ACCOUNT
                      <span style={{ display: "inline-flex", gap: 3 }}>
                        {[0, 1, 2].map((i) => (
                          <span key={i} style={{
                            width: 4, height: 4, borderRadius: "50%", background: "#030408",
                            animation: "pulseDot 1s infinite alternate", animationDelay: `${i * 0.2}s`
                          }} />
                        ))}
                      </span>
                    </span>
                  ) : "Create Account"}
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
                  Account Created Successfully!
                </h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6, maxWidth: 320 }}>
                  Your new profile is fully configured. Welcome to the platform!
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
                      border: `2px solid ${CYAN}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 25px rgba(0, 240, 255, 0.2)`,
                      position: "relative",
                      zIndex: 2,
                      overflow: "hidden"
                    }}>
                      {customPfp ? (
                        <img 
                          src={customPfp} 
                          alt="Custom PFP" 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                      ) : (
                        DEFAULT_PFP_SVG(46)
                      )}
                    </div>
                    {/* Shadow ambient glow blur ring */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: CYAN,
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
                      color: CYAN,
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.06em",
                      fontWeight: 700
                    }}>
                      {customPfp ? "CUSTOM UPLOAD" : "DEFAULT ASSIGNED"}
                    </span>
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
                  Access Dashboard
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
                  Sign Out
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
