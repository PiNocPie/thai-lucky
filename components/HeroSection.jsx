"use client";
import { useState } from "react";

const MONTHS_TH = [
  "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
  "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
];

// Days in month (CE year)
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const currentBE = new Date().getFullYear() + 543;
const BE_YEARS = Array.from({ length: 100 }, (_, i) => currentBE - i); // last 100 years

const inputStyle = {
  background: "rgba(212,160,23,0.08)",
  border: "1px solid rgba(212,160,23,0.35)",
  borderRadius: "10px",
  padding: "12px 10px",
  color: "#f5e6c8",
  fontSize: "16px",
  outline: "none",
  cursor: "pointer",
  fontFamily: "'Kanit', 'Sarabun', sans-serif",
  fontWeight: 400,
  appearance: "none",
  WebkitAppearance: "none",
  width: "100%",
  textAlign: "center",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23D4A017' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: "28px",
};

export default function HeroSection({ onSubmit }) {
  const [day, setDay]     = useState("");
  const [month, setMonth] = useState("");
  const [beYear, setBeYear] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!day || !month || !beYear) { setError("กรุณาเลือกวัน เดือน และปีเกิด"); return; }
    setError("");
    const ceYear = parseInt(beYear) - 543;
    const ceMonth = parseInt(month) - 1; // 0-indexed
    const dateObj = new Date(ceYear, ceMonth, parseInt(day));
    onSubmit(dateObj);
  }

  const selectedCeYear = beYear ? parseInt(beYear) - 543 : new Date().getFullYear();
  const selectedMonth  = month ? parseInt(month) : 1;
  const maxDay = daysInMonth(selectedMonth, selectedCeYear);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      position: "relative",
      textAlign: "center",
    }}>
      {/* Background mandala */}
      <div className="animate-spin-slow" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        opacity: 0.04,
        fontSize: "600px",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        ☸
      </div>

      {/* Top ornament */}
      <div style={{ marginBottom: "12px", opacity: 0.7 }}>
        <span style={{ fontSize: "32px", filter: "drop-shadow(0 0 10px rgba(212,160,23,0.8))" }}>🪷</span>
      </div>

      {/* Thai subtitle */}
      <p style={{
        fontFamily: "'Sarabun', sans-serif",
        fontSize: "14px",
        letterSpacing: "6px",
        color: "rgba(212,160,23,0.7)",
        textTransform: "uppercase",
        marginBottom: "16px",
        fontWeight: 300,
      }}>
        ✦ ดวงชะตาแห่งโชคลาภ ✦
      </p>

      {/* Main title */}
      <h1 className="animate-fade-up" style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "clamp(36px, 8vw, 80px)",
        fontWeight: 900,
        lineHeight: 1.1,
        marginBottom: "8px",
      }}>
        <span className="text-gold">ดาวนำโชค</span>
      </h1>

      <h2 style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "clamp(14px, 3vw, 22px)",
        color: "rgba(245,230,200,0.6)",
        fontWeight: 400,
        letterSpacing: "4px",
        marginBottom: "24px",
      }}>
        Lucky Star Oracle
      </h2>

      <div className="ornament" style={{ maxWidth: "400px", width: "100%", marginBottom: "24px" }}>
        ✦
      </div>

      {/* Description */}
      <p style={{
        maxWidth: "480px",
        fontSize: "17px",
        lineHeight: 1.9,
        color: "rgba(245,214,160,0.8)",
        marginBottom: "40px",
        fontWeight: 300,
      }}>
        ค้นพบเลขมงคลประจำวัน สีนำโชค ทิศที่ดี<br />
        และดวงชะตาตามปีเกิดของคุณ
      </p>

      {/* Date input card */}
      <div className="card-premium animate-fade-up" style={{
        padding: "40px",
        maxWidth: "440px",
        width: "100%",
        animationDelay: "0.3s",
        opacity: 0,
        animationFillMode: "forwards",
      }}>
        <p style={{
          fontSize: "13px",
          letterSpacing: "3px",
          color: "rgba(212,160,23,0.7)",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}>
          ✦ ใส่วันเกิดของคุณ ✦
        </p>

        <form onSubmit={handleSubmit}>
          {/* 3-column date picker */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1.6fr", gap: "10px", marginBottom: "8px" }}>
            {/* Day */}
            <div>
              <p style={{ fontSize: "11px", color: "rgba(212,160,23,0.5)", letterSpacing: "2px", marginBottom: "6px", textAlign: "center" }}>วัน</p>
              <select value={day} onChange={e => setDay(e.target.value)} style={inputStyle}>
                <option value="">-</option>
                {Array.from({ length: maxDay }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d} style={{ background: "#1a0800", color: "#f5e6c8" }}>{d}</option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <p style={{ fontSize: "11px", color: "rgba(212,160,23,0.5)", letterSpacing: "2px", marginBottom: "6px", textAlign: "center" }}>เดือน</p>
              <select value={month} onChange={e => setMonth(e.target.value)} style={inputStyle}>
                <option value="">-</option>
                {MONTHS_TH.map((m, i) => (
                  <option key={i} value={i + 1} style={{ background: "#1a0800", color: "#f5e6c8" }}>{m}</option>
                ))}
              </select>
            </div>

            {/* Year BE */}
            <div>
              <p style={{ fontSize: "11px", color: "rgba(212,160,23,0.5)", letterSpacing: "2px", marginBottom: "6px", textAlign: "center" }}>ปี พ.ศ.</p>
              <select value={beYear} onChange={e => setBeYear(e.target.value)} style={inputStyle}>
                <option value="">-</option>
                {BE_YEARS.map(y => (
                  <option key={y} value={y} style={{ background: "#1a0800", color: "#f5e6c8" }}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p style={{ color: "#FF6B6B", fontSize: "13px", marginBottom: "4px", textAlign: "center" }}>{error}</p>
          )}
          <button type="submit" className="btn-gold" style={{ width: "100%", marginTop: "16px" }}>
            เปิดดวง ✨
          </button>
        </form>
      </div>


    </section>
  );
}
