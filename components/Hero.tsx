"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight, ShieldCheck, Cpu, Key, Lock, Layers, Unlock, RefreshCw, Check, Shield } from "lucide-react";

export default function Hero() {
  const [dealActive, setDealActive] = useState(false);
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

        {/* Right Column: Interactive 3D Tilting Escrow Card Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 w-full flex justify-center perspective-[1000px]"
        >
          <InteractiveTiltCard />
        </motion.div>
      </div>
    </section>
  );
}

function InteractiveTiltCard() {
  const [dealStep, setDealStep] = useState(0); // 0 = deposit, 1 = secure, 2 = release
  const [dealIndex, setDealIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const mockDeals = [
    { 
      amount: "4,273", 
      currency: "USDC", 
      chain: "USD Coin (ETH) Escrow", 
      usd: "$4.3k USD", 
      logo: "escrow.", 
      color: "#00f5a0",
      bgBadge: "bg-[#00f5a0]/10 border-[#00f5a0]/25 text-[#00f5a0]",
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5">
          <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#2775CA"/>
          <path d="M12 4.625c-4.068 0-7.375 3.307-7.375 7.375S7.932 19.375 12 19.375 19.375 16.068 19.375 12 16.068 4.625 12 4.625zm0 13.063c-3.136 0-5.688-2.551-5.688-5.688S8.864 6.313 12 6.313c3.136 0 5.688 2.551 5.688 5.688S15.136 17.688 12 17.688z" fill="#FFF"/>
          <path d="M12.923 8.303a2.535 2.535 0 0 0-1.846 0 1.054 1.054 0 0 0-.663 1.025c0 .77.625 1.106 1.846 1.346a3.612 3.612 0 0 1 2.22 1.353 2.766 2.766 0 0 1 .533 1.674c0 1.636-1.106 2.503-2.753 2.8v1.171h-1.3v-1.157a3.805 3.805 0 0 1-2.22-.843l.872-1.027c.6.48 1.04.707 1.554.707.973 0 1.547-.467 1.547-1.127 0-.753-.526-1.087-1.747-1.326-1.36-.26-2.32-.8-2.32-2.18 0-1.28.847-2.193 2.52-2.487v-1.164h1.3v1.164a2.913 2.913 0 0 1 1.95.733l-.74 1.141z" fill="#FFF"/>
        </svg>
      )
    },
    { 
      amount: "1.842", 
      currency: "ETH", 
      chain: "Ethereum (Base) Escrow", 
      usd: "$6,240 USD", 
      logo: "ether.", 
      color: "#a0b0ff",
      bgBadge: "bg-[#a0b0ff]/10 border-[#a0b0ff]/25 text-[#a0b0ff]",
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5">
          <g fill="#FFF">
            <path d="M12 0L3.5 14 12 19.5 20.5 14 12 0z" fillOpacity=".6"/>
            <path d="M12 0L12 19.5 20.5 14 12 0z" fillOpacity=".85"/>
            <path d="M12 19.5L3.5 14 12 24l0-4.5z" fillOpacity=".6"/>
            <path d="M12 24l8.5-10L12 19.5 12 24z" fillOpacity=".85"/>
          </g>
        </svg>
      )
    },
    { 
      amount: "0.245", 
      currency: "BTC", 
      chain: "Bitcoin (Mainnet) Escrow", 
      usd: "$22,500 USD", 
      logo: "bitco.", 
      color: "#f7931a",
      bgBadge: "bg-[#f7931a]/10 border-[#f7931a]/25 text-[#f7931a]",
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5">
          <circle cx="12" cy="12" r="12" fill="#F7931A"/>
          <path d="M16.662 10.15c.254-1.7-.514-2.614-2.4-3.224l.49-1.966-1.196-.3-.478 1.916c-.314-.078-.64-.15-.96-.22l.482-1.928-1.196-.298-.49 1.964c-.26-.06-.52-.118-.772-.178l.002-.007-1.65-.412-.318 1.276s.888.204.87.216c.485.12.573.44.558.694l-.56 2.24c.034.008.077.02.12.034l-.12-.03-.783 3.136c-.06.147-.208.368-.544.284.012.016-.87-.216-.87-.216L6.96 15.65l.312 1.253 1.554.388c.29.072.573.15.85.23l-.49 1.97 1.197.3.49-1.966c.327.09.643.175.952.257l-.488 1.954 1.196.3.49-1.963c2.043.387 3.58.23 4.225-1.614.52-1.486-.025-2.343-1.1-2.905.783-.18 1.373-.695 1.53-1.755zm-2.73 4.88c-.37 1.488-2.875.683-3.687.48l.658-2.64c.813.203 3.4.606 3.03 2.16zm.372-4.9c-.337 1.353-2.425.666-3.1.5l.6-2.4c.67.167 2.837.478 2.5 1.9z" fill="#FFF"/>
        </svg>
      )
    },
    { 
      amount: "125.8", 
      currency: "SOL", 
      chain: "Solana (Native) Escrow", 
      usd: "$18,250 USD", 
      logo: "solan.", 
      color: "#14f195",
      bgBadge: "bg-[#14f195]/10 border-[#14f195]/25 text-[#14f195]",
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5">
          <defs>
            <linearGradient id="solG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFA3"/>
              <stop offset="50%" stopColor="#DC1FFF"/>
              <stop offset="100%" stopColor="#3E2723"/>
            </linearGradient>
          </defs>
          <path d="M4.3 16.5h15.4l-4.1 4.1H.2l4.1-4.1zm15.4-9h-15.4L.2 11.6h15.4l4.1-4.1zm-4.1-9H.2l4.1-4.1h15.4l-4.1 4.1z" fill="url(#solG)"/>
        </svg>
      )
    },
    { 
      amount: "8,950", 
      currency: "USDT", 
      chain: "Tether (Arbitrum) Escrow", 
      usd: "$8,950 USD", 
      logo: "tethe.", 
      color: "#26a17b",
      bgBadge: "bg-[#26a17b]/10 border-[#26a17b]/25 text-[#26a17b]",
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5">
          <circle cx="12" cy="12" r="12" fill="#26A17B"/>
          <path d="M12.75 8v1.75h3v1.5h-3v4.75c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25V11.25H7.25v-1.5h3V8h-4.5V6h11.5v2h-4.5z" fill="#FFF"/>
        </svg>
      )
    }
  ];

  const currentDeal = mockDeals[dealIndex];

  // Automated Transaction Lifecycle loop
  useEffect(() => {
    const timer = setInterval(() => {
      setDealStep((prevStep) => {
        if (prevStep === 2) {
          // Complete. Advance to the next deal asset and reset stepper
          setDealIndex((prevIdx) => (prevIdx + 1) % mockDeals.length);
          return 0;
        }
        return prevStep + 1;
      });
    }, 3200); // advances checkpoint stage every 3.2 seconds

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const percentX = (x / box.width) * 100;
    const percentY = (y / box.height) * 100;
    
    const rotX = -((y - box.height / 2) / (box.height / 2)) * 12;
    const rotY = ((x - box.width / 2) / (box.width / 2)) * 12;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setGlareX(percentX);
    setGlareY(percentY);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Manual trigger reset/cycle on click
  const handleManualClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDealStep((prevStep) => {
      if (prevStep === 2) {
        setDealIndex((prevIdx) => (prevIdx + 1) % mockDeals.length);
        return 0;
      }
      return prevStep + 1;
    });
  };

  const stepsInfo = [
    {
      statusText: `Confirming ${currentDeal.currency}...`,
      statusColor: "text-amber-500 border-amber-500/30 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.06)] hover:border-amber-500/50",
      progressWidth: "w-1/3",
      icon: RefreshCw,
      iconClass: "animate-spin text-amber-500",
    },
    {
      statusText: "Securing Vault...",
      statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.06)] hover:border-cyan-500/50",
      progressWidth: "w-2/3",
      icon: RefreshCw,
      iconClass: "animate-spin text-cyan-400",
    },
    {
      statusText: "Agreement Released",
      statusColor: `border-transparent bg-zinc-900/60 hover:border-white/10`,
      progressWidth: "w-full",
      icon: Check,
      iconClass: "scale-110",
    },
  ];

  const currentStep = stepsInfo[dealStep];
  const StepIcon = currentStep.icon;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleManualClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.025 : 1})`,
        transition: isHovered ? "transform 0.05s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="w-full max-w-[380px] bg-[#0b0c10] border border-white/5 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden select-none cursor-pointer group transition-all duration-300"
    >
      {/* Dynamic glare highlight */}
      <div
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {/* Reactive brand badge */}
          <div 
            style={{ borderColor: dealStep === 2 ? currentDeal.color + "40" : undefined }}
            className={`w-11 h-11 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 ${currentDeal.bgBadge}`}
          >
            <span className="font-sans font-extrabold text-[11px] tracking-tight">{currentDeal.logo}</span>
            <div 
              style={{ background: `linear-gradient(to top, ${currentDeal.color}20, transparent)` }} 
              className="absolute inset-0 pointer-events-none" 
            />
          </div>
          <div>
            <h4 className="font-sans font-bold text-white text-[15px] tracking-tight leading-none">Live Escrow</h4>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1 block">esc1...fugh</span>
          </div>
        </div>

        {/* Dynamic active dot */}
        <div className="relative flex items-center justify-center w-4 h-4">
          <span 
            style={{ backgroundColor: dealStep === 2 ? currentDeal.color : "#f59e0b" }}
            className="absolute w-2 h-2 rounded-full animate-ping opacity-40 transition-colors duration-500" 
          />
          <span 
            style={{ 
              backgroundColor: dealStep === 2 ? currentDeal.color : "#f59e0b",
              boxShadow: `0 0 12px ${dealStep === 2 ? currentDeal.color : "#f59e0b"}` 
            }}
            className="w-2.5 h-2.5 rounded-full transition-all duration-500" 
          />
        </div>
      </div>

      {/* Giant Balance Visualizer */}
      <div className="text-center space-y-1 mb-8">
        <motion.h3 
          key={currentDeal.currency}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-white flex items-baseline justify-center gap-1.5"
        >
          {currentDeal.amount}
          <span className="text-[20px] font-bold text-white/90">{currentDeal.currency}</span>
        </motion.h3>
        <p className="text-white/40 text-xs font-mono font-medium tracking-wide">{currentDeal.usd}</p>
        
        {/* Dynamic Asset Info Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111622] border border-blue-500/10 mt-4">
          <div 
            style={{ backgroundColor: dealStep === 2 ? currentDeal.color : "#3b82f6" }}
            className="w-4.5 h-4.5 rounded-full flex items-center justify-center transition-colors duration-500"
          >
            {currentDeal.renderIcon()}
          </div>
          <span className="font-sans text-[11px] font-semibold text-white/80 tracking-wide">{currentDeal.chain}</span>
        </div>
      </div>

      {/* Dynamic Status Button */}
      <div className="mb-8">
        <div 
          style={{ 
            color: dealStep === 2 ? currentDeal.color : undefined,
            borderColor: dealStep === 2 ? currentDeal.color + "40" : undefined,
            boxShadow: dealStep === 2 ? `0 0 15px ${currentDeal.color}15` : undefined
          }}
          className={`w-full py-3.5 border rounded-2xl flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-500 ${currentStep.statusColor}`}
        >
          <StepIcon className={`w-4 h-4 ${currentStep.iconClass}`} />
          <span>{currentStep.statusText}</span>
        </div>
      </div>

      {/* Horizontal Stepper */}
      <div className="space-y-3 mb-4">
        {/* Stepper bar base */}
        <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div 
            style={{ 
              background: `linear-gradient(to right, #10b981, ${currentDeal.color})`
            }}
            className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ease-out h-full ${currentStep.progressWidth}`} 
          />
        </div>

        {/* Step labels */}
        <div className="flex justify-between font-mono text-[9px] font-bold tracking-widest">
          <span className={dealStep >= 0 ? "text-emerald-400 transition-colors duration-300" : "text-white/20 transition-colors"}>
            DEPOSIT
          </span>
          <span 
            style={{ color: dealStep >= 1 ? currentDeal.color : undefined }}
            className={dealStep >= 1 ? "transition-colors duration-300" : "text-white/20 transition-colors"}
          >
            SECURE
          </span>
          <span 
            style={{ color: dealStep >= 2 ? currentDeal.color : undefined }}
            className={dealStep >= 2 ? "transition-colors duration-300" : "text-white/20 transition-colors"}
          >
            RELEASE
          </span>
        </div>
      </div>

      {/* Footer details line */}
      <div className="pt-5 border-t border-white/5 flex items-center justify-between text-white/35 font-mono text-[10px]">
        <div className="flex items-center gap-1.5">
          <Shield 
            style={{ color: dealStep === 2 ? currentDeal.color : "#10b981" }}
            className="w-3.5 h-3.5 transition-colors duration-500" 
          />
          <span className="font-sans font-semibold tracking-wide text-white/50">Escrowz Secured</span>
        </div>
        {dealStep === 2 ? (
          <Unlock 
            style={{ color: currentDeal.color }}
            className="w-3.5 h-3.5 animate-pulse transition-colors duration-500" 
          />
        ) : (
          <Lock className="w-3.5 h-3.5 text-white/40" />
        )}
      </div>

      {/* Decorative vectors */}
      <div className="absolute top-0 right-1/4 w-[1px] h-10 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-10 h-[1px] bg-gradient-to-r from-transparent to-blue-500/10 pointer-events-none" />
    </div>
  );
}
