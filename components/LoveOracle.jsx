"use client";
import { useState } from "react";

// Questions asked one by one to build suspense
const QUESTIONS = [
  {
    id: "feeling",
    question: "ตอนนี้คุณรู้สึกยังไงกับเขา/เธอ?",
    emoji: "💭",
    options: [
      { label: "ตื่นเต้นมาก", value: 5, emoji: "🥰" },
      { label: "ชอบแต่ไม่แน่ใจ", value: 3, emoji: "🤔" },
      { label: "สับสนอยู่", value: 2, emoji: "😵‍💫" },
      { label: "เพิ่งเริ่มรู้จัก", value: 4, emoji: "🌱" },
    ],
  },
  {
    id: "sign",
    question: "คุณรู้สึกว่าเขา/เธอ สนใจคุณไหม?",
    emoji: "👀",
    options: [
      { label: "สนใจแน่นอน!", value: 5, emoji: "💯" },
      { label: "น่าจะสนใจ", value: 4, emoji: "🙂" },
      { label: "ไม่แน่ใจเลย", value: 2, emoji: "😅" },
      { label: "ดูไม่ออกเลย", value: 1, emoji: "😶" },
    ],
  },
  {
    id: "reply_speed",
    question: "เขา/เธอ ตอบแชทเราไวแค่ไหน?",
    emoji: "⚡",
    options: [
      { label: "ตอบไวมากเลย!", value: 5, emoji: "🚀" },
      { label: "ตอบพอควร", value: 3, emoji: "🙂" },
      { label: "ตอบช้าบ้าง", value: 2, emoji: "⏳" },
      { label: "แทบไม่ตอบ", value: 1, emoji: "👻" },
    ],
  },
  {
    id: "story_view",
    question: "เขา/เธอ เข้ามาดูสตอรี่เราบ่อยไหม?",
    emoji: "👁️",
    options: [
      { label: "ดูทุกสตอรี่เลย!", value: 5, emoji: "🔥" },
      { label: "ดูบ่อยพอสมควร", value: 4, emoji: "😊" },
      { label: "ดูบางทีเท่านั้น", value: 2, emoji: "🌙" },
      { label: "ไม่ค่อยดูเลย", value: 1, emoji: "😶" },
    ],
  },
  {
    id: "story_react",
    question: "เขา/เธอ กดหัวใจหรือ react สตอรี่เราไหม?",
    emoji: "❤️",
    options: [
      { label: "กดบ่อยมาก! ❤️🔥", value: 5, emoji: "🥰" },
      { label: "กดบ้างบางครั้ง", value: 3, emoji: "😊" },
      { label: "แทบไม่กดเลย", value: 2, emoji: "😅" },
      { label: "ไม่เคยกดเลย", value: 1, emoji: "😔" },
    ],
  },
  {
    id: "frequency",
    question: "คุยกันบ่อยแค่ไหน?",
    emoji: "💬",
    options: [
      { label: "ทุกวัน", value: 5, emoji: "🔥" },
      { label: "เกือบทุกวัน", value: 4, emoji: "😊" },
      { label: "บางครั้ง", value: 2, emoji: "🌙" },
      { label: "แทบไม่คุย", value: 1, emoji: "🌵" },
    ],
  },
  {
    id: "gut",
    question: "ลึกๆ ในใจ คุณรู้สึกว่า...",
    emoji: "🫀",
    options: [
      { label: "เขา/เธอคือคนของฉัน", value: 5, emoji: "💖" },
      { label: "อาจจะใช่ก็ได้", value: 3, emoji: "✨" },
      { label: "ยังไม่รู้เลย", value: 2, emoji: "🌊" },
      { label: "แค่อยากรู้ดวง", value: 1, emoji: "🔮" },
    ],
  },
];

