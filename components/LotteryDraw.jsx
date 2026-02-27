"use client";
import { useState } from "react";

// Show this section in the last 5 days before a draw (1st and 16th of each month)
function isNearDraw() {
  const today = new Date();
  const d = today.getDate();
  return d >= 27 || d <= 1 || (d >= 12 && d <= 16);
}

function getDaysUntilDraw() {
  const today = new Date();
  const d = today.getDate();
  if (d <= 1) return { days: 1 - d, date: "1" };
  if (d <= 16) return { days: 16 - d, date: "16" };
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  return { days: daysInMonth - d + 1, date: "1" };
}

function generateLotteryNumbers(luckyNumbers, seed) {
  const base = luckyNumbers.twoDigitLucky;
  const n1 = luckyNumbers.singleDigits[0];
  const n2 = luckyNumbers.singleDigits[1];
  const n3 = luckyNumbers.singleDigits[2];

  return [
    `${base[0]}`,
    `${base[1]}`,
    `${(n1 * 7 + n2 * 3 + seed) % 90 + 10}`,
    `${(n2 * 11 + n3 * 5 + seed * 2) % 90 + 10}`,
    `${(n1 * 13 + n3 * 7 + seed * 3) % 90 + 10}`,
  ];
}

export default function LotteryDraw({ luckyNumbers }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      const saved = localStorage.getItem("lotteryUnlocked");
      if (!saved) return false;
      const { date } = JSON.parse(saved);
      // Valid for current lottery period
      const today = new Date().toDateString();
      return date === today;
    } catch { return false; }
  });
  const [showPaywall, setShowPaywall] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (!isNearDraw()) return null;

  const { days, date } = getDaysUntilDraw();
  const seed = luckyNumbers.singleDigits.reduce((a, b) => a + b, 0);
  const numbers = generateLotteryNumbers(luckyNumbers, seed);

  function handleUnlock() {
    setConfirming(true);
    // Simulate payment confirmation (2s)
    setTimeout(() => {
      try {
        localStorage.setItem("lotteryUnlocked", JSON.stringify({ date: new Date().toDateString() }));
      } catch {}
      setUnlocked(true);
      setConfirming(false);
      setShowPaywall(false);
    }, 2000);
  }

  return (
    <div className="card-premium animate-glow-pulse" style={{
      padding: "36px",
      marginBottom: "24px",
      borderColor: "rgba(212,160,23,0.7)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "-40px", left: "50%",
        transform: "translateX(-50%)",
        width: "200px", height: "200px",
        background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎱</div>
      <p style={{ fontSize: "11px", letterSpacing: "5px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "8px" }}>
        ✦ เลขเด็ด งวดนี้ ✦
      </p>
      <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "13px", marginBottom: "20px" }}>
        {days === 0 ? `วันนี้วันที่ ${date} — งวดสลากกินแบ่ง!` : `อีก ${days} วันถึงงวดวันที่ ${date}`}
      </p>

      {unlocked ? (
        <>
          <p style={{ color: "rgba(212,160,23,0.5)", fontSize: "12px", letterSpacing: "2px", marginBottom: "16px" }}>
            เลขเด็ด 5 ชุด ประจำงวดนี้
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
            {numbers.map((n, i) => (
              <div key={i} style={{
                background: "linear-gradient(135deg, rgba(212,160,23,0.2), rgba(212,160,23,0.1))",
                border: "2px solid rgba(212,160,23,0.6)",
                borderRadius: "12px",
                padding: "12px 20px",
                fontFamily: "'Kanit', sans-serif",
                fontSize: "36px",
                fontWeight: 900,
                color: "#F5D76E",
                boxShadow: "0 0 20px rgba(212,160,23,0.2)",
                minWidth: "72px",
              }}>
                {n}
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(245,214,160,0.3)", fontSize: "11px" }}>
            ✦ เลขนี้ถูกคำนวณจากดวงชะตาและวันเกิดของคุณ ใช้เพื่อความสนุกเท่านั้น
          </p>
        </>
      ) : (
        <>
          {/* Blurred preview */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px", filter: "blur(8px)", userSelect: "none", pointerEvents: "none" }}>
            {["??","??","??","??","??"].map((n, i) => (
              <div key={i} style={{
                background: "rgba(212,160,23,0.15)",
                border: "2px solid rgba(212,160,23,0.4)",
                borderRadius: "12px",
                padding: "12px 20px",
                fontFamily: "'Kanit', sans-serif",
                fontSize: "36px",
                fontWeight: 900,
                color: "#F5D76E",
                minWidth: "72px",
              }}>
                {n}
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowPaywall(true)}
            style={{
              background: "linear-gradient(135deg, #8B6914, #D4A017, #F5D76E, #D4A017, #8B6914)",
              backgroundSize: "300% auto",
              animation: "shimmer 3s linear infinite",
              color: "#0D0600",
              border: "none",
              borderRadius: "50px",
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: 900,
              fontFamily: "'Sarabun', sans-serif",
              cursor: "pointer",
              boxShadow: "0 4px 30px rgba(212,160,23,0.5)",
            }}
          >
            🔓 ปลดล็อกเลขเด็ด ฿9
          </button>
          <p style={{ color: "rgba(245,214,160,0.3)", fontSize: "12px", marginTop: "10px" }}>
            5 ชุดเลขเด็ด · คำนวณจากดวงชะตาของคุณ
          </p>
        </>
      )}

      {/* Paywall modal */}
      {showPaywall && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }} onClick={() => !confirming && setShowPaywall(false)}>
          <div
            className="card-premium"
            style={{ maxWidth: "380px", width: "100%", padding: "40px 32px", textAlign: "center" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎱</div>
            <h3 style={{ color: "#F5D76E", fontFamily: "'Cinzel Decorative', serif", fontSize: "18px", marginBottom: "8px" }}>
              ปลดล็อกเลขเด็ด
            </h3>
            <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "13px", marginBottom: "28px", lineHeight: 1.7 }}>
              รับ 5 ชุดเลขเด็ด คำนวณจากดวงชะตาและเลขมงคลของคุณ<br/>เพียงครั้งเดียว ฿9
            </p>

            {/* PromptPay mock */}
            <div style={{
              background: "rgba(212,160,23,0.08)",
              border: "1px solid rgba(212,160,23,0.3)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "20px",
            }}>
              <p style={{ color: "rgba(212,160,23,0.6)", fontSize: "11px", letterSpacing: "3px", marginBottom: "12px" }}>PROMPTPAY</p>
              <div style={{
                width: "120px", height: "120px",
                background: "white",
                borderRadius: "12px",
                margin: "0 auto 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#666",
              }}>
                QR Code
              </div>
              <p style={{ color: "#F5D76E", fontFamily: "'Kanit', sans-serif", fontSize: "22px", fontWeight: 900 }}>฿9</p>
              <p style={{ color: "rgba(245,214,160,0.4)", fontSize: "12px" }}>โอนแล้วกดยืนยัน</p>
            </div>

            <button
              onClick={handleUnlock}
              disabled={confirming}
              style={{
                background: confirming ? "rgba(212,160,23,0.3)" : "linear-gradient(135deg, #D4A017, #F5D76E)",
                border: "none",
                borderRadius: "50px",
                padding: "14px 32px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#0D0600",
                fontFamily: "'Sarabun', sans-serif",
                cursor: confirming ? "wait" : "pointer",
                width: "100%",
                marginBottom: "12px",
              }}
            >
              {confirming ? "⏳ กำลังยืนยัน..." : "✅ โอนแล้ว — ยืนยัน"}
            </button>
            <button
              onClick={() => setShowPaywall(false)}
              style={{ background: "transparent", border: "none", color: "rgba(245,214,160,0.3)", fontSize: "13px", cursor: "pointer" }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
