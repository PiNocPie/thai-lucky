"use client";
import { useState } from "react";

const DOMAINS = [
  { key: "love",   icon: "❤️", label: "ความรัก",   labelEn: "Love" },
  { key: "career", icon: "💼", label: "การงาน",    labelEn: "Career" },
  { key: "money",  icon: "💰", label: "การเงิน",   labelEn: "Money" },
];

function StarRow({ score }) {
  return (
    <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{
          fontSize: "14px",
          filter: s <= score ? "none" : "grayscale(1) opacity(0.2)",
          textShadow: s <= score ? "0 0 8px rgba(212,160,23,0.8)" : "none",
        }}>⭐</span>
      ))}
    </div>
  );
}

export default function DomainReading({ domains }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="card-premium" style={{ padding: "32px", marginBottom: "24px" }}>
      <p style={{
        fontSize: "12px", letterSpacing: "4px",
        color: "rgba(212,160,23,0.6)", textTransform: "uppercase",
        marginBottom: "24px", textAlign: "center",
      }}>
        ✦ ดวง 3 ด้านประจำวัน ✦
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {DOMAINS.map(d => {
          const reading = domains[d.key];
          const isOpen  = expanded === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setExpanded(isOpen ? null : d.key)}
              style={{
                background: isOpen
                  ? "linear-gradient(145deg, rgba(212,160,23,0.2), rgba(212,160,23,0.08))"
                  : "rgba(212,160,23,0.05)",
                border: isOpen
                  ? "1px solid rgba(212,160,23,0.6)"
                  : "1px solid rgba(212,160,23,0.15)",
                borderRadius: "16px",
                padding: "20px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.25s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "28px" }}>{d.icon}</span>
              <span style={{
                fontSize: "13px",
                fontFamily: "'Sarabun', sans-serif",
                fontWeight: 600,
                color: isOpen ? "#F5D76E" : "rgba(245,214,160,0.7)",
              }}>
                {d.label}
              </span>
              <StarRow score={reading.score} />
              <span style={{
                fontSize: "10px",
                color: isOpen ? "rgba(245,214,160,0.6)" : "rgba(245,214,160,0.3)",
                marginTop: "2px",
              }}>
                {isOpen ? "▲ ปิด" : "▼ ดูดวง"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{
          marginTop: "20px",
          padding: "20px 24px",
          background: "rgba(212,160,23,0.06)",
          borderRadius: "14px",
          border: "1px solid rgba(212,160,23,0.2)",
          animation: "fade-up 0.3s ease-out both",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ fontSize: "24px" }}>
              {DOMAINS.find(d => d.key === expanded).icon}
            </span>
            <p style={{ fontSize: "15px", color: "#F5D76E", fontWeight: 700 }}>
              {domains[expanded].short}
            </p>
          </div>
          <p style={{ color: "rgba(245,214,160,0.75)", fontSize: "14px", lineHeight: 1.8 }}>
            {domains[expanded].detail}
          </p>
        </div>
      )}

      {/* Teaser for premium */}
      <div style={{
        marginTop: "20px",
        padding: "14px 18px",
        background: "rgba(212,160,23,0.04)",
        borderRadius: "12px",
        border: "1px dashed rgba(212,160,23,0.2)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "13px", color: "rgba(245,214,160,0.45)" }}>
          👑 Premium: ดูดวง 3 ด้านแบบรายสัปดาห์ + คำแนะนำเฉพาะตัว
        </p>
      </div>
    </div>
  );
}
