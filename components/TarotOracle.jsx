"use client";
import { useState, useEffect } from "react";

// ─── Daily limit ────────────────────────────────────────────────────────────
const DAILY_FREE_LIMIT = 3;

function getDailyUsage() {
  if (typeof window === "undefined") return { count: 0, date: "" };
  const today = new Date().toDateString();
  const saved = JSON.parse(localStorage.getItem("oracleUsage") || "{}");
  if (saved.date !== today) return { count: 0, date: today };
  return saved;
}
function incrementUsage() {
  const today = new Date().toDateString();
  const { count } = getDailyUsage();
  localStorage.setItem("oracleUsage", JSON.stringify({ date: today, count: count + 1 }));
}

// ─── Questions per topic ─────────────────────────────────────────────────────
const QUESTIONS = {
  love: [
    { q: "ตอนนี้คุณรู้สึกยังไงกับเขา/เธอ?", emoji: "💭",
      opts: [{ l: "ตื่นเต้นมาก 🥰", v: 5 }, { l: "ชอบแต่ไม่แน่ใจ 🤔", v: 3 },
             { l: "สับสนอยู่ 😵‍💫", v: 2 }, { l: "เพิ่งเริ่มรู้จัก 🌱", v: 4 }] },
    { q: "คุณรู้สึกว่าเขา/เธอสนใจคุณไหม?", emoji: "👀",
      opts: [{ l: "สนใจแน่นอน 💯", v: 5 }, { l: "น่าจะสนใจ 🙂", v: 4 },
             { l: "ไม่แน่ใจเลย 😅", v: 2 }, { l: "ดูไม่ออกเลย 😶", v: 1 }] },
    { q: "คุยกันบ่อยแค่ไหน?", emoji: "💬",
      opts: [{ l: "ทุกวัน 🔥", v: 5 }, { l: "เกือบทุกวัน 😊", v: 4 },
             { l: "บางครั้ง 🌙", v: 2 }, { l: "แทบไม่คุย 🌵", v: 1 }] },
  ],
  money: [
    { q: "ตอนนี้การเงินของคุณเป็นยังไง?", emoji: "💸",
      opts: [{ l: "ดีมาก มีเหลือ 🤑", v: 5 }, { l: "พอใช้ไปได้ 🙂", v: 3 },
             { l: "ฝืดเคืองหน่อย 😬", v: 2 }, { l: "ต้องการความช่วยเหลือ 😰", v: 1 }] },
    { q: "คุณกำลังวางแผนอะไรอยู่?", emoji: "📊",
      opts: [{ l: "ลงทุน/ทำธุรกิจ 🚀", v: 5 }, { l: "ออมเงินระยะยาว 🏦", v: 4 },
             { l: "หารายได้เพิ่ม 💼", v: 4 }, { l: "แค่อยากรู้ดวง 🔮", v: 2 }] },
    { q: "คุณเชื่อในโชคชะตาด้านการเงินไหม?", emoji: "🪙",
      opts: [{ l: "เชื่อมากและทำบุญประจำ 🙏", v: 5 }, { l: "เชื่อบ้าง 😊", v: 3 },
             { l: "ไม่แน่ใจ 🤷", v: 2 }, { l: "ขึ้นอยู่กับตัวเองล้วนๆ 💪", v: 4 }] },
  ],
  career: [
    { q: "ตอนนี้งานของคุณเป็นยังไง?", emoji: "🏢",
      opts: [{ l: "ดีมาก กำลังรุ่ง 🚀", v: 5 }, { l: "โอเค ปกติดี 🙂", v: 3 },
             { l: "มีปัญหาบ้าง 😤", v: 2 }, { l: "กำลังหางานใหม่ 🔍", v: 3 }] },
    { q: "คุณอยากได้อะไรจากงานมากที่สุด?", emoji: "🎯",
      opts: [{ l: "เงินเดือนสูงขึ้น 💰", v: 4 }, { l: "ตำแหน่งใหม่ 👑", v: 5 },
             { l: "ความสุขในการทำงาน 😊", v: 4 }, { l: "อิสระในการทำงาน 🕊️", v: 3 }] },
    { q: "คุณพร้อมจะเปลี่ยนแปลงแค่ไหน?", emoji: "⚡",
      opts: [{ l: "พร้อม 100% ลุยเลย 💪", v: 5 }, { l: "พร้อมถ้าได้โอกาส 🌟", v: 4 },
             { l: "ลังเลอยู่ 😅", v: 2 }, { l: "ขอรอดูก่อน 🌙", v: 1 }] },
  ],
  exam: [
    { q: "คุณเตรียมตัวสอบมาแค่ไหน?", emoji: "📚",
      opts: [{ l: "เต็มที่มาก อ่านครบทุกวิชา 💪", v: 5 }, { l: "พอสมควร 📖", v: 4 },
             { l: "อ่านบ้าง แต่ยังไม่พอ 😅", v: 2 }, { l: "เพิ่งเริ่ม 😰", v: 1 }] },
    { q: "รู้สึกยังไงกับการสอบครั้งนี้?", emoji: "🎓",
      opts: [{ l: "มั่นใจมาก พร้อมแล้ว! 😤", v: 5 }, { l: "กังวลนิดหน่อย แต่โอเค 🙂", v: 4 },
             { l: "กังวลค่อนข้างมาก 😬", v: 2 }, { l: "กลัวมากเลย 😨", v: 1 }] },
    { q: "ความฝันของคุณคืออะไร?", emoji: "🌠",
      opts: [{ l: "ชัดเจนมาก รู้ว่าอยากเรียนอะไร 🎯", v: 5 },
             { l: "มีอยู่แต่ไม่แน่ใจ 🤔", v: 3 },
             { l: "กำลังค้นหาตัวเอง 🌱", v: 3 },
             { l: "ยังไม่รู้เลย 😶", v: 2 }] },
  ],
};

