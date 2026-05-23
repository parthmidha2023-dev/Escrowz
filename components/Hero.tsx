"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight, ShieldCheck, Cpu, Key, Lock, Layers } from "lucide-react";

export default function Hero() {
  const [dealStep, setDealStep] = useState(0);

  const steps = [
    { title: "INITIALIZE", desc: "Contract created with buyer & seller keys", icon: Key },
    { title: "DEPOSIT", desc: "Funds locked in multisig security vault", icon: Lock },
    { title: "VERIFY", desc: "Digital asset transferred and cryptographically audited", icon: Cpu },
    { title: "RELEASE", desc: "Dual signatures trigger instant payout", icon: ShieldCheck },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 md:px-8 overflow-hidden bg-cyber-grid"
    >
      {/* Absolute Ambient Drifting Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-blue-600/10 blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-cyber-blue/10 blur-[100px] sm:blur-[150px] pointer-events-none" />

      {/* Floating Animated Cyber Orb */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-10 w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/0 blur-[80px] pointer-events-none"
      />

      <div className="relative max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        
        {/* Left Column: Heading and Description */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-8">
          {/* Cyber Trust Shield Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-950/20 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse shadow-[0_0_10px_#00f0ff]" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-cyber-blue uppercase">
              V4.1 Protocol Active
            </span>
          </motion.div>

          {/* Main Giant Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Zero-Trust Escrow. <br />
              <span className="text-white">
                Absolute Protection.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl"
            >
              Secure gaming accounts, high-value crypto swaps, freelance work, and premium digital products inside our multi-signature vault. Safe. E2E Encrypted. Unstoppable.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <a
              href="#features"
              className="group relative overflow-hidden rounded-xl px-8 py-4 flex items-center justify-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-widest bg-electric-blue transition-all shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Start a Deal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative group rounded-xl px-8 py-4 flex items-center justify-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-widest border border-white/10 hover:border-cyber-blue/50 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all backdrop-blur-sm"
            >
              <span>Learn More</span>
            </a>
          </motion.div>

          {/* Core Specs Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-6 pt-4 border-t border-white/5 font-mono text-[10px] sm:text-xs text-white/40"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span>E2E Chat Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Multi-Sig Vault</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full" />
              <span>Arbitration Enabled</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Original Checkpoints Ledger Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 w-full flex justify-center"
        >
          <div className="w-full max-w-[420px] glass-panel rounded-2xl p-6 border border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden bg-zinc-950/80">
            {/* Ambient terminal top bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5 font-mono text-[10px] text-white/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                </div>
                <span>LEDGER // ESC-4402</span>
              </div>
              <span className="text-cyber-blue">SYS.READY</span>
            </div>

            {/* Simulated Live Transaction Card */}
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-zinc-900/60 border border-white/5 p-3.5 rounded-xl">
                <div>
                  <p className="font-mono text-[9px] text-white/40 uppercase">Initiator</p>
                  <p className="font-mono text-xs text-white font-semibold">buyer_0x4f2d...b1</p>
                </div>
                <div className="h-6 w-[1px] bg-white/10" />
                <div className="text-right">
                  <p className="font-mono text-[9px] text-white/40 uppercase">Recipient</p>
                  <p className="font-mono text-xs text-white font-semibold">seller_valkyrie</p>
                </div>
              </div>

              {/* Secure Asset Details */}
              <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/50 font-mono">ASSET CODE:</span>
                  <span className="text-white font-mono font-medium">CS2_GLOVE_SAPPHIRE</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50 font-mono">LOCKED VAL:</span>
                  <span className="text-cyber-blue font-mono font-bold">$14,500.00 USD</span>
                </div>
              </div>

              {/* Custom interactive steps inside the dashboard */}
              <div className="space-y-3 py-2">
                <p className="font-mono text-[9.5px] text-white/30 uppercase tracking-widest">Protocol Checkpoints</p>
                <div className="space-y-2.5">
                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = dealStep === idx;
                    const isCompleted = dealStep > idx;

                    return (
                      <div
                        key={step.title}
                        onClick={() => setDealStep(idx)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isActive
                            ? "bg-blue-950/30 border-cyber-blue/70 shadow-[0_0_15px_rgba(0,240,255,0.08)]"
                            : isCompleted
                            ? "bg-zinc-900/20 border-green-500/20 opacity-60"
                            : "bg-zinc-900/10 border-white/5 opacity-40 hover:opacity-60"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-cyber-blue/20 text-cyber-blue"
                              : isCompleted
                              ? "bg-green-500/25 text-green-400"
                              : "bg-zinc-800 text-white/40"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] font-bold tracking-wider text-white">
                              {step.title}
                            </span>
                            {isCompleted && <span className="font-mono text-[9px] text-green-400 font-semibold uppercase">Done</span>}
                            {isActive && <span className="font-mono text-[9px] text-cyber-blue font-semibold animate-pulse uppercase">Active</span>}
                          </div>
                          <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Simulated Button to step through the deal */}
              <button
                onClick={() => setDealStep((prev) => (prev + 1) % 4)}
                className="w-full mt-2 py-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/40 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-cyber-blue transition-colors flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Cycle Ledger Status</span>
                <Layers className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* Glowing lines aesthetic around card */}
            <div className="absolute top-0 right-1/4 w-[1px] h-12 bg-gradient-to-b from-cyber-blue/60 to-transparent" />
            <div className="absolute bottom-0 left-1/4 w-12 h-[1px] bg-gradient-to-r from-transparent to-cyber-blue/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
