"use client";
import { useRef, useState } from "react";

export default function ShareCard({ luckyNumbers, zodiac, date }) {
  const canvasRef = useRef(null);
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);

  function drawCard() {
    const canvas = canvasRef.current;
    const W = 800, H = 440;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#1e0800");
    bg.addColorStop(0.5, "#0D0600");
    bg.addColorStop(1, "#1a0500");
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 24);
    ctx.fill();

    // Outer gold border
    ctx.strokeStyle = "rgba(212,160,23,0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(8, 8, W - 16, H - 16, 20);
    ctx.stroke();

    // Inner thin border
    ctx.strokeStyle = "rgba(212,160,23,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(16, 16, W - 32, H - 32, 16);
    ctx.stroke();

    // Top label
    ctx.fillStyle = "rgba(212,160,23,0.65)";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "4px";
    ctx.fillText("✦  เลขมงคลประจำวัน  ✦", W / 2, 58);

    // Zodiac + date
    ctx.fillStyle = "rgba(245,214,160,0.45)";
    ctx.font = "13px sans-serif";
    ctx.fillText(`ปี${zodiac.th} (${zodiac.en})  ·  ${date.be}`, W / 2, 82);

    // Divider
    const divGrad = ctx.createLinearGradient(100, 0, W - 100, 0);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.5, "rgba(212,160,23,0.35)");
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 98); ctx.lineTo(W - 100, 98);
    ctx.stroke();

    // Single digit circles
    const digits = luckyNumbers.singleDigits;
    const circleY = 175;
    const startX = W / 2 - (digits.length - 1) * 60;
    digits.forEach((n, i) => {
      const cx = startX + i * 120;
      // Glow
      const glow = ctx.createRadialGradient(cx, circleY, 0, cx, circleY, 42);
      glow.addColorStop(0, "rgba(212,160,23,0.3)");
      glow.addColorStop(1, "rgba(212,160,23,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, circleY, 42, 0, Math.PI * 2);
      ctx.fill();
      // Circle border
      ctx.strokeStyle = "rgba(212,160,23,0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, circleY, 34, 0, Math.PI * 2);
      ctx.stroke();
      // Number
      ctx.fillStyle = "#F5D76E";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(n), cx, circleY + 11);
    });

    // Sub label
    ctx.fillStyle = "rgba(212,160,23,0.45)";
    ctx.font = "12px sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("เลข 2 ตัวท้าย มงคล", W / 2, 235);

    // Big 2-digit numbers
    const twoDigits = luckyNumbers.twoDigitLucky;
    const tdStartX = W / 2 - (twoDigits.length - 1) * 100;
    twoDigits.forEach((n, i) => {
      const x = tdStartX + i * 200;
      // Glow behind
      const g = ctx.createRadialGradient(x, 310, 0, x, 310, 70);
      g.addColorStop(0, "rgba(212,160,23,0.18)");
      g.addColorStop(1, "rgba(212,160,23,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - 70, 260, 140, 100);

      ctx.fillStyle = "#F5D76E";
      ctx.font = "bold 80px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(n, x, 330);
    });

    // Divider 2
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 360); ctx.lineTo(W - 100, 360);
    ctx.stroke();

    // Watermark
    ctx.fillStyle = "rgba(212,160,23,0.4)";
    ctx.font = "13px sans-serif";
    ctx.letterSpacing = "1px";
    ctx.fillText("🪷  ดาวนำโชค — Lucky Star Oracle", W / 2, 400);

    setGenerated(true);
  }

  function handleDownload() {
    setDownloading(true);
    drawCard();
    setTimeout(() => {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      link.download = "เลขมงคลวันนี้.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    }, 100);
  }

  async function handleShare() {
    drawCard();
    await new Promise(r => setTimeout(r, 100));
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const file = new File([blob], "เลขมงคลวันนี้.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        try { await navigator.share({ files: [file], title: "เลขมงคลวันนี้", text: "🪷 เลขมงคลประจำวันจาก ดาวนำโชค" }); } catch {}
      } else {
        handleDownload();
      }
    });
  }

  return (
    <div className="card-premium" style={{ padding: "36px", marginBottom: "24px", textAlign: "center" }}>
      <p style={{ fontSize: "12px", letterSpacing: "4px", color: "rgba(212,160,23,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>
        ✦ บันทึกและแชร์ ✦
      </p>
      <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "13px", marginBottom: "24px" }}>
        สร้างรูปเลขมงคลของคุณ แชร์ไปยัง Line, Instagram หรือบันทึกลงเครื่อง
      </p>

      {/* Canvas preview (hidden until generated) */}
      <canvas
        ref={canvasRef}
        style={{
          display: generated ? "block" : "none",
          maxWidth: "100%",
          borderRadius: "12px",
          marginBottom: "16px",
          border: "1px solid rgba(212,160,23,0.3)",
        }}
      />

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={handleShare}
          style={{
            background: "linear-gradient(135deg, #8B6914, #D4A017, #F5D76E, #D4A017, #8B6914)",
            backgroundSize: "300% auto",
            animation: "shimmer 3s linear infinite",
            color: "#0D0600",
            border: "none",
            borderRadius: "50px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "'Sarabun', sans-serif",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>📤</span> แชร์รูปเลขมงคล
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            background: "rgba(212,160,23,0.1)",
            border: "1px solid rgba(212,160,23,0.4)",
            borderRadius: "50px",
            padding: "14px 28px",
            fontSize: "15px",
            fontWeight: 700,
            color: "#D4A017",
            fontFamily: "'Sarabun', sans-serif",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>💾</span> {downloading ? "กำลังสร้าง..." : "บันทึกรูป"}
        </button>
      </div>
    </div>
  );
}
