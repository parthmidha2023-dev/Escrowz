"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, MessageSquare, Scale, Activity, ArrowUpRight } from "lucide-react";

export default function Features() {
  const featuresList = [
    {
      title: "Secure Escrow",
      desc: "Funds are locked in a cold-storage multi-signature smart vault. Released only when both parties cryptographically sign off or verification criteria are fully met.",
      tech: "[ PROTOCOL: MULTI-SIG ]",
      detail: "Cold vault storage, time-locked release",
      icon: Shield,
      glowColor: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
      iconGlow: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    {
      title: "Encrypted Chat",
      desc: "Conduct deals through a high-security peer-to-peer messaging channel. Complete with end-to-end encryption so agreement changes and files are never exposed.",
      tech: "[ CIPHER: AES-GCM-256 ]",
      detail: "Zero-knowledge storage, direct peer connection",
      icon: MessageSquare,
      glowColor: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
      iconGlow: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Dispute Protection",
      desc: "Encounter an issue? Seamlessly invoke neutral, peer-reviewed arbitrators who verify cryptographically-signed audit logs to resolve conflicts fairly and quickly.",
      tech: "[ RESOLUTION: DUAL-KEY ]",
      detail: "Expert-led review, verifiable state logs",
      icon: Scale,
      glowColor: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      iconGlow: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    {
      title: "Instant Deal Tracking",
      desc: "Track the transaction lifecycle in real-time. Dynamic webhooks, email alerts, and live event ledgers notify both parties of any status updates instantly.",
      tech: "[ STATE: WEBSOCKET-LIVE ]",
      detail: "Millisecond syncing, ledger status indicators",
      icon: Activity,
      glowColor: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      iconGlow: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="features" className="relative py-24 px-4 md:px-8 bg-zinc-950 overflow-hidden">
      {/* Background Decorative Mesh grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/20 font-mono text-[10px] tracking-widest text-cyber-blue uppercase"
          >
            <span>Platform Core</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Cryptographic Safety. <br />
            <span className="text-white/50">For Every Transaction.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto"
          >
            We deploy multiple layers of industry-leading fintech security and cryptographic frameworks to keep your transactions completely bulletproof.
          </motion.p>
        </div>

        {/* Features Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {featuresList.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group relative overflow-hidden glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 bg-zinc-950/60 transition-all duration-300 hover:scale-[1.01] hover:bg-zinc-900/40 cursor-default"
              >
                {/* Glow border overlays */}
                <div className={`absolute inset-0 border border-transparent rounded-2xl transition-all duration-500 ${item.glowColor}`} />

                {/* Top visual detail */}
                <div className="flex justify-between items-start mb-6">
                  {/* Glowing Icon Wrapper */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${item.iconGlow} group-hover:scale-105`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  {/* Code Block Label */}
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40">
                    {item.tech}
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 group-hover:text-cyber-blue transition-colors">
                    {item.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-cyber-blue" />
                  </h3>
                  
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Technical Detail */}
                <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[9.5px] text-white/30 tracking-wide uppercase">
                    Specs: {item.detail}
                  </span>
                  
                  {/* Aesthetic pulse green connection indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[8px] font-bold text-emerald-400 tracking-widest uppercase">Secure</span>
                  </div>
                </div>

                {/* Cyber style neon accent line at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
