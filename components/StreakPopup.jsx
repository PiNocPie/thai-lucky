"use client";
import { useState, useEffect } from "react";

const STREAK_REWARDS = {
  1:  { icon: "🌸", reward: "เลขมงคล 1 ตัว", bonus: "" },
  3:  { icon: "🌺", reward: "ดวงรายสัปดาห์", bonus: "🎁 โบนัส 3 วัน!" },
  7:  { icon: "🏆", reward: "เลขล็อตเตอรี่พิเศษ", bonus: "⭐ ครบ 1 สัปดาห์!" },
  14: { icon: "💎", reward: "ดวงรายเดือนฟรี", bonus: "👑 STREAK MASTER!" },
  30: { icon: "🔥", reward: "พรีเมียม 1 เดือนฟรี", bonus: "🎉 ครบ 30 วัน!" },
};

function getRewardForStreak(streak) {
  const milestones = [30, 14, 7, 3, 1];
  for (const m of milestones) {
    if (streak >= m) return STREAK_REWARDS[m];
  }
  return STREAK_REWARDS[1];
}

export default function StreakPopup({ onClose }) {
  const [streak, setStreak] = useState(1);
  const [claimed, setClaimed] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    // Load streak from localStorage
    const lastCheckin = localStorage.getItem("lastCheckin");
    const savedStreak = parseInt(localStorage.getItem("streak") || "0");
    const today = new Date().toDateString();

    if (lastCheckin === today) {
      // Already checked in today — don't show
      onClose();
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isConsecutive = lastCheckin === yesterday.toDateString();

    const newStreak = isConsecutive ? savedStreak + 1 : 1;
    setStreak(newStreak);
    setTimeout(() => setAnimIn(true), 50);
  }, [onClose]);

  function handleClaim() {
    const today = new Date().toDateString();
    localStorage.setItem("lastCheckin", today);
    localStorage.setItem("streak", String(streak));
    setClaimed(true);
    setTimeout(() => onClose(), 1800);
  }

  const reward = getRewardForStreak(streak);
  const nextMilestone = [3, 7, 14, 30].find(m => m > streak) || 30;
  const daysToNext = nextMilestone - streak;

  if (!animIn) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
      backdropFilter: "blur(8px)",
    }}>
      <div className="card-premium animate-fade-up" style={{
        maxWidth: "420px",
        width: "100%",
        padding: "48px 36px",
        textAlign: "center",
        borderColor: "rgba(212,160,23,0.7)",
        position: "relative",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "20px",
          background: "transparent", border: "none",
          color: "rgba(212,160,23,0.4)", fontSize: "20px", cursor: "pointer",
        }}>✕</button>

        {/* Streak fire */}
        <div className="animate-float" style={{ fontSize: "64px", marginBottom: "8px" }}>
          {claimed ? "✅" : reward.icon}
        </div>

        {/* Title */}
        <p style={{
          fontSize: "11px", letterSpacing: "4px", color: "rgba(212,160,23,0.6)",
          textTransform: "uppercase", marginBottom: "12px",
        }}>
          ✦ เช็คอินประจำวัน ✦
        </p>

        <h2 className="text-gold-static" style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "32px", fontWeight: 900, marginBottom: "4px",
        }}>
          {streak} วันติดต่อกัน
        </h2>

        {reward.bonus && (
          <p style={{
            color: "#F5D76E", fontSize: "14px", fontWeight: 700,
            marginBottom: "16px", letterSpacing: "1px",
          }}>
            {reward.bonus}
          </p>
        )}

        <div className="ornament" style={{ margin: "20px 0" }}>✦</div>

        {/* Reward */}
        {!claimed ? (
          <>
            <p style={{ color: "rgba(245,214,160,0.6)", fontSize: "14px", marginBottom: "8px" }}>
              รางวัลวันนี้:
            </p>
            <p style={{ color: "#F5D76E", fontSize: "18px", fontWeight: 700, marginBottom: "28px" }}>
              {reward.reward}
            </p>

            {/* Streak progress dots */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "8px",
              marginBottom: "28px", flexWrap: "wrap",
            }}>
              {Array.from({ length: Math.min(streak + 3, 10) }).map((_, i) => (
                <div key={i} style={{
                  width: "12px", height: "12px",
                  borderRadius: "50%",
                  background: i < streak
                    ? "linear-gradient(135deg, #D4A017, #F5D76E)"
                    : "rgba(212,160,23,0.15)",
                  border: i < streak ? "none" : "1px solid rgba(212,160,23,0.3)",
                  boxShadow: i < streak ? "0 0 8px rgba(212,160,23,0.6)" : "none",
                }} />
              ))}
            </div>

            <p style={{ color: "rgba(245,214,160,0.35)", fontSize: "13px", marginBottom: "24px" }}>
              อีก {daysToNext} วันถึงรางวัลถัดไป 🎁
            </p>

            <button className="btn-gold" style={{ width: "100%" }} onClick={handleClaim}>
              รับโชคประจำวัน 🌸
            </button>
          </>
        ) : (
          <div>
            <p style={{ color: "#F5D76E", fontSize: "20px", fontWeight: 700 }}>
              รับโชคสำเร็จ! ✨
            </p>
            <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "14px", marginTop: "8px" }}>
              ขอให้โชคดีตลอดวัน 🪷
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
