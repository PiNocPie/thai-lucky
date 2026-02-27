"use client";
import { useState } from "react";
import { getCoupleCompatibility } from "@/lib/astrology";

const MONTHS_TH = [
  "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
  "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
];

const currentBE = new Date().getFullYear() + 543;
const BE_YEARS = Array.from({ length: 80 }, (_, i) => currentBE - i);

const sel = {
  background: "rgba(212,160,23,0.08)",
  border: "1px solid rgba(212,160,23,0.3)",
  borderRadius: "10px",
  padding: "10px 8px",
  color: "#f5e6c8",
  fontSize: "14px",
  outline: "none",
  cursor: "pointer",
  fontFamily: "'Kanit', 'Sarabun', sans-serif",
  appearance: "none",
  WebkitAppearance: "none",
  width: "100%",
  textAlign: "center",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23D4A017' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
  paddingRight: "24px",
};

function DatePicker({ label, emoji, day, month, year, onDay, onMonth, onYear }) {
  const ceYear = year ? parseInt(year) - 543 : new Date().getFullYear();
  const mon = month ? parseInt(month) : 1;
  const maxDay = new Date(ceYear, mon, 0).getDate();

  return (
    <div style={{ flex: 1, minWidth: "240px" }}>
      <p style={{ textAlign: "center", fontSize: "24px", marginBottom: "8px" }}>{emoji}</p>
      <p style={{ textAlign: "center", color: "#D4A017", fontSize: "13px", letterSpacing: "2px", marginBottom: "12px" }}>{label}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1.4fr", gap: "8px" }}>
        <select value={day} onChange={e => onDay(e.target.value)} style={sel}>
          <option value="">วัน</option>
          {Array.from({ length: maxDay }, (_, i) => i + 1).map(d => (
            <option key={d} value={d} style={{ background: "#1a0800" }}>{d}</option>
          ))}
        </select>
        <select value={month} onChange={e => onMonth(e.target.value)} style={sel}>
          <option value="">เดือน</option>
          {MONTHS_TH.map((m, i) => (
            <option key={i} value={i + 1} style={{ background: "#1a0800" }}>{m}</option>
          ))}
        </select>
        <select value={year} onChange={e => onYear(e.target.value)} style={sel}>
          <option value="">ปี</option>
          {BE_YEARS.map(y => (
            <option key={y} value={y} style={{ background: "#1a0800" }}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ScoreRing({ score }) {
  const color =
    score >= 80 ? "#F5D76E" :
    score >= 65 ? "#81C784" :
    score >= 50 ? "#FFB74D" : "#EF9A9A";

  return (
    <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 24px" }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(212,160,23,0.1)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r="60"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 60 * score / 100} ${2 * Math.PI * 60}`}
          strokeDashoffset={2 * Math.PI * 60 * 0.25}
          style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
        />
      </svg>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: "36px", fontWeight: 900, color }}>
          {score}
        </div>
        <div style={{ fontSize: "11px", color: "rgba(212,160,23,0.5)", letterSpacing: "1px" }}>คะแนน</div>
      </div>
    </div>
  );
}

function getDailyCompatUsage() {
  try {
    const saved = localStorage.getItem("compatUsage");
    if (!saved) return { date: "", used: false };
    return JSON.parse(saved);
  } catch { return { date: "", used: false }; }
}

function markCompatUsed() {
  try {
    localStorage.setItem("compatUsage", JSON.stringify({ date: new Date().toDateString(), used: true }));
  } catch {}
}

export default function CoupleCompatibility() {
  const [d1, setD1] = useState({ day: "", month: "", year: "" });
  const [d2, setD2] = useState({ day: "", month: "", year: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [usedToday, setUsedToday] = useState(() => {
    const u = getDailyCompatUsage();
    return u.used && u.date === new Date().toDateString();
  });

  function handleCheck() {
    if (!d1.day || !d1.month || !d1.year || !d2.day || !d2.month || !d2.year) {
      setError("กรุณาเลือกวันเกิดทั้งสองคน");
      return;
    }
    setError("");
    const b1 = new Date(parseInt(d1.year) - 543, parseInt(d1.month) - 1, parseInt(d1.day));
    const b2 = new Date(parseInt(d2.year) - 543, parseInt(d2.month) - 1, parseInt(d2.day));
    setResult(getCoupleCompatibility(b1, b2));
    markCompatUsed();
    setUsedToday(true);
  }

  const verdictColor = {
    gold: "#F5D76E",
    good: "#81C784",
    ok: "#FFB74D",
    hard: "#EF9A9A",
  };

  return (
    <section style={{ padding: "80px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>💑</div>
        <p style={{ fontSize: "12px", letterSpacing: "6px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>
          ✦ ดวงคู่ ✦
        </p>
        <h2 className="text-gold" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(22px,5vw,36px)", fontWeight: 900, marginBottom: "12px" }}>
          ความเข้ากันของคู่รัก
        </h2>
        <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "14px" }}>
          ใส่วันเกิดทั้งสองคน เพื่อดูความเข้ากันด้านดวงชะตา
        </p>
        <div className="ornament" style={{ marginTop: "20px" }}>✦</div>
      </div>

      <div className="card-premium" style={{ padding: "36px", marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "28px" }}>
          <DatePicker
            label="คนแรก" emoji="🌹"
            day={d1.day} month={d1.month} year={d1.year}
            onDay={v => setD1(p => ({ ...p, day: v }))}
            onMonth={v => setD1(p => ({ ...p, month: v }))}
            onYear={v => setD1(p => ({ ...p, year: v }))}
          />
          <DatePicker
            label="คนที่สอง" emoji="🌸"
            day={d2.day} month={d2.month} year={d2.year}
            onDay={v => setD2(p => ({ ...p, day: v }))}
            onMonth={v => setD2(p => ({ ...p, month: v }))}
            onYear={v => setD2(p => ({ ...p, year: v }))}
          />
        </div>

        {error && <p style={{ color: "#FF8A80", fontSize: "13px", textAlign: "center", marginBottom: "12px" }}>{error}</p>}

        {usedToday && !result ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "13px", marginBottom: "16px" }}>
              ✦ ใช้ครบ 1 ครั้งสำหรับวันนี้แล้ว — มาใหม่พรุ่งนี้
            </p>
            <button className="btn-gold" style={{ width: "100%", opacity: 0.6, cursor: "not-allowed" }} disabled>
              👑 Premium — ไม่จำกัดครั้ง ฿99/เดือน
            </button>
          </div>
        ) : (
          <button
            onClick={handleCheck}
            className="btn-gold"
            style={{ width: "100%" }}
          >
            ตรวจสอบดวงคู่ 💑
          </button>
        )}
      </div>

      {result && (
        <div className="card-premium" style={{ padding: "36px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", letterSpacing: "4px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "24px" }}>
            ✦ ผลดวงคู่ ✦
          </p>

          {/* Zodiac pair */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px" }}>🌹</div>
              <div style={{ color: "#F5D76E", fontSize: "14px", marginTop: "4px" }}>ปี{result.z1.th}</div>
              <div style={{ color: "rgba(245,214,160,0.4)", fontSize: "12px" }}>เส้นชีวิต {result.lp1}</div>
            </div>
            <div style={{ fontSize: "24px", color: "rgba(212,160,23,0.4)" }}>✦</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px" }}>🌸</div>
              <div style={{ color: "#F5D76E", fontSize: "14px", marginTop: "4px" }}>ปี{result.z2.th}</div>
              <div style={{ color: "rgba(245,214,160,0.4)", fontSize: "12px" }}>เส้นชีวิต {result.lp2}</div>
            </div>
          </div>

          <ScoreRing score={result.total} />

          <p style={{
            color: verdictColor[result.verdict.level],
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: "'Sarabun', sans-serif",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}>
            {result.verdict.th}
          </p>

          {/* Aspect bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", marginBottom: "20px" }}>
            {result.aspects.map(a => (
              <div key={a.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "rgba(245,214,160,0.7)", fontSize: "13px" }}>{a.label}</span>
                  <span style={{ color: "#F5D76E", fontSize: "13px", fontWeight: 700 }}>{a.score}%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(212,160,23,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${a.score}%`,
                    background: a.score >= 80 ? "#F5D76E" : a.score >= 60 ? "#81C784" : "#FFB74D",
                    borderRadius: "3px",
                    boxShadow: `0 0 8px ${a.score >= 80 ? "#F5D76E" : "#81C784"}66`,
                    transition: "width 0.8s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(212,160,23,0.1)", paddingTop: "16px" }}>
            <p style={{ color: "rgba(245,214,160,0.3)", fontSize: "12px" }}>
              ✦ ดวงคู่แบบละเอียดรายด้านสำหรับ Premium เร็วๆ นี้
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
