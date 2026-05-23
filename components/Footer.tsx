"use client";

import React, { useState } from "react";
import { Shield, Send, Terminal, ArrowUpRight, MessageSquare, Check, AlertCircle } from "lucide-react";

export default function Footer() {
  const [dealId, setDealId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealId) return;

    setVerificationStatus("verifying");
    setTimeout(() => {
      if (dealId.toLowerCase().includes("esc-4402") || dealId.toLowerCase() === "demo") {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    }, 1500);
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 pt-20 pb-10 px-4 md:px-8 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto z-10 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        
        {/* Column 1: Brand & Security Badges */}
        <div className="md:col-span-4 space-y-6">
          <a href="#hero" className="flex items-center gap-2 group self-start">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/30 overflow-hidden group-hover:border-cyber-blue/60 transition-colors">
              <Shield className="w-5 h-5 text-electric-blue group-hover:text-cyber-blue transition-colors" />
            </div>
            <span className="font-mono font-bold tracking-tight text-white flex items-center text-lg">
              escrowz<span className="text-cyber-blue font-bold animate-pulse text-glow-blue">.</span>
              <span className="text-white/60 text-xs font-light uppercase tracking-wider ml-1">lol</span>
            </span>
          </a>

          <p className="text-white/50 text-sm font-light leading-relaxed">
            The luxury standard for zero-trust digital escrow agreements. Securing high-value assets with hardware-grade cryptographic proof and neutral arbitration pools.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="font-mono text-[9px] font-bold text-white/40 border border-white/5 bg-zinc-900/40 rounded px-2.5 py-1">
              [ SOC-2 TYPE II ]
            </span>
            <span className="font-mono text-[9px] font-bold text-white/40 border border-white/5 bg-zinc-900/40 rounded px-2.5 py-1">
              [ ISO 27001 ]
            </span>
            <span className="font-mono text-[9px] font-bold text-cyber-blue border border-blue-500/20 bg-blue-950/20 rounded px-2.5 py-1">
              [ AES-GCM-256 VAULT ]
            </span>
          </div>
        </div>

        {/* Column 2 & 3: Platform Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-extrabold tracking-widest text-cyber-blue uppercase">// PROTOCOL</h4>
            <ul className="space-y-2">
              {["Secure Node", "Multisig Vault", "Arbitration Pool", "Audit Ledger"].map((item) => (
                <li key={item}>
                  <a href="#features" className="text-xs text-white/55 hover:text-white transition-colors flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-extrabold tracking-widest text-cyber-blue uppercase">// SECTORS</h4>
            <ul className="space-y-2">
              {["Gaming Accounts", "Crypto Swaps", "Freelance Jobs", "SaaS Licensing"].map((item) => (
                <li key={item}>
                  <a href="#categories" className="text-xs text-white/55 hover:text-white transition-colors flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 4: Cryptographic Ledger Verify Sandbox */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-mono text-[10px] font-extrabold tracking-widest text-cyber-blue uppercase">
            // LEDGER INTEGRITY CHECK
          </h4>
          <p className="text-[11px] text-white/40 leading-relaxed font-light">
            Enter a deal code to cryptographically verify its lockbox status in real-time. Try entering <span className="text-cyber-blue font-mono">ESC-4402</span>.
          </p>

          <form onSubmit={handleVerify} className="space-y-2">
            <div className="relative">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={dealId}
                onChange={(e) => setDealId(e.target.value)}
                placeholder="ESC-XXXX-XXXX"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-white/10 bg-zinc-900/60 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyber-blue/60 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/30 flex items-center justify-center hover:bg-blue-900/60 transition-colors text-cyber-blue cursor-pointer"
                aria-label="Verify ID"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>

            {/* Sandbox Feedback States */}
            {verificationStatus === "verifying" && (
              <p className="font-mono text-[9px] text-yellow-500 flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
                VERIFYING KEYS & LEDGER STATE...
              </p>
            )}
            
            {verificationStatus === "success" && (
              <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/30 font-mono text-[10px] text-green-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  LEDGER MUTEX LOCKED [SECURE]
                </div>
                <p className="text-[9px] opacity-75">Hash: 8b4a...f30d // Balance: $14,500.00 USD</p>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 font-mono text-[10px] text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                LEDGER NOT FOUND OR CORRUPTED KEYS
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom Metadata and Socials */}
      <div className="relative max-w-6xl w-full mx-auto z-10 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
        
        {/* Live Network Operational indicator */}
        <div className="flex items-center gap-5 text-white/40">
          <p>© {new Date().getFullYear()} escrowz.lol. All rights reserved.</p>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Network Online
            </span>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex gap-6 text-white/50">
          <a href="#hero" className="hover:text-white transition-colors">Terminals</a>
          <a href="#hero" className="hover:text-white transition-colors">Privacy Shield</a>
          <a href="#hero" className="hover:text-white transition-colors">Audit logs</a>
        </div>

        {/* Discord/X Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-white/60 hover:text-cyber-blue hover:border-cyber-blue/40 transition-all hover:scale-105"
            aria-label="X (Twitter)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-white/60 hover:text-cyber-blue hover:border-cyber-blue/40 transition-all hover:scale-105"
            aria-label="Discord"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-white/60 hover:text-cyber-blue hover:border-cyber-blue/40 transition-all hover:scale-105"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
