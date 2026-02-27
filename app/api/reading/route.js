import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Server-side cache — same life path + day of week + date = same reading
const cache = new Map();

const ELEMENT_TH = { water: "น้ำ", earth: "ดิน", wood: "ไม้", fire: "ไฟ", metal: "โลหะ" };
const DAY_TH = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export async function POST(request) {
  try {
    const { lifePathNumber, zodiacTh, zodiacEn, element, dayOfWeek } = await request.json();

    const today = new Date().toLocaleDateString("th-TH");
    const cacheKey = `${lifePathNumber}-${dayOfWeek}-${new Date().toDateString()}`;

    if (cache.has(cacheKey)) {
      return Response.json(cache.get(cacheKey));
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `คุณเป็นหมอดูไทยผู้เชี่ยวชาญโหราศาสตร์ไทย เลขศาสตร์ และพุทธศาสนา

ข้อมูลดวงชะตาของผู้ใช้วันนี้ (${today}):
- เลขชีวิต: ${lifePathNumber}
- นักษัตร: ปี${zodiacTh} (${zodiacEn}) ธาตุ${ELEMENT_TH[element] || element}
- วันนี้วัน: ${DAY_TH[dayOfWeek]}

กรุณาเขียนคำทำนายประจำวันภาษาไทย โทนบวก ลึกซึ้ง เป็นกำลังใจ เหมาะกับดวงชะตาของคนนี้จริงๆ

ตอบเป็น JSON เท่านั้น ในรูปแบบนี้:
{
  "fortunes": [
    "คำทำนายหลัก ด้านโชคลาภและพลังงานวันนี้ (1-2 ประโยค)",
    "คำทำนายด้านความสัมพันธ์และการสื่อสาร (1-2 ประโยค)",
    "คำทำนายด้านการตัดสินใจและโอกาส (1-2 ประโยค)"
  ],
  "affirmation": "คำอธิษฐานประจำวัน 1 ประโยค สวยงาม ลึกซึ้ง เป็นแรงบันดาลใจ",
  "love": "ดวงความรักวันนี้ เจาะจงสำหรับปี${zodiacTh} เลขชีวิต ${lifePathNumber} (2-3 ประโยค)",
  "career": "ดวงการงานและการเงินวันนี้ (2-3 ประโยค)",
  "money": "ดวงการเงินและโชคลาภวันนี้ โดยเฉพาะ (2-3 ประโยค)",
  "warning": "สิ่งที่ควรระวังหรือข้อแนะนำสั้นๆ วันนี้ (1 ประโยค)"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json\n?|\n?```/g, "").trim();
    const data = JSON.parse(text);

    // Cache for this session
    cache.set(cacheKey, data);
    // Clean old cache entries (keep max 100)
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return Response.json(data);
  } catch (err) {
    console.error("Gemini API error:", err);
    return Response.json({ error: true, message: err.message }, { status: 500 });
  }
}
