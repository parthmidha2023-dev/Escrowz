import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030408] text-white flex flex-col font-sans select-none overflow-x-hidden antialiased">
      {/* Universal Floating Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col w-full">
        {/* Futuristic Hero Section */}
        <Hero />

        {/* High-Tech Features Section */}
        <Features />

        {/* Digital Asset Categories Section */}
        <Categories />

        {/* Live Ledger Stats Section */}
        <Stats />
      </main>

      {/* Cryptographic Compliance Footer */}
      <Footer />
    </div>
  );
}
