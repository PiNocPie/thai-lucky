"use client";
import { useState } from "react";

const TEMPLES = [
  {
    name: "วัดพระแก้ว",
    nameEn: "Wat Phra Kaew",
    location: "กรุงเทพฯ",
    type: "วัดสำคัญ",
    merit: "ขอพรเรื่องชีวิต ความสำเร็จ",
    icon: "🏛️",
    gmaps: "https://maps.google.com/?q=Wat+Phra+Kaew+Bangkok",
    special: "วัดแห่งชาติ",
    line: null,
  },
  {
    name: "วัดพระธาตุดอยสุเทพ",
    nameEn: "Doi Suthep Temple",
    location: "เชียงใหม่",
    type: "วัดมงคล",
    merit: "ขอพรเรื่องโชคลาภ ค้าขาย",
    icon: "⛰️",
    gmaps: "https://maps.google.com/?q=Doi+Suthep+Temple+Chiang+Mai",
    special: "ศักดิ์สิทธิ์มาก",
    line: null,
  },
  {
    name: "วัดสามพระยา",
    nameEn: "Wat Sam Phraya",
    location: "กรุงเทพฯ",
    type: "วัดเลขเด็ด",
    merit: "ขอเลขดัง ล็อตเตอรี่ โชคลาภ",
    icon: "🎱",
    gmaps: "https://maps.google.com/?q=Wat+Sam+Phraya+Bangkok",
    special: "ดังเรื่องเลข",
    line: null,
  },
  {
    name: "วัดหลวงพ่อโสธร",
    nameEn: "Luang Pho Sothon",
    location: "ฉะเชิงเทรา",
    type: "วัดศักดิ์สิทธิ์",
    merit: "ขอพรทุกเรื่อง แก้ชง สะเดาะเคราะห์",
    icon: "🙏",
    gmaps: "https://maps.google.com/?q=Wat+Sothon+Wararam+Chachoengsao",
    special: "ศักดิ์สิทธิ์",
    line: "@wat-sothon",
  },
  {
    name: "วัดอรุณราชวราราม",
    nameEn: "Wat Arun",
    location: "กรุงเทพฯ",
    type: "วัดสวยงาม",
    merit: "ขอพรความรัก ความสำเร็จ",
    icon: "🌅",
    gmaps: "https://maps.google.com/?q=Wat+Arun+Bangkok",
    special: "เปิดทุกวัน",
    line: null,
  },
  {
    name: "วัดพระสิงห์",
    nameEn: "Wat Phra Singh",
    location: "เชียงใหม่",
    type: "วัดเหนือ",
    merit: "ขอพรความเจริญ รุ่งเรือง",
    icon: "🦁",
    gmaps: "https://maps.google.com/?q=Wat+Phra+Singh+Chiang+Mai",
    special: "ล้านนา",
    line: null,
  },
];

const MERIT_TIPS = [
  { icon: "🕯️", tip: "จุดธูปเทียน — อธิษฐานด้วยจิตใจที่บริสุทธิ์" },
  { icon: "🌸", tip: "ถวายดอกบัว — สัญลักษณ์แห่งความบริสุทธิ์" },
  { icon: "🍚", tip: "ตักบาตรตอนเช้า — เพิ่มบุญบารมีทุกวัน" },
  { icon: "💰", tip: "ทำบุญตามกำลัง — ไม่ต้องมาก แต่ทำด้วยใจ" },
];

function NearbyTempleButton() {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  function handleFindNearby() {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Google Maps search for temples near current location
        const url = `https://www.google.com/maps/search/วัด/@${latitude},${longitude},15z`;
        setStatus("done");
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(() => setStatus("idle"), 3000);
      },
      () => {
        // Fallback: open Google Maps search for temples in Thailand
        window.open("https://www.google.com/maps/search/วัด+ใกล้ฉัน", "_blank", "noopener,noreferrer");
        setStatus("idle");
      },
      { timeout: 8000 }
    );
  }

  return (
    <div style={{ textAlign: "center", marginBottom: "48px" }}>
      <button
        onClick={handleFindNearby}
        disabled={status === "loading"}
        style={{
          background: status === "done"
            ? "linear-gradient(135deg, #1B5E20, #2E7D32)"
            : "linear-gradient(135deg, #8B6914, #D4A017, #F5D76E, #D4A017, #8B6914)",
          backgroundSize: "300% auto",
          animation: status === "done" ? "none" : "shimmer 3s linear infinite",
          color: status === "done" ? "#fff" : "#0D0600",
          border: "none",
          borderRadius: "50px",
          padding: "16px 40px",
          fontSize: "17px",
          fontWeight: 700,
          fontFamily: "'Sarabun', sans-serif",
          cursor: status === "loading" ? "wait" : "pointer",
          boxShadow: "0 4px 30px rgba(212,160,23,0.5)",
          letterSpacing: "1px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          transition: "all 0.3s ease",
          opacity: status === "loading" ? 0.8 : 1,
        }}
      >
        <span style={{ fontSize: "22px" }}>
          {status === "loading" ? "⏳" : status === "done" ? "✅" : "📍"}
        </span>
        {status === "loading" ? "กำลังหาตำแหน่ง..." : status === "done" ? "เปิด Google Maps แล้ว!" : "วัดใกล้ฉัน"}
      </button>
      <p style={{ color: "rgba(245,214,160,0.3)", fontSize: "12px", marginTop: "12px" }}>
        {status === "loading"
          ? "กรุณาอนุญาตการเข้าถึงตำแหน่ง..."
          : "ใช้ GPS ค้นหาวัดที่ใกล้คุณที่สุดใน Google Maps"}
      </p>
    </div>
  );
}

