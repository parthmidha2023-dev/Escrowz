"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Key, Mail, Clock, LogOut, CheckCircle2,
  Terminal, Plus, Database, Star, ArrowRight, Search,
  DollarSign, AlertCircle, ShieldAlert, Coins, RefreshCw, X, AlertTriangle
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";
const PINK = "#ec4899";
const EMERALD = "#10b981";

interface Deal {
  id: string;
  title: string;
  role: "RECEIVABLE" | "PAYABLE";
  amount: string;
  usd: string;
  counterparty: string;
  status: string;
  step: number; // 1, 2, or 3
  color: string;
  isDisputed?: boolean;
}

const INITIAL_DEALS: Deal[] = [
  {
    id: "ESC-9021-X",
    title: "Premium OG Gaming Handle Exchange",
    role: "RECEIVABLE",
    amount: "0.142 BTC",
    usd: "$8,940",
    counterparty: "@hyper_node_01",
    status: "Funded & Vault Locked",
    step: 2,
    color: "#F7931A",
    isDisputed: false
  },
  {
    id: "ESC-4028-Y",
    title: "Solana Smart Contract Audit Deliverables",
    role: "PAYABLE",
    amount: "25.5 SOL",
    usd: "$3,500",
    counterparty: "@sol_dev_alpha",
    status: "Awaiting Buyer Release",
    step: 2,
    color: "#627EEA",
    isDisputed: false
  },
  {
    id: "ESC-1102-Z",
    title: "Elite Freelance Design Vector Assets",
    role: "RECEIVABLE",
    amount: "940.00 USD",
    usd: "$940",
    counterparty: "@design_vortex",
    status: "Vault Initialized / Awaiting Funding",
    step: 1,
    color: CYAN,
    isDisputed: false
  }
];

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [modalOpen, setModalOpen] = useState(false);
  const [dealTitle, setDealTitle] = useState("");
  const [dealRole, setDealRole] = useState<"RECEIVABLE" | "PAYABLE">("RECEIVABLE");
  const [dealCounterparty, setDealCounterparty] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [dealUsd, setDealUsd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<"ALL" | "RECEIVABLE" | "PAYABLE">("ALL");

  if (!isLoaded) {
    return (
      <div style={{ background: "#030408", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <span style={{ fontSize: 13, fontFamily: "var(--font-geist-mono), monospace", color: CYAN }}>LOADING ESCROW PROTOCOL</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: CYAN, animation: "pulse 0.6s infinite alternate" }} />
        </div>
      </div>
    );
  }

  // Double fallback in case Clerk is still mounting session but middleware allowed route through
  if (isLoaded && !isSignedIn) {
    window.location.href = "/signin";
    return null;
  }

  const primaryEmail = user?.emailAddresses[0]?.emailAddress || "N/A";
  const userUsername = user?.username || primaryEmail.split("@")[0];

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle || !dealCounterparty || !dealAmount || !dealUsd) return;

    const formattedUsd = dealUsd.startsWith("$") ? dealUsd : `$${dealUsd}`;

    const newDeal: Deal = {
      id: `ESC-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      title: dealTitle,
      role: dealRole,
      amount: dealAmount,
      usd: formattedUsd,
      counterparty: dealCounterparty.startsWith("@") ? dealCounterparty : `@${dealCounterparty}`,
      status: "Vault Initialized / Awaiting Funding",
      step: 1,
      color: dealRole === "RECEIVABLE" ? EMERALD : PINK,
      isDisputed: false
    };

    setDeals([newDeal, ...deals]);
    setModalOpen(false);
    setDealTitle("");
    setDealCounterparty("");
    setDealAmount("");
    setDealUsd("");
  };

  const handleAction = (id: string, currentStep: number) => {
    setDeals(prevDeals =>
      prevDeals.map(d => {
        if (d.id === id) {
          if (currentStep === 1) {
            return {
              ...d,
              step: 2,
              status: "Funded & Vault Locked"
            };
          } else if (currentStep === 2) {
            return {
              ...d,
              step: 3,
              status: "Vault Completed & Released"
            };
          }
        }
        return d;
      })
    );
  };

  const handleToggleDispute = (id: string) => {
    setDeals(prevDeals =>
      prevDeals.map(d => {
        if (d.id === id) {
          const newDisputed = !d.isDisputed;
          return {
            ...d,
            isDisputed: newDisputed,
            status: newDisputed 
              ? "Under Dispute / Arbitration" 
              : d.step === 1 
                ? "Vault Initialized / Awaiting Funding" 
                : d.step === 2 
                  ? "Funded & Vault Locked" 
                  : "Vault Completed & Released"
          };
        }
        return d;
      })
    );
  };

  // ── DYNAMIC STATISTICS CALCULATIONS ──
  const totalDeals = deals.length + 15; // 15 historical completed + live count
  const activeDeals = deals.filter(d => d.step < 3 && !d.isDisputed);
  const disputedDealsCount = deals.filter(d => d.isDisputed).length;

  const receivableTotal = deals
    .filter(d => d.role === "RECEIVABLE" && d.step < 3 && !d.isDisputed)
    .reduce((acc, d) => acc + parseFloat(d.usd.replace(/[^0-9.]/g, "") || "0"), 0);

  const payableTotal = deals
    .filter(d => d.role === "PAYABLE" && d.step < 3 && !d.isDisputed)
    .reduce((acc, d) => acc + parseFloat(d.usd.replace(/[^0-9.]/g, "") || "0"), 0);

  const filteredDeals = deals.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "ALL" ? true : d.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{
      background: "#030408",
      minHeight: "100vh",
      color: "#fff",
      padding: "120px 24px 80px",
      position: "relative",
      overflowX: "hidden",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>
      <Navbar />

      {/* Background cyber grid */}
      <div className="cyber-grid" style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }} />

      {/* Floating neon ambient backdrops */}
      <motion.div animate={{ x: [0, 25, -25, 0], y: [0, -25, 25, 0], scale: [1, 1.04, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-10%", right: "-10%", width: 600, height: 600,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none" }} />
      <motion.div animate={{ x: [0, -25, 25, 0], y: [0, 25, -25, 0], scale: [1, 0.96, 1.04, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 600, height: 600,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(0,240,255,0.05) 0%,transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* ── HEADER USER PANEL ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 50, height: 50, borderRadius: "50%",
              background: "#030408", border: `2px solid ${CYAN}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 15px rgba(0, 240, 255, 0.15)`, overflow: "hidden"
            }}>
              <img src={user?.imageUrl} alt="PFP" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: CYAN, letterSpacing: "0.1em" }}>
                SECURE CONSOLE // ACCESS ACTIVE
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>
                Welcome, @{userUsername}
              </h2>
            </div>
          </div>

          <SignOutButton redirectUrl="/signin">
            <button style={{
              background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: 10, padding: "10px 18px", color: "#f87171", fontSize: 12,
              fontFamily: "var(--font-geist-mono), monospace", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s"
            }}>
              <LogOut size={14} /> SIGN OUT PROTOCOL
            </button>
          </SignOutButton>
        </div>

        {/* ── 1. PREMIUM STATS BAR (5 Columns Below Nav/Greeting) ── */}
        <div className="stats-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginBottom: 32
        }}>
          {/* Stat 1: Total Deals */}
          <div className="glass stat-card" style={{ padding: "20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: BLUE }}>
              <Database size={14} />
              <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.08em" }}>TOTAL DEALS</span>
            </div>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{totalDeals}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>15 COMPLETED + {deals.length} ACTIVE</span>
          </div>

          {/* Stat 2: Active Deals */}
          <div className="glass stat-card" style={{ padding: "20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: CYAN }}>
              <RefreshCw size={14} style={{ animation: "spin 8s linear infinite" }} />
              <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.08em" }}>ACTIVE DEALS</span>
            </div>
            <span style={{ fontSize: 28, fontWeight: 900, color: CYAN }}>{activeDeals.length}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>AWAITING RELEASE</span>
          </div>

          {/* Stat 3: Amount in Escrow */}
          <div className="glass stat-card" style={{ padding: "20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: EMERALD }}>
              <Coins size={14} />
              <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.08em" }}>AMOUNT IN ESCROW</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: EMERALD }}>
                ${(receivableTotal + payableTotal).toLocaleString()}
              </span>
              <div style={{ display: "flex", gap: 6, fontSize: 9, fontFamily: "var(--font-geist-mono), monospace" }}>
                <span style={{ color: EMERALD }}>REC: ${receivableTotal.toLocaleString()}</span>
                <span style={{ color: "rgba(255,255,255,0.25)" }}>|</span>
                <span style={{ color: PINK }}>PAY: ${payableTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Stat 4: Disputed Deals */}
          <div className="glass stat-card" style={{ 
            padding: "20px", borderRadius: 16, 
            border: `1px solid ${disputedDealsCount > 0 ? "rgba(239, 68, 68, 0.25)" : "rgba(255,255,255,0.06)"}`, 
            display: "flex", flexDirection: "column", gap: 6, transition: "all 0.3s" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: disputedDealsCount > 0 ? "#f87171" : PINK }}>
              <ShieldAlert size={14} />
              <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.08em" }}>DISPUTED DEALS</span>
            </div>
            <span style={{ fontSize: 28, fontWeight: 900, color: disputedDealsCount > 0 ? "#f87171" : "#fff" }}>{disputedDealsCount}</span>
            <span style={{ fontSize: 10, color: disputedDealsCount > 0 ? "rgba(239, 68, 68, 0.6)" : "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>
              {disputedDealsCount > 0 ? "IN ARBITRATION" : "NO ACTIVE DISPUTES"}
            </span>
          </div>

          {/* Stat 5: Rating */}
          <div className="glass stat-card" style={{ padding: "20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#f59e0b" }}>
              <Star size={14} fill="#f59e0b" />
              <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.08em" }}>USER RATING</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>4.9</span>
              <div style={{ display: "inline-flex", gap: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill={i < 4 ? "#f59e0b" : "none"} stroke="#f59e0b" />
                ))}
              </div>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>OUT OF 5.0 STARS</span>
          </div>
        </div>

        {/* ── 2. GLOWING START DEAL ACTION BUTTON ── */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 40, marginTop: 10
        }}>
          <button 
            onClick={() => setModalOpen(true)} 
            className="start-deal-btn"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "16px 48px", borderRadius: 14,
              background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`, color: "#030408", border: "none", cursor: "pointer",
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 14, fontWeight: 900, letterSpacing: "0.12em",
              textTransform: "uppercase", boxShadow: `0 0 25px rgba(0, 240, 255, 0.25)`, transition: "all 0.3s ease",
              position: "relative"
            }}
          >
            <Plus size={18} strokeWidth={3} /> Start A New Deal
          </button>
        </div>

        {/* ── 3. ACTIVE DEALS LEDGER LIST ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>
                Active Escrow Lockboxes
              </h3>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-geist-mono), monospace" }}>
                MONITORING LIVE VAULT NODES
              </span>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>
                  <Search size={14} />
                </span>
                <input type="text" placeholder="Search Vaults..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{
                  padding: "8px 12px 8px 34px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10, color: "#fff", fontSize: 12, outline: "none", width: 180, fontFamily: "var(--font-geist-sans), sans-serif",
                }} />
              </div>

              <select value={filterRole} onChange={(e: any) => setFilterRole(e.target.value)} style={{
                padding: "8px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, color: "#fff", fontSize: 12, outline: "none", cursor: "pointer", fontFamily: "var(--font-geist-sans), sans-serif",
              }}>
                <option value="ALL">All Roles</option>
                <option value="RECEIVABLE">Receivable</option>
                <option value="PAYABLE">Payable</option>
              </select>
            </div>
          </div>

          {/* Deals Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filteredDeals.length === 0 ? (
              <div className="glass" style={{ padding: "40px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
                <AlertCircle size={24} color="rgba(255,255,255,0.2)" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>
                  NO LIVE ESCROWS FOUND ON THIS NODE
                </p>
              </div>
            ) : (
              filteredDeals.map((d) => (
                <div key={d.id} className="glass deal-card" style={{
                  padding: "24px", borderRadius: 20, 
                  border: d.isDisputed 
                    ? "1px solid rgba(239, 68, 68, 0.25)" 
                    : d.step === 3 
                      ? "1px solid rgba(16, 185, 129, 0.2)"
                      : "1px solid rgba(255,255,255,0.05)",
                  display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
                  transition: "all 0.3s ease",
                  background: d.isDisputed 
                    ? "radial-gradient(circle at top right, rgba(239,68,68,0.03) 0%, rgba(255,255,255,0.01) 100%)" 
                    : "rgba(255, 255, 255, 0.01)"
                }}
                >
                  {/* Left Column: Deal description */}
                  <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontFamily: "var(--font-geist-mono), monospace", color: d.isDisputed ? "#f87171" : CYAN, fontWeight: 700 }}>
                        {d.id}
                      </span>
                      <span style={{
                        fontSize: 8, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 900,
                        padding: "2px 6px", borderRadius: 4,
                        background: d.role === "RECEIVABLE" ? "rgba(16,185,129,0.08)" : "rgba(236,72,153,0.08)",
                        color: d.role === "RECEIVABLE" ? EMERALD : PINK,
                        border: `1px solid ${d.role === "RECEIVABLE" ? "rgba(16,185,129,0.2)" : "rgba(236,72,153,0.2)"}`,
                      }}>{d.role}</span>
                      
                      {d.isDisputed && (
                        <span style={{
                          fontSize: 8, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 900,
                          padding: "2px 6px", borderRadius: 4,
                          background: "rgba(239, 68, 68, 0.15)",
                          color: "#f87171",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                        }}>DISPUTED</span>
                      )}
                    </div>

                    <h4 style={{ fontSize: 16, fontWeight: 800, color: d.isDisputed ? "#f87171" : "#fff", margin: 0, transition: "color 0.2s" }}>
                      {d.title}
                    </h4>

                    <div style={{ display: "flex", gap: 16, color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
                      <span>Counterparty: <strong style={{ color: "#fff" }}>{d.counterparty}</strong></span>
                      <span>•</span>
                      <span>Value: <strong style={{ color: d.isDisputed ? "#f87171" : d.color }}>{d.amount}</strong> ({d.usd})</span>
                    </div>
                  </div>

                  {/* Center Column: Status tracker */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 180 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: "50%", 
                        background: d.isDisputed ? "#ef4444" : d.step === 3 ? EMERALD : d.step === 2 ? "#f59e0b" : CYAN 
                      }} />
                      <span style={{ 
                        fontSize: 11, 
                        fontFamily: "var(--font-geist-mono), monospace", 
                        color: d.isDisputed ? "#f87171" : "#fff", 
                        fontWeight: 600 
                      }}>
                        {d.status}
                      </span>
                    </div>
                    {/* Visual step indicator */}
                    <div style={{ display: "flex", gap: 4, width: "100%", height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ flex: 1, background: d.isDisputed ? "#ef4444" : d.color, opacity: d.step >= 1 ? 1 : 0.1 }} />
                      <div style={{ flex: 1, background: d.isDisputed ? "#ef4444" : d.color, opacity: d.step >= 2 ? 1 : 0.1 }} />
                      <div style={{ flex: 1, background: d.isDisputed ? "#ef4444" : d.color, opacity: d.step >= 3 ? 1 : 0.1 }} />
                    </div>
                  </div>

                  {/* Right Column: Interaction Action Buttons */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {/* Main action button */}
                    <button 
                      onClick={() => !d.isDisputed && handleAction(d.id, d.step)} 
                      disabled={d.step === 3 || d.isDisputed}
                      style={{
                        padding: "10px 20px", borderRadius: 10,
                        background: d.step === 3 ? "rgba(16, 185, 129, 0.05)" : "rgba(255,255,255,0.02)", 
                        color: d.step === 3 ? EMERALD : d.isDisputed ? "rgba(255,255,255,0.15)" : "#fff",
                        border: d.step === 3 
                          ? `1px solid rgba(16, 185, 129, 0.2)` 
                          : `1px solid ${d.isDisputed ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)"}`, 
                        fontSize: 12,
                        fontFamily: "var(--font-geist-mono), monospace", fontWeight: 700,
                        cursor: d.step === 3 || d.isDisputed ? "not-allowed" : "pointer", 
                        display: "inline-flex", alignItems: "center", gap: 6,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        if (d.step !== 3 && !d.isDisputed) {
                          e.currentTarget.style.borderColor = d.color; 
                          e.currentTarget.style.background = `${d.color}08`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (d.step !== 3 && !d.isDisputed) {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; 
                          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        }
                      }}
                    >
                      {d.step === 1 ? "Fund Vault" : d.step === 2 ? "Release Escrow" : "Vault Completed"} 
                      {d.step !== 3 && <ArrowRight size={13} />}
                    </button>

                    {/* Dispute toggle button */}
                    {d.step < 3 && (
                      <button 
                        onClick={() => handleToggleDispute(d.id)} 
                        style={{
                          padding: "10px", borderRadius: 10,
                          background: d.isDisputed ? "rgba(239, 68, 68, 0.12)" : "rgba(255,255,255,0.02)",
                          color: d.isDisputed ? "#f87171" : "rgba(255,255,255,0.4)",
                          border: `1px solid ${d.isDisputed ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.08)"}`,
                          cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s"
                        }}
                        title={d.isDisputed ? "Resolve Dispute" : "Raise Dispute / File Complaint"}
                        onMouseEnter={(e) => {
                          if (!d.isDisputed) {
                            e.currentTarget.style.color = "#f87171";
                            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.35)";
                            e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
                          } else {
                            e.currentTarget.style.background = "rgba(239, 68, 68, 0.18)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!d.isDisputed) {
                            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                          } else {
                            e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
                          }
                        }}
                      >
                        <ShieldAlert size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* ── CREATE NEW DEAL MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px", background: "rgba(3,4,8,0.85)", backdropFilter: "blur(8px)"
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="glass"
              style={{
                width: "100%", maxWidth: 500, borderRadius: 20, padding: "32px",
                border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
                position: "relative"
              }}
            >
              <button onClick={() => setModalOpen(false)} style={{
                position: "absolute", right: 20, top: 20, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)"
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
              >
                <X size={20} />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "rgba(0,240,255,0.06)", border: `1px solid rgba(0,240,255,0.25)`,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Shield size={18} color={CYAN} />
                </div>
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: 0 }}>
                    Create Escrow Vault
                  </h4>
                  <span style={{ fontSize: 9, fontFamily: "var(--font-geist-mono), monospace", color: CYAN }}>
                    INITIALIZE LOCKBOX CONTRACT
                  </span>
                </div>
              </div>

              <form onSubmit={handleCreateDeal} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Deal Title */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.5)" }}>
                    DEAL TITLE / DESCRIPTION
                  </label>
                  <input type="text" required placeholder="e.g. Premium Gaming Handle Exchange" value={dealTitle} onChange={e => setDealTitle(e.target.value)} style={{
                    width: "100%", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, color: "#fff", fontSize: 13, outline: "none"
                  }} />
                </div>

                {/* Role / Side */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.5)" }}>
                    YOUR ROLE
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <button type="button" onClick={() => setDealRole("RECEIVABLE")} style={{
                      padding: "10px", borderRadius: 10, border: `1px solid ${dealRole === "RECEIVABLE" ? EMERALD : "rgba(255,255,255,0.08)"}`,
                      background: dealRole === "RECEIVABLE" ? "rgba(16,185,129,0.06)" : "transparent",
                      color: dealRole === "RECEIVABLE" ? EMERALD : "rgba(255,255,255,0.4)",
                      fontSize: 12, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 700, cursor: "pointer"
                    }}>
                      RECEIVABLE (Seller)
                    </button>
                    <button type="button" onClick={() => setDealRole("PAYABLE")} style={{
                      padding: "10px", borderRadius: 10, border: `1px solid ${dealRole === "PAYABLE" ? PINK : "rgba(255,255,255,0.08)"}`,
                      background: dealRole === "PAYABLE" ? "rgba(236,72,153,0.06)" : "transparent",
                      color: dealRole === "PAYABLE" ? PINK : "rgba(255,255,255,0.4)",
                      fontSize: 12, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 700, cursor: "pointer"
                    }}>
                      PAYABLE (Buyer)
                    </button>
                  </div>
                </div>

                {/* Counterparty */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.5)" }}>
                    COUNTERPARTY USERNAME
                  </label>
                  <input type="text" required placeholder="e.g. @hyper_node_01" value={dealCounterparty} onChange={e => setDealCounterparty(e.target.value)} style={{
                    width: "100%", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, color: "#fff", fontSize: 13, outline: "none"
                  }} />
                </div>

                {/* Amount / Value */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.5)" }}>
                      ASSET AMOUNT
                    </label>
                    <input type="text" required placeholder="e.g. 0.142 BTC" value={dealAmount} onChange={e => setDealAmount(e.target.value)} style={{
                      width: "100%", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, color: "#fff", fontSize: 13, outline: "none"
                    }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.5)" }}>
                      USD VALUE ($)
                    </label>
                    <input type="text" required placeholder="e.g. 8940" value={dealUsd} onChange={e => setDealUsd(e.target.value)} style={{
                      width: "100%", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, color: "#fff", fontSize: 13, outline: "none"
                    }} />
                  </div>
                </div>

                {/* Action CTA */}
                <button type="submit" style={{
                  width: "100%", padding: "14px", borderRadius: 12,
                  background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`, color: "#030408",
                  border: "none", fontWeight: 900, fontSize: 13, cursor: "pointer",
                  fontFamily: "var(--font-geist-mono), monospace", textTransform: "uppercase", letterSpacing: "0.1em",
                  marginTop: 10, boxShadow: "0 4px 20px rgba(0,240,255,0.3)"
                }}>
                  Create Vault Lockbox
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .glass-nav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
        }
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        .start-deal-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(0, 240, 255, 0.55) !important;
        }
        .start-deal-btn:active {
          transform: translateY(1px);
        }
        .deal-card:hover {
          border-color: rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
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
    </div>
  );
}