// Results based on average score
function getLoveResult(totalScore, maxScore) {
  const pct = totalScore / maxScore;
  if (pct >= 0.85) return {
    title: "ใช่เลย! คนนี้คือโชคชะตา 💖",
    verdict: "ใช่",
    verdictColor: "#FF69B4",
    stars: 5,
    message: "ดวงชะตาของคุณส่งสัญญาณชัดมาก ✨ ความรู้สึกที่มีต่อกันนั้นพิเศษและไม่ธรรมดา โอกาสในการเป็นคู่รักที่ดีสูงมาก อย่าปล่อยให้โอกาสนี้หลุดมือ",
    advice: "💡 เหมาะที่สุดที่จะบอกความในใจในช่วงนี้",
    lucky: "🌹 สีชมพูและสีทองจะช่วยเสริมดวงความรักของคุณ",
    emoji: "💕",
  };
  if (pct >= 0.65) return {
    title: "มีสัญญาณดีอยู่นะ! 🌸",
    verdict: "น่าจะใช่",
    verdictColor: "#FF8C00",
    stars: 4,
    message: "ดวงชี้ว่ามีความเป็นไปได้ที่ดี แต่ยังต้องใช้เวลาและความพยายามอีกเล็กน้อย ความสัมพันธ์นี้มีพื้นฐานที่แข็งแรงถ้าทั้งสองฝ่ายเปิดใจ",
    advice: "💡 ลองใช้เวลาด้วยกันให้มากขึ้น พูดคุยเรื่องที่ลึกกว่าเดิม",
    lucky: "🌸 วันศุกร์เป็นวันดีที่สุดสำหรับความรักของคุณ",
    emoji: "🌷",
  };
  if (pct >= 0.45) return {
    title: "ยังคลุมเครืออยู่ 🌙",
    verdict: "ยังไม่แน่",
    verdictColor: "#D4A017",
    stars: 3,
    message: "ดวงบอกว่าความสัมพันธ์นี้ยังอยู่ในช่วงเปลี่ยนผ่าน ทั้งสองฝ่ายอาจยังไม่พร้อมเต็มที่ ให้เวลาและพื้นที่กันและกัน",
    advice: "💡 อย่าเร่ง ปล่อยให้ความสัมพันธ์พัฒนาตามธรรมชาติ",
    lucky: "🌙 ทำบุญวันจันทร์เพื่อเสริมดวงความรัก",
    emoji: "🌕",
  };
  return {
    title: "เวลายังไม่ถึง 🌱",
    verdict: "ยังไม่ใช่",
    verdictColor: "#6B9EFF",
    stars: 2,
    message: "ดวงชี้ว่าตอนนี้ไม่ใช่เวลาที่เหมาะสม อาจจะต้องรอให้ดาวดวงอื่นเข้ามาช่วย หรืออาจมีคนที่เหมาะสมกว่ารอคุณอยู่ข้างหน้า",
    advice: "💡 รักตัวเองให้มากขึ้นก่อน โชคความรักจะตามมาเอง",
    lucky: "🌱 เปิดใจรับคนใหม่ในช่วง 3 เดือนข้างหน้า",
    emoji: "🌟",
  };
}