export default function MeritSection() {
  return (
    <section style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🙏</div>
        <p style={{
          fontSize: "12px", letterSpacing: "6px",
          color: "rgba(212,160,23,0.6)",
          textTransform: "uppercase", marginBottom: "16px",
        }}>
          ✦ เสริมดวง ✦
        </p>
        <h2 className="text-gold" style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "clamp(26px,5vw,44px)",
          fontWeight: 900, marginBottom: "16px",
        }}>
          วัดมงคลใกล้คุณ
        </h2>
        <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
          เสริมดวงด้วยการทำบุญ — แนะนำวัดดังทั่วไทยสำหรับแต่ละความต้องการ
        </p>
        <div className="ornament" style={{ maxWidth: "300px", margin: "24px auto 0" }}>✦</div>
      </div>

      {/* Find nearby temple — GPS button */}
      <NearbyTempleButton />

      {/* Merit tips */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "48px",
      }}>
        {MERIT_TIPS.map((t, i) => (
          <div key={i} className="card-premium" style={{
            padding: "20px", textAlign: "center",
          }}>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{t.icon}</div>
            <p style={{ color: "rgba(245,214,160,0.7)", fontSize: "13px", lineHeight: 1.6 }}>{t.tip}</p>
          </div>
        ))}
      </div>

      {/* Temple cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginBottom: "48px",
      }}>
        {TEMPLES.map(temple => (
          <div key={temple.name} className="card-premium" style={{
            padding: "28px",
            transition: "transform 0.2s ease",
          }}>
            {/* Badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <span style={{ fontSize: "36px" }}>{temple.icon}</span>
              <span style={{
                background: "rgba(212,160,23,0.15)",
                border: "1px solid rgba(212,160,23,0.3)",
                borderRadius: "50px",
                padding: "4px 12px",
                fontSize: "11px",
                color: "#D4A017",
                letterSpacing: "1px",
              }}>
                {temple.special}
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Sarabun', sans-serif",
              fontSize: "18px", fontWeight: 700,
              color: "#F5D76E", marginBottom: "4px",
            }}>
              {temple.name}
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(212,160,23,0.5)", marginBottom: "4px", letterSpacing: "1px" }}>
              {temple.nameEn}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(245,214,160,0.4)", marginBottom: "12px" }}>
              📍 {temple.location} · {temple.type}
            </p>

            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.2), transparent)",
              marginBottom: "12px",
            }} />

            <p style={{ fontSize: "14px", color: "rgba(245,214,160,0.7)", marginBottom: "20px", lineHeight: 1.6 }}>
              🙏 {temple.merit}
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href={temple.gmaps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  background: "rgba(212,160,23,0.1)",
                  border: "1px solid rgba(212,160,23,0.3)",
                  borderRadius: "50px",
                  padding: "10px 16px",
                  color: "#D4A017",
                  fontSize: "13px",
                  textDecoration: "none",
                  textAlign: "center",
                  fontFamily: "'Sarabun', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                📍 แผนที่
              </a>
              {temple.line && (
                <a
                  href={`https://line.me/R/ti/p/${temple.line}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    background: "rgba(0,195,0,0.1)",
                    border: "1px solid rgba(0,195,0,0.3)",
                    borderRadius: "50px",
                    padding: "10px 16px",
                    color: "#00C300",
                    fontSize: "13px",
                    textDecoration: "none",
                    textAlign: "center",
                    fontFamily: "'Sarabun', sans-serif",
                  }}
                >
                  💬 Line
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA to submit temple */}
      <div className="card-premium" style={{
        padding: "36px", textAlign: "center",
        borderStyle: "dashed",
      }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>🏛️</div>
        <h3 style={{ color: "#F5D76E", fontFamily: "'Sarabun', sans-serif", fontSize: "18px", marginBottom: "8px" }}>
          มีวัดที่ต้องการแนะนำ?
        </h3>
        <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "14px", marginBottom: "20px" }}>
          ส่งข้อมูลวัดของคุณมาได้เลย เราจะเพิ่มให้ฟรี
        </p>
        <a
          href="https://line.me/R/ti/p/@daonumchok"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "rgba(0,195,0,0.15)",
            border: "1px solid rgba(0,195,0,0.4)",
            borderRadius: "50px",
            padding: "12px 32px",
            color: "#00C300",
            fontSize: "15px",
            textDecoration: "none",
            fontFamily: "'Sarabun', sans-serif",
            fontWeight: 700,
          }}
        >
          💬 ติดต่อผ่าน Line
        </a>
      </div>
    </section>
  );
}
