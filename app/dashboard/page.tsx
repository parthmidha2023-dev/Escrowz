import React from "react";
import { redirect } from "next/navigation";
import { Shield, Key, Mail, Clock, LogOut, CheckCircle2, Terminal } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const CYAN = "#00f0ff";
const BLUE = "#3b82f6";
const EMERALD = "#10b981";

export default async function DashboardPage() {
  const user = await currentUser();

  // Route protection fallback
  if (!user) {
    redirect("/signin");
  }

  const primaryEmail = user.emailAddresses[0]?.emailAddress || "N/A";
  const userUsername = user.username || primaryEmail.split("@")[0];

  // Format date helper
  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

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
      <Navbar />
      {/* Grid background */}
      <div className="cyber-grid" style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, pointerEvents: "none"
      }} />

      {/* Drifting background lights */}
      <div style={{
        position: "absolute", top: "-10%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", bottom: "-10%", left: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)`,
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* Main card panel */}
      <div style={{ width: "100%", maxWidth: 540, position: "relative", zIndex: 10 }}>
        {/* Card Panel */}
        <div
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
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "rgba(0,240,255,0.06)",
                border: `1px solid rgba(0,240,255,0.25)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 15px rgba(0,240,255,0.1)`
              }}>
                <Shield size={18} color={CYAN} />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>
                  Escrowz Console
                </h2>
                <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", color: CYAN, letterSpacing: "0.05em" }}>
                  CLERK SECURE SESSION
                </span>
              </div>
            </div>

            {/* Clerk Logout Trigger */}
            <SignOutButton redirectUrl="/signin">
              <button
                style={{
                  background: "rgba(239, 68, 68, 0.05)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: 10,
                  padding: "8px 14px",
                  color: "#f87171",
                  fontSize: 12,
                  fontFamily: "var(--font-geist-mono), monospace",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s"
                }}
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </SignOutButton>
          </div>

          {/* User Profile */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Identity Badge */}
            <div style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 16,
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: 16
            }}>
              {/* Circular Avatar rendering */}
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "#030408",
                  border: `1.5px solid ${CYAN}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 15px rgba(0, 240, 255, 0.15)`,
                  overflow: "hidden"
                }}>
                  <img 
                    src={user.imageUrl} 
                    alt="Clerk Profile image" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
                <span style={{ fontSize: 12, fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.4)" }}>
                  AUTHENTICATED NODE
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", wordBreak: "break-all" }}>
                  @{userUsername}
                </span>
              </div>
            </div>

            {/* Session status cells */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              
              {/* Card 1 */}
              <div style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 8
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: BLUE }}>
                  <Key size={14} />
                  <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.05em" }}>KEYS</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  Active Session
                </span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>
                  PROVISIONED // OK
                </span>
              </div>

              {/* Card 2 */}
              <div style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 8
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: EMERALD }}>
                  <Terminal size={14} />
                  <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.05em" }}>VERIFIED</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  Email Confirmed
                </span>
                <span style={{ fontSize: 10, color: EMERALD, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 700 }}>
                  CONFIRMED PROTOCOL
                </span>
              </div>

            </div>

            {/* Time stamps and details */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                <span style={{ color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={13} />
                  Initialized On
                </span>
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", color: "#fff" }}>
                  {formattedDate}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                <span style={{ color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
                  <Mail size={13} />
                  Email Address
                </span>
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", color: CYAN }}>
                  {primaryEmail}
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