export default function LoveOracle({ lifePathNumber }) {
  const [step, setStep] = useState("intro"); // intro | questions | reveal | result
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState([]);
  const [result, setResult] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  function startOracle() {
    setStep("questions");
    setCurrentQ(0);
    setScores([]);
  }

  function handleAnswer(value) {
    setSelectedOption(value);
    setTimeout(() => {
      const newScores = [...scores, value];
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
        setScores(newScores);
      } else {
        // Calculate result
        const total    = newScores.reduce((a, b) => a + b, 0);
        const maxScore = QUESTIONS.length * 5;
        // Blend with life path for personalization
        const blended  = total + (lifePathNumber % 3);
        setResult(getLoveResult(Math.min(blended, maxScore), maxScore));
        setStep("reveal");
      }
    }, 400);
  }

  function handleReveal() {
    setFlipped(true);
    setTimeout(() => setStep("result"), 600);
  }

  function reset() {
    setStep("intro");
    setCurrentQ(0);
    setScores([]);
    setResult(null);
    setFlipped(false);
    setSelectedOption(null);
  }

  const q = QUESTIONS[currentQ];

  return (
    <div className="card-premium" style={{
      padding: "36px 28px",
      marginBottom: "24px",
      borderColor: "rgba(255,105,180,0.3)",
      background: "linear-gradient(145deg, rgba(30,5,15,0.98), rgba(15,3,8,0.99))",
    }}>

      {/* Header */}
      <p style={{
        fontSize: "12px", letterSpacing: "4px",
        color: "rgba(255,105,180,0.6)", textTransform: "uppercase",
        marginBottom: "8px", textAlign: "center",
      }}>
        ✦ ดูดวงความรัก ✦
      </p>
      <h3 style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "clamp(18px,4vw,26px)",
        color: "#FFB6C1",
        textAlign: "center",
        marginBottom: "4px",
      }}>
        คนนี้ใช่หรือไม่?
      </h3>
      <p style={{ textAlign: "center", color: "rgba(255,182,193,0.4)", fontSize: "13px", marginBottom: "24px" }}>
        ดาวจะตอบคำถามในใจคุณ 🔮
      </p>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,105,180,0.3), transparent)",
        marginBottom: "28px",
      }} />

      {/* ── INTRO ─────────────────────────────────────── */}
      {step === "intro" && (
        <div style={{ textAlign: "center" }}>
          <div className="animate-float" style={{ fontSize: "72px", marginBottom: "20px", lineHeight: 1 }}>🔮</div>
          <p style={{ color: "rgba(255,182,193,0.7)", fontSize: "15px", lineHeight: 1.9, marginBottom: "28px" }}>
            ตอบคำถาม 4 ข้อ<br />แล้วพลิกไพ่ดูชะตารัก
          </p>
          <button
            onClick={startOracle}
            style={{
              background: "linear-gradient(135deg, #8B0038, #C2185B, #FF4081)",
              backgroundSize: "200% auto",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "14px 40px",
              fontSize: "16px",
              fontFamily: "'Sarabun', sans-serif",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 30px rgba(194,24,91,0.5)",
              letterSpacing: "1px",
            }}
          >
            เริ่มดูดวงความรัก ❤️
          </button>
        </div>
      )}

      {/* ── QUESTIONS ─────────────────────────────────── */}
      {step === "questions" && (
        <div style={{ textAlign: "center" }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{
                height: "4px", flex: 1, maxWidth: "60px",
                borderRadius: "4px",
                background: i <= currentQ
                  ? "linear-gradient(135deg, #C2185B, #FF4081)"
                  : "rgba(255,105,180,0.15)",
                transition: "background 0.3s ease",
                boxShadow: i === currentQ ? "0 0 8px rgba(255,64,129,0.6)" : "none",
              }} />
            ))}
          </div>

          <div style={{ fontSize: "40px", marginBottom: "12px" }}>{q.emoji}</div>
          <p style={{
            fontSize: "clamp(15px, 3vw, 18px)",
            color: "#FFB6C1",
            fontFamily: "'Sarabun', sans-serif",
            fontWeight: 600,
            marginBottom: "24px",
            lineHeight: 1.6,
          }}>
            {q.question}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.value)}
                style={{
                  background: selectedOption === opt.value
                    ? "linear-gradient(135deg, rgba(194,24,91,0.4), rgba(255,64,129,0.2))"
                    : "rgba(255,105,180,0.06)",
                  border: selectedOption === opt.value
                    ? "1px solid rgba(255,64,129,0.8)"
                    : "1px solid rgba(255,105,180,0.2)",
                  borderRadius: "14px",
                  padding: "16px 12px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  transform: selectedOption === opt.value ? "scale(0.97)" : "scale(1)",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{opt.emoji}</div>
                <p style={{
                  fontSize: "13px",
                  color: selectedOption === opt.value ? "#FFB6C1" : "rgba(255,182,193,0.65)",
                  fontFamily: "'Sarabun', sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}>
                  {opt.label}
                </p>
              </button>
            ))}
          </div>

          <p style={{ color: "rgba(255,182,193,0.3)", fontSize: "12px", marginTop: "16px" }}>
            คำถาม {currentQ + 1} จาก {QUESTIONS.length}
          </p>
        </div>
      )}

      {/* ── REVEAL (card face-down, tap to flip) ──────── */}
      {step === "reveal" && (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,182,193,0.7)", fontSize: "15px", marginBottom: "28px" }}>
            ดาวได้รับคำถามแล้ว ✨<br />
            <strong style={{ color: "#FFB6C1" }}>พลิกไพ่เพื่อดูคำตอบ!</strong>
          </p>

          {/* Flip card */}
          <div
            onClick={handleReveal}
            style={{
              width: "200px",
              height: "280px",
              margin: "0 auto 28px",
              cursor: "pointer",
              perspective: "1000px",
            }}
          >
            <div style={{
              width: "100%", height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s ease",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}>
              {/* Card back */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                background: "linear-gradient(145deg, #1a0010, #2d0018)",
                border: "2px solid rgba(255,105,180,0.5)",
                borderRadius: "20px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "12px",
                boxShadow: "0 0 40px rgba(194,24,91,0.4), 0 0 80px rgba(194,24,91,0.2)",
              }}>
                <div className="animate-spin-slow" style={{ fontSize: "48px" }}>✦</div>
                <p style={{ color: "rgba(255,182,193,0.6)", fontSize: "14px", letterSpacing: "2px" }}>แตะเพื่อพลิก</p>
                <div style={{ fontSize: "24px" }}>🃏</div>
              </div>

              {/* Card front (revealed) */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(145deg, #2d0018, #1a0010)",
                border: "2px solid rgba(255,105,180,0.8)",
                borderRadius: "20px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "72px",
                boxShadow: "0 0 40px rgba(255,64,129,0.6)",
              }}>
                {result?.emoji}
              </div>
            </div>
          </div>

          <p style={{ color: "rgba(255,182,193,0.4)", fontSize: "12px" }}>
            ✦ แตะที่ไพ่เพื่อดูผล ✦
          </p>
        </div>
      )}

      {/* ── RESULT ────────────────────────────────────── */}
      {step === "result" && result && (
        <div style={{ textAlign: "center", animation: "fade-up 0.5s ease-out both" }}>
          {/* Verdict badge */}
          <div style={{
            display: "inline-block",
            background: `${result.verdictColor}22`,
            border: `2px solid ${result.verdictColor}`,
            borderRadius: "50px",
            padding: "8px 28px",
            marginBottom: "16px",
            boxShadow: `0 0 20px ${result.verdictColor}44`,
          }}>
            <span style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "18px",
              color: result.verdictColor,
              fontWeight: 700,
            }}>
              {result.verdict}
            </span>
          </div>

          <div style={{ fontSize: "48px", marginBottom: "12px" }}>{result.emoji}</div>

          <h3 style={{
            fontFamily: "'Sarabun', sans-serif",
            fontSize: "clamp(16px, 3vw, 20px)",
            color: "#FFB6C1",
            fontWeight: 700,
            marginBottom: "16px",
            lineHeight: 1.4,
          }}>
            {result.title}
          </h3>

          {/* Stars */}
          <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "20px" }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{
                fontSize: "20px",
                filter: s <= result.stars ? "none" : "grayscale(1) opacity(0.2)",
                textShadow: s <= result.stars ? `0 0 10px ${result.verdictColor}` : "none",
              }}>⭐</span>
            ))}
          </div>

          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,105,180,0.3), transparent)",
            marginBottom: "20px",
          }} />

          <p style={{
            color: "rgba(255,182,193,0.75)", fontSize: "14px",
            lineHeight: 1.9, marginBottom: "16px", textAlign: "left",
          }}>
            {result.message}
          </p>

          <div style={{
            background: "rgba(255,105,180,0.06)",
            border: "1px solid rgba(255,105,180,0.2)",
            borderRadius: "12px",
            padding: "14px 18px",
            marginBottom: "8px",
            textAlign: "left",
          }}>
            <p style={{ color: "rgba(255,182,193,0.7)", fontSize: "13px", lineHeight: 1.7 }}>{result.advice}</p>
          </div>
          <div style={{
            background: "rgba(255,105,180,0.04)",
            border: "1px solid rgba(255,105,180,0.15)",
            borderRadius: "12px",
            padding: "14px 18px",
            marginBottom: "24px",
            textAlign: "left",
          }}>
            <p style={{ color: "rgba(255,182,193,0.6)", fontSize: "13px" }}>{result.lucky}</p>
          </div>

          {/* Premium CTA for love */}
          <div style={{
            background: "rgba(194,24,91,0.08)",
            border: "1px dashed rgba(255,64,129,0.3)",
            borderRadius: "14px",
            padding: "16px",
            marginBottom: "20px",
          }}>
            <p style={{ fontSize: "13px", color: "rgba(255,182,193,0.55)" }}>
              👑 Premium: ตรวจสอบความเข้ากันแบบละเอียด + วันดีที่สุดสำหรับความรัก
            </p>
          </div>

          <button
            onClick={reset}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,105,180,0.4)",
              borderRadius: "50px",
              padding: "10px 28px",
              color: "rgba(255,182,193,0.7)",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'Sarabun', sans-serif",
            }}
          >
            🔄 ดูดวงใหม่
          </button>
        </div>
      )}
    </div>
  );
}
