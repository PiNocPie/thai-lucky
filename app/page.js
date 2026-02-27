"use client";
import { useState, useEffect } from "react";
import DailyReading from "@/components/DailyReading";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import MeritSection from "@/components/MeritSection";
import StreakPopup from "@/components/StreakPopup";

export default function Home() {
  const [birthDate, setBirthDate] = useState(null);
  const [showReading, setShowReading] = useState(false);
  const [showStreak, setShowStreak] = useState(false);

  useEffect(() => {
    // Show streak popup after 1.5s if not checked in today
    const lastCheckin = localStorage.getItem("lastCheckin");
    const today = new Date().toDateString();
    if (lastCheckin !== today) {
      const timer = setTimeout(() => setShowStreak(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleSubmit(date) {
    setBirthDate(date);
    setShowReading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      {/* Floating lotus particles */}
      <div className="particle" style={{ left: "10%", animationDelay: "0s" }}>🪷</div>
      <div className="particle" style={{ left: "30%", animationDelay: "2s" }}>✨</div>
      <div className="particle" style={{ left: "60%", animationDelay: "4s" }}>🪷</div>
      <div className="particle" style={{ left: "80%", animationDelay: "6s" }}>✨</div>
      <div className="particle" style={{ left: "50%", animationDelay: "1s" }}>🪷</div>

      {/* Daily streak popup */}
      {showStreak && <StreakPopup onClose={() => setShowStreak(false)} />}

      {!showReading ? (
        <>
          <HeroSection onSubmit={handleSubmit} />
          <MeritSection />
          <PricingSection />

          {/* Footer */}
          <footer style={{
            textAlign: "center",
            padding: "40px 20px",
            borderTop: "1px solid rgba(212,160,23,0.1)",
            color: "rgba(245,214,160,0.3)",
            fontSize: "13px",
          }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🪷</p>
            <p>© 2026 ดาวนำโชค — Lucky Star Oracle</p>
            <p style={{ marginTop: "4px" }}>ขอให้โชคดีทุกวัน ✦</p>
          </footer>
        </>
      ) : (
        <DailyReading birthDate={birthDate} onBack={() => setShowReading(false)} />
      )}
    </main>
  );
}
