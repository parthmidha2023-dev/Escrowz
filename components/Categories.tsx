"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, Coins, Briefcase, Globe, CheckCircle2, ChevronRight } from "lucide-react";

export default function Categories() {
  const categoriesList = [
    {
      title: "Gaming Accounts",
      icon: Gamepad2,
      tag: "HIGH VALUE DIGITAL ITEMS",
      items: ["Steam & Epic Games Accounts", "Valorant & League Profiles", "Rare CS2 Skins & Knives", "Clash of Clans & Mobile Assets"],
      metrics: { pool: "$1.4M+", time: "~4 Mins", active: "1,240 Deals" },
      glow: "hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]",
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      bgAccent: "from-blue-600/10 via-transparent to-transparent",
    },
    {
      title: "Crypto Trades",
      icon: Coins,
      tag: "DECENTRALIZED ASSETS",
      items: ["OTC Token Agreements", "Rare NFTs & Digital Art", "Cross-Chain Asset Swaps", "Custom ERC-20 Escrow Vaults"],
      metrics: { pool: "$8.9M+", time: "<1 Min", active: "4,820 Deals" },
      glow: "hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]",
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      bgAccent: "from-cyan-600/10 via-transparent to-transparent",
    },
    {
      title: "Freelance Work",
      icon: Briefcase,
      tag: "CONTRACTS & MILESTONES",
      items: ["Software & App Development", "UI/UX & Branding Assets", "Copywriting & Marketing Campaigns", "Consulting & Long-Term Agreements"],
      metrics: { pool: "$3.1M+", time: "Custom", active: "910 Deals" },
      glow: "hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]",
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      bgAccent: "from-indigo-600/10 via-transparent to-transparent",
    },
    {
      title: "Digital Products",
      icon: Globe,
      tag: "IP & DOMAIN PORTABILITY",
      items: ["Premium Web Domains & DNS", "SaaS Licensing Codes", "Social Handles & Premium Usernames", "Proprietary Source Code Repos"],
      metrics: { pool: "$5.6M+", time: "~15 Mins", active: "2,350 Deals" },
      glow: "hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]",
      iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      bgAccent: "from-purple-600/10 via-transparent to-transparent",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="categories" className="relative py-24 px-4 md:px-8 bg-zinc-950/40 overflow-hidden">
      {/* Aesthetic glowing backdrop grids */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-l from-blue-500/5 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-cyber-blue/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-950/20 font-mono text-[10px] tracking-widest text-cyber-blue uppercase">
              <span>Supported Sectors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Endless Transaction <br />
              <span className="bg-gradient-to-r from-electric-blue to-cyber-blue bg-clip-text text-transparent text-glow-electric">Versatility.</span>
            </h2>
          </div>
          
          <p className="text-white/50 text-sm sm:text-base font-light max-w-md md:text-right">
            Whether swapping rare digital armor, milestone contracts, or domain portfolios, escrowz.lol delivers customized multi-signature lockboxes for complete escrow precision.
          </p>
        </div>

        {/* Categories Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {categoriesList.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className={`group relative overflow-hidden glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 bg-zinc-950/80 transition-all duration-500 cursor-default ${category.glow}`}
              >
                {/* Accent Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  {/* Category Title info */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] tracking-wider text-cyber-blue font-bold uppercase">
                      // {category.tag}
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-cyber-blue transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  {/* Icon Box */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border self-start transition-all duration-500 group-hover:scale-110 shadow-lg ${category.iconColor}`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                </div>

                {/* Popular Traded Items List */}
                <div className="space-y-3 mb-8 relative z-10">
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Supported Agreements</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyber-blue/70 flex-shrink-0" />
                        <span className="truncate group-hover:text-white/80 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Metric Indicators Footer */}
                <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4 relative z-10">
                  <div className="bg-zinc-900/20 border border-white/5 rounded-lg p-2.5 text-center">
                    <p className="font-mono text-[8px] text-white/30 uppercase">Volume Protected</p>
                    <p className="font-mono text-xs text-white font-bold mt-0.5">{category.metrics.pool}</p>
                  </div>
                  <div className="bg-zinc-900/20 border border-white/5 rounded-lg p-2.5 text-center">
                    <p className="font-mono text-[8px] text-white/30 uppercase">Verification Speed</p>
                    <p className="font-mono text-xs text-cyber-blue font-bold mt-0.5">{category.metrics.time}</p>
                  </div>
                  <div className="bg-zinc-900/20 border border-white/5 rounded-lg p-2.5 text-center">
                    <p className="font-mono text-[8px] text-white/30 uppercase">Active Safe Pools</p>
                    <p className="font-mono text-xs text-white font-bold mt-0.5">{category.metrics.active}</p>
                  </div>
                </div>

                {/* Interactive Action Detail */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <ChevronRight className="w-4 h-4 text-cyber-blue" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