// ─── Card pool ───────────────────────────────────────────────────────────────
const CARD_POOL = {
  love: [
    { name: "ดาวแห่งรัก",     icon: "💖", level: 5, color: "#FF4081", msg: "ความรักที่คุณรอมานานกำลังจะมาถึง เปิดใจรับมันได้เลย" },
    { name: "พระจันทร์",      icon: "🌙", level: 4, color: "#C2185B", msg: "ความรู้สึกลึกๆ ที่ซ่อนอยู่กำลังจะถูกเปิดเผย" },
    { name: "กุหลาบแดง",      icon: "🌹", level: 5, color: "#FF1744", msg: "มีคนที่คิดถึงคุณอยู่ตลอดเวลา แต่ยังไม่กล้าบอก" },
    { name: "ลูกศรคิวปิด",   icon: "💘", level: 4, color: "#F06292", msg: "โอกาสทองของความรักกำลังมา อย่าปล่อยให้ผ่านไป" },
    { name: "หัวใจแตกสลาย",  icon: "💔", level: 2, color: "#7B1FA2", msg: "ระวังความเข้าใจผิดกับคนรัก ใจเย็นและสื่อสารให้ชัดเจน" },
    { name: "เปลวไฟแห่งรัก", icon: "🔥", level: 5, color: "#FF6D00", msg: "ความรักของคุณร้อนแรงและมั่นคง คนรักให้ความสำคัญคุณมาก" },
    { name: "ดอกบัวชมพู",    icon: "🪷", level: 3, color: "#AD1457", msg: "ความรักจะเติบโตช้าๆ แต่มั่นคง ต้องอาศัยความอดทน" },
    { name: "ดาวหาง",         icon: "☄️", level: 3, color: "#9C27B0", msg: "มีความเปลี่ยนแปลงในความรักที่ไม่คาดคิดกำลังจะเกิดขึ้น" },
  ],
  money: [
    { name: "ถุงทอง",      icon: "💰", level: 5, color: "#D4A017", msg: "โชคลาภทางการเงินกำลังเดินทางมาหาคุณ อย่าปฏิเสธโอกาส" },
    { name: "เหรียญมังกร", icon: "🪙", level: 4, color: "#F9A825", msg: "การลงทุนในช่วงนี้มีโอกาสสูงที่จะได้กำไร" },
    { name: "กราฟพุ่ง",   icon: "📈", level: 5, color: "#FFD600", msg: "รายได้เพิ่มขึ้นในไม่ช้า อาจมาจากแหล่งที่ไม่คาดคิด" },
    { name: "ดาวทอง",      icon: "⭐", level: 4, color: "#FFC107", msg: "ดวงการเงินดีมาก เหมาะสำหรับการออมและลงทุน" },
    { name: "หม้อดิน",     icon: "🏺", level: 2, color: "#8D6E63", msg: "ระวังค่าใช้จ่ายที่ไม่จำเป็น รักษาเงินที่มีไว้ก่อน" },
    { name: "เพชรมงคล",   icon: "💎", level: 5, color: "#00BCD4", msg: "มีโอกาสธุรกิจใหม่ที่จะเปลี่ยนชีวิตคุณกำลังจะมา" },
    { name: "กุญแจทอง",   icon: "🗝️", level: 4, color: "#FF8F00", msg: "กุญแจแห่งความมั่งคั่งอยู่ในมือคุณแล้ว แค่ลงมือทำ" },
    { name: "พายุฝน",      icon: "⛈️", level: 1, color: "#546E7A", msg: "หลีกเลี่ยงการเสี่ยงดวงและการพนันทุกรูปแบบในช่วงนี้" },
  ],
  career: [
    { name: "มงกุฎแห่งชัย",   icon: "👑", level: 5, color: "#D4A017", msg: "ความสำเร็จในหน้าที่การงานกำลังจะมาถึง ผู้ใหญ่ให้การสนับสนุน" },
    { name: "ดาบแห่งปัญญา",  icon: "⚔️", level: 4, color: "#7E57C2", msg: "ความกล้าและความฉลาดของคุณจะทำให้เอาชนะคู่แข่งได้" },
    { name: "จรวดพุ่ง",       icon: "🚀", level: 5, color: "#29B6F6", msg: "โปรเจกต์ที่ทำอยู่จะประสบความสำเร็จอย่างงดงาม" },
    { name: "หนังสือแห่งโชค", icon: "📚", level: 3, color: "#66BB6A", msg: "การเรียนรู้ทักษะใหม่จะเปิดประตูโอกาสให้คุณ" },
    { name: "ตาชั่ง",          icon: "⚖️", level: 3, color: "#FFA726", msg: "การตัดสินใจสำคัญกำลังรออยู่ คิดให้ดีก่อนลงมือ" },
    { name: "ดาวเหนือ",        icon: "🌟", level: 5, color: "#FFD54F", msg: "คุณกำลังเดินอยู่บนเส้นทางที่ถูกต้อง อย่าหยุด" },
    { name: "หน้ากากซ่อนเร้น", icon: "🎭", level: 2, color: "#EF5350", msg: "ระวังคนรอบข้างที่ไม่จริงใจ อย่าบอกแผนก่อนถึงเวลา" },
    { name: "คบเพลิง",         icon: "🔦", level: 4, color: "#FF7043", msg: "แนวคิดใหม่ของคุณจะสว่างไสวในความมืด ลองเสนอมันออกไป" },
  ],
  exam: [
    { name: "หนังสือทอง",     icon: "📖", level: 5, color: "#66BB6A", msg: "ความพยายามของคุณจะออกดอกผล การสอบครั้งนี้มีโอกาสสูงมาก" },
    { name: "หัวใจไฟ",        icon: "❤️‍🔥", level: 4, color: "#EF5350", msg: "ความมุ่งมั่นของคุณแข็งแกร่งมาก เชื่อมั่นในตัวเองและลงมือ" },
    { name: "ดาวแห่งปัญญา",  icon: "🌠", level: 5, color: "#5C6BC0", msg: "พลังสมองของคุณจะส่องสว่างในห้องสอบ ความจำดีเป็นพิเศษวันนั้น" },
    { name: "กุญแจห้อง",      icon: "🔑", level: 4, color: "#26C6DA", msg: "คุณมีความรู้พอแล้ว แค่ควบคุมจิตใจให้นิ่งในวันสอบ" },
    { name: "เมฆหมอก",        icon: "☁️", level: 2, color: "#90A4AE", msg: "อาจมีบางวิชาที่ยากกว่าที่คิด แต่ยังมีเวลาเตรียมตัว" },
    { name: "พระอาทิตย์ขึ้น", icon: "🌅", level: 5, color: "#FFA000", msg: "เช้าวันสอบจะเป็นจุดเริ่มต้นที่ดีของชีวิตใหม่" },
    { name: "นกฮูก",           icon: "🦉", level: 3, color: "#8D6E63", msg: "ปัญญาและความรอบรู้คือเกราะที่ดีที่สุด ทบทวนเนื้อหาอีกครั้ง" },
    { name: "สายฟ้า",          icon: "⚡", level: 4, color: "#FFCA28", msg: "ความสามารถพิเศษของคุณจะปรากฏในวันสอบอย่างไม่คาดคิด" },
  ],
};

