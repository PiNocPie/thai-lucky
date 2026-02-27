"use client";

const PLANS = [
  {
    name: "ฟรี",
    nameEn: "Free",
    price: "0",
    period: "ตลอดไป",
    icon: "🌙",
    color: "rgba(212,160,23,0.2)",
    features: [
      { text: "เลขมงคลประจำวัน + เลข 2 ตัวท้าย", included: true },
      { text: "สีนำโชค · ทิศมงคล · เวลาดี", included: true },
      { text: "ดวง 3 ด้าน (รัก/งาน/เงิน) ประจำวัน", included: true },
      { text: "ปฏิทินโชค 7 วัน", included: true },
      { text: "คำอธิษฐาน + แชร์ให้เพื่อน", included: true },
      { text: "ดูดวงความรัก (คนนี้ใช่ไหม?)", included: true },
      { text: "ปฏิทินโชคทั้งเดือน", included: false },
      { text: "เลขล็อตเตอรี่ขั้นสูง", included: false },
      { text: "ความเข้ากันรายละเอียด", included: false },
    ],
    cta: "ใช้งานฟรี",
    featured: false,
  },
  {
    name: "พรีเมียม",
    nameEn: "Premium",
    price: "99",
    period: "/เดือน",
    icon: "👑",
    color: "#D4A017",
    features: [
      { text: "เลขมงคลประจำวัน", included: true },
      { text: "สีและทิศนำโชค", included: true },
      { text: "ปีนักษัตร", included: true },
      { text: "ดวงรายสัปดาห์ + รายเดือน", included: true },
      { text: "เลขล็อตเตอรี่แม่นพิเศษ", included: true },
      { text: "วันดีสำหรับธุรกิจ", included: true },
      { text: "ตรวจสอบความเข้ากัน", included: true },
      { text: "แจ้งเตือนวันมงคล", included: true },
    ],
    cta: "ทดลองฟรี 7 วัน",
    featured: true,
  },
  {
    name: "VIP",
    nameEn: "VIP Oracle",
    price: "299",
    period: "/เดือน",
    icon: "💎",
    color: "rgba(212,160,23,0.4)",
    features: [
      { text: "ทุกอย่างใน Premium", included: true },
      { text: "ดูดวงส่วนตัวกับโหร", included: true },
      { text: "รายงาน PDF รายปี", included: true },
      { text: "ชื่อมงคลแนะนำ", included: true },
      { text: "Line consultation", included: true },
    ],
    cta: "สมัคร VIP",
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <p style={{
          fontSize: "12px", letterSpacing: "6px",
          color: "rgba(212,160,23,0.6)",
          textTransform: "uppercase", marginBottom: "16px",
        }}>
          ✦ แผนราคา ✦
        </p>
        <h2 className="text-gold" style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "clamp(28px,5vw,48px)",
          fontWeight: 900, marginBottom: "16px",
        }}>
          เลือกดวงของคุณ
        </h2>
        <p style={{ color: "rgba(245,214,160,0.5)", fontSize: "16px" }}>
          เปิดประตูโชคลาภด้วยการวิเคราะห์ดวงชะตาระดับพรีเมียม
        </p>
        <div className="ornament" style={{ maxWidth: "300px", margin: "24px auto 0" }}>✦</div>
      </div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px",
        alignItems: "start",
      }}>
        {PLANS.map(plan => (
          <div key={plan.name} className={plan.featured ? "animate-glow-pulse" : ""} style={{
            background: plan.featured
              ? "linear-gradient(145deg, rgba(40, 15, 0, 0.98), rgba(20, 8, 0, 0.99))"
              : "linear-gradient(145deg, rgba(20, 8, 0, 0.95), rgba(10, 4, 0, 0.98))",
            border: plan.featured ? "2px solid rgba(212,160,23,0.7)" : "1px solid rgba(212,160,23,0.2)",
            borderRadius: "24px",
            padding: "36px 28px",
            position: "relative",
            overflow: "hidden",
            transform: plan.featured ? "scale(1.04)" : "scale(1)",
          }}>
            {plan.featured && (
              <div style={{
                position: "absolute",
                top: "0", left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #8B6914, #D4A017, #F5D76E)",
                padding: "6px 24px",
                borderRadius: "0 0 16px 16px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#0D0600",
                textTransform: "uppercase",
              }}>
                แนะนำ ★
              </div>
            )}

            {/* Plan icon + name */}
            <div style={{ textAlign: "center", marginBottom: "24px", marginTop: plan.featured ? "16px" : "0" }}>
              <div style={{ fontSize: "40px", marginBottom: "8px" }}>{plan.icon}</div>
              <h3 style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "20px",
                color: plan.featured ? "#F5D76E" : "rgba(245,214,160,0.7)",
              }}>{plan.name}</h3>
              <p style={{ fontSize: "11px", letterSpacing: "2px", color: "rgba(212,160,23,0.4)", marginTop: "4px" }}>
                {plan.nameEn}
              </p>
            </div>

            {/* Price */}
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "48px",
                fontWeight: 900,
                background: plan.featured
                  ? "linear-gradient(135deg, #D4A017, #F5D76E)"
                  : "linear-gradient(135deg, rgba(212,160,23,0.6), rgba(245,214,160,0.4))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                ฿{plan.price}
              </span>
              <span style={{ color: "rgba(245,214,160,0.4)", fontSize: "14px", marginLeft: "4px" }}>
                {plan.period}
              </span>
            </div>

            {/* Divider */}
            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.3), transparent)",
              marginBottom: "24px",
            }} />

            {/* Features */}
            <ul style={{ listStyle: "none", marginBottom: "32px" }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(212,160,23,0.06)",
                  color: f.included ? "rgba(245,214,160,0.85)" : "rgba(245,214,160,0.25)",
                  fontSize: "14px",
                }}>
                  <span style={{ color: f.included ? "#D4A017" : "rgba(212,160,23,0.2)", flexShrink: 0 }}>
                    {f.included ? "◆" : "◇"}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {plan.featured ? (
              <button className="btn-gold" style={{ width: "100%" }}>
                {plan.cta}
              </button>
            ) : (
              <button style={{
                width: "100%",
                background: "transparent",
                border: "1px solid rgba(212,160,23,0.4)",
                color: "rgba(212,160,23,0.8)",
                borderRadius: "50px",
                padding: "14px",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "'Sarabun', sans-serif",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
              }}>
                {plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p style={{ textAlign: "center", marginTop: "40px", color: "rgba(245,214,160,0.3)", fontSize: "13px" }}>
        ✦ ยกเลิกได้ทุกเมื่อ · ปลอดภัย 100% · รับชำระผ่าน PromptPay ✦
      </p>
    </section>
  );
}
