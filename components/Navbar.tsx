"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Terminal, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Terminal", href: "#hero" },
    { name: "Features", href: "#features" },
    { name: "Sectors", href: "#categories" },
    { name: "Network Stats", href: "#stats" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl transition-all duration-300 ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-white/5 bg-zinc-950/70 backdrop-blur-md">
          {/* Logo Section */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/30 overflow-hidden group-hover:border-cyber-blue/60 transition-colors">
              <Shield className="w-5 h-5 text-electric-blue group-hover:text-cyber-blue transition-colors" />
              {/* Inner subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold tracking-tight text-white flex items-center text-base sm:text-lg">
                escrowz
                <span className="text-cyber-blue font-bold text-glow-blue animate-pulse">.</span>
                <span className="text-white/60 text-xs sm:text-sm font-light uppercase tracking-wider ml-1">lol</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-white/70 hover:text-white font-mono text-sm tracking-wide transition-colors py-1.5 px-1 group"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-500/50 group-hover:text-cyber-blue transition-colors" />
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyber-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#hero"
              className="font-mono text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors uppercase px-3 py-2"
            >
              Sign In
            </a>
            
            <a
              href="#hero"
              className="relative overflow-hidden group rounded-xl px-5 py-2 flex items-center gap-1 font-mono text-xs font-semibold text-white tracking-wider uppercase transition-all bg-electric-blue shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Sign Up</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 mx-4 z-40 p-6 glass-panel rounded-2xl flex flex-col gap-6 md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-blue-500/20 bg-zinc-950/95"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 font-mono text-sm tracking-widest uppercase text-white/70 hover:text-cyber-blue transition-colors py-2 px-3 rounded-lg hover:bg-blue-500/5"
                >
                  <Terminal className="w-4 h-4 text-cyber-blue" />
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-[1px] bg-white/5" />

            <div className="flex flex-col gap-3">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-mono text-xs uppercase tracking-widest text-white/80 hover:text-white border border-white/10 bg-zinc-900/40 hover:bg-zinc-900 transition-colors"
              >
                Sign In
              </a>
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-mono text-xs uppercase tracking-widest text-white font-bold bg-electric-blue shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all"
              >
                Sign Up
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