const TOPICS = [
  { key: "love",   label: "ความรัก",   emoji: "❤️", color: "#FF4081", desc: "คนนี้ใช่ไหม?" },
  { key: "money",  label: "การเงิน",   emoji: "💰", color: "#D4A017", desc: "เงินทองจะมาไหม?" },
  { key: "career", label: "การงาน",    emoji: "💼", color: "#7E57C2", desc: "งานจะรุ่งไหม?" },
  { key: "exam",   label: "ติดมหาลัย", emoji: "🎓", color: "#26C6DA", desc: "สอบติดไหม?" },
];

const FINAL_MSG = {
  5: "ดวงของคุณดีมากในด้านนี้! 🌟 โชคชะตาเข้าข้างคุณอย่างแน่นอน",
  4: "สัญญาณดีมาก ✨ ความสำเร็จอยู่ไม่ไกล ก้าวต่อไปอย่างมั่นใจ",
  3: "ดวงกลางๆ 🌙 ยังมีโอกาสดี แต่ต้องอาศัยความพยายามเพิ่มขึ้น",
  2: "ช่วงนี้ระวังไว้ก่อน ⚠️ รอจังหวะที่ดีกว่านี้แล้วค่อยลงมือ",
  1: "ยังไม่ใช่เวลา 🌱 อดทนและเตรียมพร้อมให้ดีก่อน",
};

