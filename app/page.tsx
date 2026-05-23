import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ background: "#030408", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Categories />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
