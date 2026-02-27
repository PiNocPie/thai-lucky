"use client";

export default function WeeklyCalendar({ weekDays }) {
  return (
    <div className="card-premium" style={{ padding: "32px", marginBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <p style={{
          fontSize: "12px", letterSpacing: "4px",
          color: "rgba(212,160,23,0.6)", textTransform: "uppercase",
        }}>
          ✦ ปฏิทินโชค 7 วัน ✦
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
        {weekDays.map((day, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            padding: "12px 4px",
            borderRadius: "14px",
            background: day.isToday
              ? "linear-gradient(145deg, rgba(212,160,23,0.2), rgba(212,160,23,0.1))"
              : "rgba(212,160,23,0.04)",
            border: day.isToday
              ? "1px solid rgba(212,160,23,0.6)"
              : "1px solid rgba(212,160,23,0.1)",
            position: "relative",
          }}>
            {/* Day label */}
            <span style={{
              fontSize: "10px",
              color: day.isToday ? "#D4A017" : "rgba(245,214,160,0.4)",
              fontFamily: "'Kanit', 'Sarabun', sans-serif",
              fontWeight: day.isToday ? 600 : 400,
              letterSpacing: "0.5px",
            }}>
              {day.dayLabel}
            </span>

            {/* Date number */}
            <span style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: day.isToday ? "#F5D76E" : "rgba(245,214,160,0.7)",
            }}>
              {day.date}
            </span>

            {/* Score stars / indicator */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              {/* Visual score bar */}
              <div style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5].map(s => (
                  <div key={s} style={{
                    width: "4px", height: "4px",
                    borderRadius: "50%",
                    background: s <= day.score
                      ? day.color
                      : "rgba(212,160,23,0.12)",
                    boxShadow: s <= day.score && day.score >= 4
                      ? `0 0 4px ${day.color}`
                      : "none",
                  }} />
                ))}
              </div>

              {/* Level label */}
              <span style={{
                fontSize: "9px",
                color: day.color,
                fontFamily: "'Sarabun', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}>
                {day.level}
              </span>
            </div>

            {/* Today badge */}
            {day.isToday && (
              <div style={{
                position: "absolute",
                top: "-8px",
                background: "linear-gradient(135deg, #8B6914, #D4A017)",
                borderRadius: "50px",
                padding: "2px 8px",
                fontSize: "8px",
                color: "#0D0600",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}>
                วันนี้
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: "flex", gap: "20px", justifyContent: "center",
        marginTop: "20px", flexWrap: "wrap",
      }}>
        {[
          { color: "#D4A017", label: "ดีมาก (4-5 ⭐)" },
          { color: "rgba(245,214,160,0.4)", label: "ปกติ (3 ⭐)" },
          { color: "#8B0000", label: "ระวัง (1-2 ⭐)" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color }} />
            <span style={{ fontSize: "11px", color: "rgba(245,214,160,0.4)" }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Premium upsell for next week */}
      <div style={{
        marginTop: "20px",
        padding: "14px 18px",
        background: "rgba(212,160,23,0.06)",
        borderRadius: "12px",
        border: "1px dashed rgba(212,160,23,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
      }}>
        <div>
          <p style={{ fontSize: "13px", color: "rgba(245,214,160,0.6)" }}>
            🔒 ดูปฏิทินโชคทั้งเดือน + วันดีสำหรับธุรกิจ
          </p>
        </div>
        <button className="btn-gold" style={{ padding: "8px 20px", fontSize: "12px", whiteSpace: "nowrap" }}>
          Premium ฿99
        </button>
      </div>
    </div>
  );
}
