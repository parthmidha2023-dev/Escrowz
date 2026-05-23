"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, ArrowUpRight, Terminal } from "lucide-react";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";

const navLinks = [
  { name: "Features",   href: "#features"   },
  { name: "Sectors",    href: "#categories" },
  { name: "Live Stats", href: "#stats"      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: scrolled ? 12 : 20,
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "92%",
          maxWidth: 1100,
          zIndex: 100,
          transition: "top 0.3s ease",
        }}
      >
        {/* 3-column grid: logo | nav-center | cta — guarantees true center */}
        <div
          className="glass glass-nav"
          style={{
            borderRadius: 16,
            padding: "10px 24px",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
            width: "100%",
          }}
        >
          {/* ── Logo (left) ── */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(59,130,246,0.12)",
              border: `1px solid rgba(59,130,246,0.35)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Shield size={18} color={BLUE} />
            </div>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: 700, fontSize: 17, color: "#fff", whiteSpace: "nowrap",
            }}>
              escrowz<span style={{ color: CYAN }}>.</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 400, marginLeft: 2 }}>lol</span>
            </span>
          </a>

          {/* ── Nav links (true center column) ── */}
          <nav
            className="nav-desktop"
            style={{ display: "flex", gap: 32, alignItems: "center", justifyContent: "center" }}
          >
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 13, color: "rgba(255,255,255,0.6)",
                  textDecoration: "none", display: "flex", alignItems: "center", gap: 5,
                  transition: "color 0.2s", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                <Terminal size={11} color={CYAN} style={{ opacity: 0.55 }} />
                {l.name}
              </a>
            ))}
          </nav>

          {/* ── CTA buttons (right) ── */}
          <div
            className="nav-desktop"
            style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "flex-end" }}
          >
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
              style={{
                fontFamily: "var(--font-geist-mono), monospace", fontSize: 12,
                color: "rgba(255,255,255,0.65)", textDecoration: "none",
                padding: "7px 14px", fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", transition: "color 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              Sign In
            </a>
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
              style={{
                fontFamily: "var(--font-geist-mono), monospace", fontSize: 12,
                background: BLUE, color: "#fff", textDecoration: "none",
                padding: "8px 18px", borderRadius: 10, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                boxShadow: "0 0 20px rgba(59,130,246,0.35)",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 35px rgba(59,130,246,0.6)"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.35)"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Sign Up <ArrowUpRight size={13} />
            </a>
          </div>

          {/* ── Mobile: hamburger replaces CTA col ── */}
          <div className="nav-mobile" style={{ display: "none", justifyContent: "flex-end" }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, padding: 8, color: "#fff", cursor: "pointer",
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="glass"
            style={{
              position: "fixed", top: 76, left: 16, right: 16, zIndex: 90,
              borderRadius: 16, padding: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              border: `1px solid rgba(59,130,246,0.2)`,
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  display: "block", padding: "12px 8px",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 13, color: "rgba(255,255,255,0.7)",
                  textDecoration: "none", letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {l.name}
              </a>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }} style={{
                flex: 1, textAlign: "center", padding: "10px",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                color: "#fff", textDecoration: "none",
                fontFamily: "var(--font-geist-mono), monospace", fontSize: 12,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>Sign In</a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }} style={{
                flex: 1, textAlign: "center", padding: "10px",
                background: BLUE, borderRadius: 10, color: "#fff", textDecoration: "none",
                fontFamily: "var(--font-geist-mono), monospace", fontSize: 12,
                textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700,
              }}>Sign Up</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .glass-nav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
        }
        @media (max-width: 768px) {
          .glass-nav {
            display: flex;
            justify-content: space-between;
          }
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
