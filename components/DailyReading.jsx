"use client";
import { useEffect, useState } from "react";
import {
  getDailyReading, getAuspiciousTimes,
  getDomainReadings, getWeeklyCalendar, getDailyAffirmation,
} from "@/lib/astrology";
import DomainReading from "./DomainReading";
import WeeklyCalendar from "./WeeklyCalendar";
import AffirmationCard from "./AffirmationCard";
import LoveOracle from "./LoveOracle";
import TarotOracle from "./TarotOracle";

export default function DailyReading({ birthDate, onBack }) {
  const [reading, setReading] = useState(null);

  useEffect(() => {
    const today = new Date();
    const data        = getDailyReading(birthDate, today);
    const times       = getAuspiciousTimes(today.getDay());
    const domains     = getDomainReadings(data.lifePathNumber, today.getDay());
    const weekDays    = getWeeklyCalendar(data.lifePathNumber, today);
    const affirmation = getDailyAffirmation(data.lifePathNumber, today.getDay());
    setReading({ ...data, auspiciousTimes: times, domains, weekDays, affirmation });
  }, [birthDate]);

  if (!reading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-gold animate-glow-pulse" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "24px" }}>
          กำลังดูดวง...
        </div>
      </div>
    );
  }

  const { zodiac, dayColor, direction, fortunes, luckyNumbers, auspiciousTimes, date, domains, weekDays, affirmation } = reading;

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>

      {/* Back */}
      <button onClick={onBack} style={{
        background: "transparent",
        border: "1px solid rgba(212,160,23,0.3)",
        color: "rgba(212,160,23,0.7)",
        borderRadius: "50px",
        padding: "8px 20px",
        cursor: "pointer",
        fontSize: "14px",
        marginBottom: "32px",
        fontFamily: "'Sarabun', sans-serif",
      }}>
        ← กลับ
      </button>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🪷</div>
        <h1 className="text-gold" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(22px,5vw,40px)", fontWeight: 900 }}>
          ดวงประจำวันนี้
        </h1>
        <p style={{ color: "rgba(245,214,160,0.6)", marginTop: "8px", fontSize: "15px" }}>{date.be}</p>
        <div className="ornament" style={{ marginTop: "20px" }}>✦</div>
      </div>

      {/* ① Affirmation — hook them emotionally first */}
      <AffirmationCard affirmation={affirmation} luckyNumbers={luckyNumbers} />

      {/* ② Lucky Numbers — hero */}
      <div className="card-premium" style={{ padding: "36px", marginBottom: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", letterSpacing: "4px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "20px" }}>
          ✦ เลขมงคลประจำวัน ✦
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "28px", flexWrap: "wrap" }}>
          {luckyNumbers.singleDigits.map((n, i) => (
            <div key={i} className="number-circle animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{n}</div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "rgba(212,160,23,0.5)", letterSpacing: "2px", marginBottom: "12px" }}>
          เลข 2 ตัวท้าย (ล็อตเตอรี่มงคล)
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {luckyNumbers.twoDigitLucky.map((n, i) => (
            <div key={i} className="lucky-number" style={{ fontSize: "52px", fontWeight: 900 }}>{n}</div>
          ))}
        </div>
        <div className="ornament" style={{ margin: "20px 0" }}>✦</div>
        <p style={{ color: "rgba(245,214,160,0.7)", fontSize: "15px" }}>
          เลขชีวิต: <span style={{ color: "#F5D76E", fontWeight: 700 }}>{luckyNumbers.lifePathMeaning.th}</span>
        </p>
        <p style={{ color: "rgba(245,214,160,0.4)", fontSize: "13px", marginTop: "4px" }}>
          {luckyNumbers.lifePathMeaning.en}
        </p>
      </div>

      {/* ③ Tarot Oracle Game */}
      <TarotOracle lifePathNumber={reading.lifePathNumber} />

      {/* ④ Love Oracle interactive Q&A */}
      <LoveOracle lifePathNumber={reading.lifePathNumber} />

      {/* ④ 3-Domain reading */}
      <DomainReading domains={domains} />

      {/* ⑤ Weekly calendar */}
      <WeeklyCalendar weekDays={weekDays} />

      {/* ⑤ Color + Direction */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div className="card-premium" style={{ padding: "28px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>✦ สีมงคล</p>
          <div className="color-dot animate-glow-pulse" style={{
            backgroundColor: dayColor.hex,
            margin: "0 auto 16px",
            boxShadow: `0 0 30px ${dayColor.hex}80`,
          }} />
          <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "16px", color: "#F5D76E" }}>{dayColor.th}</p>
          <p style={{ fontSize: "13px", color: "rgba(245,214,160,0.5)", marginTop: "4px" }}>{dayColor.en}</p>
        </div>
        <div className="card-premium" style={{ padding: "28px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>✦ ทิศมงคล</p>
          <div style={{ fontSize: "44px", marginBottom: "12px" }}>🧭</div>
          <p style={{ fontFamily: "'Sarabun', sans-serif", fontSize: "16px", color: "#F5D76E", fontWeight: 700 }}>{direction}</p>
        </div>
      </div>

      {/* ⑥ Zodiac */}
      <div className="card-premium" style={{ padding: "28px", marginBottom: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", letterSpacing: "4px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "12px" }}>✦ ปีนักษัตร ✦</p>
        <div style={{ fontSize: "52px", lineHeight: 1, marginBottom: "10px" }}>{zodiacEmoji(zodiac.key)}</div>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "22px", color: "#F5D76E" }}>{zodiac.th} — {zodiac.en}</h2>
        <p style={{ color: "rgba(245,214,160,0.5)", marginTop: "6px", fontSize: "13px", letterSpacing: "2px" }}>
          ธาตุ: {elementThai(zodiac.element)} ✦ {zodiac.element.toUpperCase()}
        </p>
      </div>

      {/* ⑦ Fortunes */}
      <div className="card-premium" style={{ padding: "28px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "4px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "20px", textAlign: "center" }}>✦ คำทำนายประจำวัน ✦</p>
        {fortunes.map((f, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "16px",
            padding: "12px 0",
            borderBottom: i < fortunes.length - 1 ? "1px solid rgba(212,160,23,0.08)" : "none",
          }}>
            <span style={{ color: "#D4A017", fontSize: "14px", flexShrink: 0 }}>◆</span>
            <p style={{ color: "rgba(245,214,160,0.82)", fontSize: "15px", lineHeight: 1.6 }}>{f}</p>
          </div>
        ))}
      </div>

      {/* ⑧ Auspicious times */}
      <div className="card-premium" style={{ padding: "28px", marginBottom: "40px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "4px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "20px", textAlign: "center" }}>✦ เวลามงคล ✦</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {auspiciousTimes.map((t, i) => (
            <div key={i} style={{
              background: "rgba(212,160,23,0.1)",
              border: "1px solid rgba(212,160,23,0.3)",
              borderRadius: "50px",
              padding: "10px 24px",
              color: "#F5D76E",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "'Kanit', 'Sarabun', sans-serif",
            }}>
              🕐 {t}
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div className="card-premium animate-glow-pulse" style={{
        padding: "48px 32px",
        textAlign: "center",
        borderColor: "rgba(212,160,23,0.6)",
        marginBottom: "60px",
      }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>👑</div>
        <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "20px", color: "#F5D76E", marginBottom: "12px" }}>อัปเกรดเป็น Premium</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          {[
            "📅 ปฏิทินโชคทั้งเดือน + วันดีธุรกิจ",
            "🔮 ดวง 3 ด้านแบบรายสัปดาห์ละเอียด",
            "🎱 เลขล็อตเตอรี่ขั้นสูง (5 ชุด/เดือน)",
            "💑 ตรวจสอบความเข้ากันกับคนรัก",
            "🔔 แจ้งเตือนวันมงคลอัตโนมัติ",
          ].map(f => (
            <p key={f} style={{ color: "rgba(245,214,160,0.65)", fontSize: "14px" }}>{f}</p>
          ))}
        </div>
        <button className="btn-gold">ทดลองใช้ฟรี 7 วัน ✨</button>
        <p style={{ color: "rgba(245,214,160,0.3)", fontSize: "12px", marginTop: "12px" }}>เพียง ฿99/เดือน · ยกเลิกได้ทุกเมื่อ</p>
      </div>
    </div>
  );
}

function zodiacEmoji(key) {
  const map = {
    rat:"🐀",ox:"🐂",tiger:"🐅",rabbit:"🐇",
    dragon:"🐉",snake:"🐍",horse:"🐎",goat:"🐐",
    monkey:"🐒",rooster:"🐓",dog:"🐕",pig:"🐖",
  };
  return map[key] || "⭐";
}

function elementThai(el) {
  return { water:"น้ำ",earth:"ดิน",wood:"ไม้",fire:"ไฟ",metal:"โลหะ" }[el] || el;
}