function pickCards(pool, seed) {
  const shuffled = [...pool].sort((a, b) => {
    const ha = (a.name.charCodeAt(0) * seed + 7) % 97;
    const hb = (b.name.charCodeAt(0) * seed + 7) % 97;
    return ha - hb;
  });
  return shuffled.slice(0, 3);
}

function ScoreBar({ level, color }) {
  return (
    <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginTop: "6px" }}>
      {[1,2,3,4,5].map(s => (
        <div key={s} style={{
          width: "18px", height: "4px", borderRadius: "2px",
          background: s <= level ? color : "rgba(255,255,255,0.1)",
          boxShadow: s <= level ? `0 0 6px ${color}` : "none",
          transition: "all 0.4s ease",
        }} />
      ))}
    </div>
  );
}

function TarotCard({ card, index, revealed, onReveal, topicColor }) {
  const [animating, setAnimating] = useState(false);
  function handleClick() {
    if (revealed || animating) return;
    setAnimating(true);
    setTimeout(() => { onReveal(index); setAnimating(false); }, 350);
  }
  return (
    <div onClick={handleClick} style={{
      width: "100%", maxWidth: "180px", aspectRatio: "2/3",
      perspective: "1000px", cursor: revealed ? "default" : "pointer", flex: "1 1 120px",
    }}>
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: revealed ? "rotateY(180deg)" : animating ? "rotateY(90deg)" : "rotateY(0deg)",
      }}>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          background: "linear-gradient(145deg, #1a0a00, #0d0500)",
          border: `2px solid ${topicColor}55`, borderRadius: "16px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
          boxShadow: `0 8px 32px ${topicColor}33`,
        }}>
          <div style={{ position: "absolute", inset: "8px", border: `1px solid ${topicColor}22`, borderRadius: "10px" }} />
          <div className="animate-spin-slow" style={{ fontSize: "36px", opacity: 0.4, color: topicColor }}>✦</div>
          <p style={{ fontSize: "10px", letterSpacing: "2px", color: `${topicColor}88`, textTransform: "uppercase" }}>แตะเพื่อพลิก</p>
          <div style={{ position: "absolute", top: "12px", left: "12px", width: "22px", height: "22px",
            border: `1px solid ${topicColor}44`, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", color: `${topicColor}88` }}>
            {index + 1}
          </div>
        </div>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
          background: `linear-gradient(145deg, ${card?.color}22, ${card?.color}08)`,
          border: `2px solid ${card?.color}99`, borderRadius: "16px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
          padding: "14px 10px",
          boxShadow: `0 0 30px ${card?.color}66, 0 8px 32px ${card?.color}44`,
        }}>
          <p style={{ fontSize: "9px", letterSpacing: "1px", color: `${card?.color}cc`,
            textTransform: "uppercase", textAlign: "center", fontFamily: "'Kanit', sans-serif" }}>
            {card?.name}
          </p>
          <div style={{ fontSize: "48px", filter: `drop-shadow(0 0 16px ${card?.color})`, lineHeight: 1 }}>{card?.icon}</div>
          <ScoreBar level={card?.level} color={card?.color} />
        </div>
      </div>
    </div>
  );
}

