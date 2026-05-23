"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Server, Cpu, Database, Eye } from "lucide-react";

export default function Stats() {
  const [liveTransactions, setLiveTransactions] = useState<Array<{ id: string; val: string; type: string }>>([
    { id: "TX-4029", val: "$1,250", type: "GAMING" },
    { id: "TX-9910", val: "$22,400", type: "CRYPTO" },
    { id: "TX-3122", val: "$4,500", type: "WORK" },
  ]);

  // Simulate a live transaction ticker to show that the system is fully active
  useEffect(() => {
    const interval = setInterval(() => {
      const ids = ["TX-8802", "TX-1094", "TX-5531", "TX-7740", "TX-9102"];
      const vals = ["$350.00", "$14,500.00", "$8,200.00", "$1,950.00", "$28,000.00"];
      const types = ["GAMING", "CRYPTO", "WORK", "DIGITAL", "CRYPTO"];
      
      const randomIndex = Math.floor(Math.random() * ids.length);
      
      setLiveTransactions(prev => [
        { id: ids[randomIndex], val: vals[randomIndex], type: types[randomIndex] },
        prev[0],
        prev[1],
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const statsList = [
    {
      label: "TOTAL FUNDS SECURED",
      value: "$42,891,402",
      suffix: "+",
      icon: ShieldCheck,
      details: "No leakage, zero capital risk history",
      status: "SECURED VAULTS",
      color: "text-blue-400 text-glow-electric",
    },
    {
      label: "ACTIVE CRYPTO NODES",
      value: "120,402",
      suffix: "+",
      icon: Server,
      details: "E2E P2P network handshakes",
      status: "NODES: ACTIVE",
      color: "text-cyan-400 text-glow-blue",
    },
    {
      label: "DEALS COMPLETED",
      value: "502,890",
      suffix: "+",
      icon: Cpu,
      details: "Automatic escrow resolutions",
      status: "VERIFIED SIGNATURES",
      color: "text-purple-400 text-glow-electric",
    },
  ];

  return (
    <section id="stats" className="relative py-24 px-4 md:px-8 bg-zinc-950 overflow-hidden">
      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      
      {/* Radar sweep lines effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse" />
      
      <div className="relative max-w-6xl w-full mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Big statistics cards */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/20 font-mono text-[10px] tracking-widest text-cyber-blue uppercase">
              <span>Network Statistics</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Secured Ledger. <br />
              <span className="text-white/50">Verified Live Data.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsList.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-panel rounded-2xl p-5 border border-white/5 bg-zinc-950/70 hover:border-blue-500/20 transition-colors cursor-default"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                      {stat.status}
                    </span>
                    <StatIcon className="w-4 h-4 text-white/30" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className={`text-2xl sm:text-3xl font-mono font-extrabold tracking-tight ${stat.color}`}>
                      {stat.value}
                      <span className="text-white/60 font-sans">{stat.suffix}</span>
                    </p>
                    <p className="font-mono text-[10px] text-white/80 font-bold uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>

                  <p className="text-[10px] text-white/40 mt-3 pt-3 border-t border-white/5">
                    {stat.details}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Simulated Network Ledger Feed */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 w-full"
        >
          <div className="glass-panel rounded-2xl p-5 border border-blue-500/20 bg-zinc-950/80 shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Ambient Sweep Line */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent top-0 animate-[radar-sweep_5s_linear_infinite]" />
            
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyber-blue animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-white tracking-widest uppercase">Live Deal Ledger</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                <span className="font-mono text-[8px] font-bold text-emerald-400 uppercase">SYNCED</span>
              </div>
            </div>

            <div className="space-y-3">
              {liveTransactions.map((tx, idx) => (
                <motion.div
                  key={`${tx.id}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                    <div>
                      <span className="font-mono text-[10px] font-bold text-white">{tx.id}</span>
                      <span className="font-mono text-[9px] text-white/30 uppercase block font-light tracking-wide">{tx.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-cyber-blue text-glow-blue">{tx.val}</span>
                    <span className="font-mono text-[8px] text-emerald-400 block uppercase font-bold tracking-widest mt-0.5">LOCKED</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[8.5px] text-white/30">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-white/30" />
                INTEGRITY: SHA-512
              </span>
              <span>LATENCY: 14MS</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Embedded CSS for custom keyframes radar sweep */}
      <style jsx global>{`
        @keyframes radar-sweep {
          0% {
            top: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