// ─── Paywall screen ──────────────────────────────────────────────────────────
function PaywallScreen() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔒</div>
      <h3 style={{ fontFamily: "'Kanit', sans-serif", fontSize: "22px", color: "#F5D76E", marginBottom: "8px" }}>
        ใช้ครบ 3 ครั้งแล้ววันนี้
      </h3>
      <p style={{ color: "rgba(245,214,160,0.55)", fontSize: "14px", lineHeight: 1.8, marginBottom: "24px" }}>
        การใช้งานฟรีจำกัด 3 ครั้ง/วัน<br />
        อัปเกรดเป็น Premium เพื่อใช้งาน<br />
        <strong style={{ color: "#F5D76E" }}>ไม่จำกัด ตลอดเดือน</strong>
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "260px", margin: "0 auto" }}>
        <button className="btn-gold" style={{ width: "100%", fontSize: "15px" }}>
          👑 Premium ฿99/เดือน — Unlimited
        </button>
        <p style={{ color: "rgba(245,214,160,0.3)", fontSize: "11px" }}>
          🕐 รีเซ็ตอีกครั้งพรุ่งนี้เที่ยงคืน
        </p>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function TarotOracle({ lifePathNumber = 5 }) {
  const [usage, setUsage] = useState({ count: 0, date: "" });
  const [step, setStep] = useState("topic"); // topic | questions | cards | done | limit
  const [topic, setTopic] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState([false, false, false]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => { setUsage(getDailyUsage()); }, []);

  const remaining = Math.max(0, DAILY_FREE_LIMIT - usage.count);
  const allRevealed = revealed.every(Boolean);
  const avgLevel = cards.length
    ? Math.round(cards.reduce((a, c) => a + c.level, 0) / cards.length)
    : 0;

  function selectTopic(t) {
    if (usage.count >= DAILY_FREE_LIMIT) { setStep("limit"); return; }
    setTopic(t);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOpt(null);
    setStep("questions");
  }

  function handleAnswer(val) {
    setSelectedOpt(val);
    setTimeout(() => {
      const newAnswers = [...answers, val];
      if (currentQ < QUESTIONS[topic.key].length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
        setAnswers(newAnswers);
      } else {
        // Done with questions — pick cards using answer-weighted seed
        const answerSum = newAnswers.reduce((a, b) => a + b, 0);
        const seed = lifePathNumber * 31 + new Date().getDate() * 7 + answerSum * 13;
        setCards(pickCards(CARD_POOL[topic.key], seed));
        setRevealed([false, false, false]);
        setExpandedCard(null);
        incrementUsage();
        setUsage(getDailyUsage());
        setStep("cards");
      }
    }, 380);
  }

  function revealCard(i) {
    const next = [...revealed];
    next[i] = true;
    setRevealed(next);
    setExpandedCard(i);
  }

  function reset() {
    setStep("topic");
    setTopic(null);
    setAnswers([]);
    setCurrentQ(0);
    setSelectedOpt(null);
    setRevealed([false, false, false]);
    setExpandedCard(null);
  }

  const qs = topic ? QUESTIONS[topic.key] : [];

  return (
    <div style={{
      background: "linear-gradient(145deg, rgba(10,4,20,0.98), rgba(5,2,10,0.99))",
      border: "1px solid rgba(120,80,200,0.3)",
      borderRadius: "24px",
      padding: "36px 24px",
      marginBottom: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Bg glow */}
      <div style={{
        position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)",
        width: "300px", height: "300px", borderRadius: "50%",
        background: topic ? `${topic.color}11` : "rgba(120,80,200,0.06)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px", position: "relative" }}>
        <p style={{ fontSize: "11px", letterSpacing: "5px",
          color: topic ? `${topic.color}99` : "rgba(180,140,255,0.5)",
          textTransform: "uppercase", marginBottom: "6px" }}>
          ✦ ไพ่ทำนายดวง ✦
        </p>
        <h3 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "clamp(18px,4vw,26px)",
          background: topic
            ? `linear-gradient(135deg, ${topic.color}, #fff, ${topic.color})`
            : "linear-gradient(135deg, #B39DDB, #fff, #B39DDB)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: "8px",
        }}>
          {topic ? topic.label : "เลือกด้านที่ต้องการรู้"}
        </h3>

        {/* Usage indicator */}
        {step !== "limit" && (
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", alignItems: "center" }}>
            {[...Array(DAILY_FREE_LIMIT)].map((_, i) => (
              <div key={i} style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: i < usage.count ? "rgba(255,255,255,0.15)" : "rgba(212,160,23,0.7)",
                boxShadow: i >= usage.count ? "0 0 6px rgba(212,160,23,0.5)" : "none",
                transition: "all 0.3s ease",
              }} />
            ))}
            <span style={{ fontSize: "11px", color: "rgba(245,214,160,0.35)", marginLeft: "6px" }}>
              เหลือ {remaining} ครั้ง/วัน
            </span>
          </div>
        )}
      </div>

      {/* ── LIMIT ──────────────────────────────────────────── */}
      {step === "limit" && <PaywallScreen />}

      {/* ── TOPIC SELECT ───────────────────────────────────── */}
      {step === "topic" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", maxWidth: "460px", margin: "0 auto" }}>
          {TOPICS.map(t => (
            <button key={t.key} onClick={() => selectTopic(t)} style={{
              background: `linear-gradient(145deg, ${t.color}18, ${t.color}08)`,
              border: `1px solid ${t.color}44`, borderRadius: "18px",
              padding: "22px 14px", cursor: "pointer", textAlign: "center",
              transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${t.color}44`; e.currentTarget.style.borderColor = `${t.color}99`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${t.color}44`; }}>
              <span style={{ fontSize: "34px", filter: `drop-shadow(0 0 10px ${t.color}88)` }}>{t.emoji}</span>
              <span style={{ fontFamily: "'Kanit', 'Sarabun', sans-serif", fontSize: "17px", fontWeight: 700, color: t.color }}>{t.label}</span>
              <span style={{ fontSize: "11px", color: `${t.color}77` }}>{t.desc}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── QUESTIONS ──────────────────────────────────────── */}
      {step === "questions" && topic && (
        <div style={{ textAlign: "center", maxWidth: "460px", margin: "0 auto" }}>
          {/* Progress bar */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
            {qs.map((_, i) => (
              <div key={i} style={{
                height: "4px", flex: 1, borderRadius: "4px",
                background: i <= currentQ
                  ? `linear-gradient(135deg, ${topic.color}, ${topic.color}bb)`
                  : `${topic.color}18`,
                boxShadow: i === currentQ ? `0 0 8px ${topic.color}88` : "none",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          <div style={{ fontSize: "36px", marginBottom: "10px" }}>{qs[currentQ].emoji}</div>
          <p style={{
            fontSize: "clamp(15px,3vw,18px)", color: topic.color,
            fontFamily: "'Sarabun', sans-serif", fontWeight: 600,
            marginBottom: "22px", lineHeight: 1.6,
          }}>
            {qs[currentQ].q}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {qs[currentQ].opts.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt.v)} style={{
                background: selectedOpt === opt.v
                  ? `${topic.color}33` : `${topic.color}08`,
                border: selectedOpt === opt.v
                  ? `1px solid ${topic.color}` : `1px solid ${topic.color}25`,
                borderRadius: "14px", padding: "16px 12px", cursor: "pointer",
                transition: "all 0.2s ease",
                transform: selectedOpt === opt.v ? "scale(0.97)" : "scale(1)",
              }}>
                <p style={{ fontSize: "13px", color: selectedOpt === opt.v ? topic.color : `${topic.color}88`,
                  fontFamily: "'Sarabun', sans-serif", fontWeight: 600, lineHeight: 1.4 }}>
                  {opt.l}
                </p>
              </button>
            ))}
          </div>
          <p style={{ color: `${topic.color}44`, fontSize: "11px", marginTop: "16px" }}>
            คำถาม {currentQ + 1} / {qs.length}
          </p>
        </div>
      )}

      {/* ── CARDS ──────────────────────────────────────────── */}
      {step === "cards" && topic && (
        <div>
          <p style={{ textAlign: "center", color: `${topic.color}bb`, fontSize: "13px", marginBottom: "24px", fontFamily: "'Sarabun', sans-serif" }}>
            {!revealed[0] ? "✦ แตะไพ่ใบแรกเพื่อเริ่ม ✦"
              : !revealed[1] ? "✦ พลิกไพ่ใบที่ 2 ✦"
              : !revealed[2] ? "✦ พลิกไพ่ใบสุดท้าย ✦"
              : "✦ พลิกทุกใบแล้ว! ✦"}
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
            {cards.map((card, i) => (
              <TarotCard key={i} card={card} index={i} revealed={revealed[i]} onReveal={revealCard} topicColor={topic.color} />
            ))}
          </div>

          {/* Expanded card message */}
          {expandedCard !== null && revealed[expandedCard] && (
            <div style={{
              background: `${cards[expandedCard].color}18`,
              border: `1px solid ${cards[expandedCard].color}55`,
              borderRadius: "14px", padding: "18px 22px", marginBottom: "20px",
              animation: "fade-up 0.4s ease-out both", textAlign: "center",
            }}>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: `${cards[expandedCard].color}99`,
                textTransform: "uppercase", marginBottom: "8px" }}>
                ✦ ไพ่ใบที่ {expandedCard + 1} — {cards[expandedCard].name} ✦
              </p>
              <p style={{ color: "rgba(245,230,200,0.85)", fontSize: "14px", lineHeight: 1.9, fontFamily: "'Sarabun', sans-serif" }}>
                {cards[expandedCard].msg}
              </p>
            </div>
          )}

          {/* Summary when all revealed */}
          {allRevealed && (
            <div style={{ animation: "fade-up 0.6s ease-out 0.3s both", opacity: 0, animationFillMode: "forwards" }}>
              <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${topic.color}55, transparent)`, margin: "16px 0" }} />
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "3px", color: `${topic.color}77`, marginBottom: "10px" }}>
                  ✦ ผลรวมดวง{topic.label} ✦
                </p>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "10px" }}>
                  {[1,2,3,4,5].map(s => (
                    <div key={s} style={{
                      width: "28px", height: "5px", borderRadius: "3px",
                      background: s <= avgLevel ? topic.color : `${topic.color}18`,
                      boxShadow: s <= avgLevel ? `0 0 8px ${topic.color}` : "none",
                    }} />
                  ))}
                </div>
                <p style={{ color: "rgba(245,230,200,0.8)", fontSize: "14px", lineHeight: 1.8,
                  fontFamily: "'Sarabun', sans-serif", maxWidth: "380px", margin: "0 auto" }}>
                  {FINAL_MSG[avgLevel] || FINAL_MSG[3]}
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={reset} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "50px", padding: "10px 24px",
                  color: "rgba(245,230,200,0.5)", fontSize: "13px", cursor: "pointer",
                  fontFamily: "'Sarabun', sans-serif",
                }}>← เปลี่ยนหัวข้อ</button>
              </div>

              <div style={{ marginTop: "16px", padding: "12px 16px",
                background: "rgba(255,255,255,0.03)", borderRadius: "12px",
                border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "rgba(245,230,200,0.35)" }}>
                  👑 Premium: ใช้งานไม่จำกัด + ไพ่ 5 ใบ + บันทึกผลย้อนหลัง
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
