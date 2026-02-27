// Thai Astrology Engine
// Combines Thai zodiac (นักษัตร), Buddhist Era, lucky numbers, and daily readings

// Thai Zodiac - 12 year cycle (นักษัตร)
export const THAI_ZODIAC = {
  rat:    { th: "ชวด", en: "Rat",    element: "water", years: [2008,2020,1996,1984,1972,1960] },
  ox:     { th: "ฉลู", en: "Ox",     element: "earth", years: [2009,2021,1997,1985,1973,1961] },
  tiger:  { th: "ขาล", en: "Tiger",  element: "wood",  years: [2010,2022,1998,1986,1974,1962] },
  rabbit: { th: "เถาะ", en: "Rabbit", element: "wood",  years: [2011,2023,1999,1987,1975,1963] },
  dragon: { th: "มะโรง", en: "Dragon", element: "earth", years: [2012,2024,2000,1988,1976,1964] },
  snake:  { th: "มะเส็ง", en: "Snake",  element: "fire",  years: [2013,2025,2001,1989,1977,1965] },
  horse:  { th: "มะเมีย", en: "Horse",  element: "fire",  years: [2014,2026,2002,1990,1978,1966] },
  goat:   { th: "มะแม", en: "Goat",   element: "earth", years: [2015,2027,2003,1991,1979,1967] },
  monkey: { th: "วอก",  en: "Monkey", element: "metal", years: [2016,2028,2004,1992,1980,1968] },
  rooster:{ th: "ระกา", en: "Rooster",element: "metal", years: [2017,2029,2005,1993,1981,1969] },
  dog:    { th: "จอ",   en: "Dog",    element: "earth", years: [2018,2030,2006,1994,1982,1970] },
  pig:    { th: "กุน",  en: "Pig",    element: "water", years: [2019,2031,2007,1995,1983,1971] },
};

// Thai days of the week colors (สีประจำวัน)
export const DAY_COLORS = {
  0: { th: "สีแดง",   en: "Red",    hex: "#FF0000", day: "อาทิตย์" },  // Sunday
  1: { th: "สีเหลือง", en: "Yellow", hex: "#FFD700", day: "จันทร์" },  // Monday
  2: { th: "สีชมพู",  en: "Pink",   hex: "#FF69B4", day: "อังคาร" },  // Tuesday
  3: { th: "สีเขียว",  en: "Green",  hex: "#228B22", day: "พุธ" },     // Wednesday
  4: { th: "สีส้ม",   en: "Orange", hex: "#FF8C00", day: "พฤหัสบดี" },// Thursday
  5: { th: "สีฟ้า",   en: "Blue",   hex: "#1E90FF", day: "ศุกร์" },   // Friday
  6: { th: "สีม่วง",  en: "Purple", hex: "#8B008B", day: "เสาร์" },   // Saturday
};

// Lucky directions per day
const DAY_DIRECTIONS = {
  0: "ทิศตะวันออก",   // East
  1: "ทิศเหนือ",       // North
  2: "ทิศใต้",         // South
  3: "ทิศตะวันตกเฉียงเหนือ", // Northwest
  4: "ทิศตะวันตก",     // West
  5: "ทิศใต้",         // South
  6: "ทิศตะวันตก",     // West
};

// Daily fortunes
const DAILY_FORTUNES = {
  0: ["วันนี้เหมาะแก่การเริ่มต้นสิ่งใหม่", "ความรักรุ่งโรจน์", "การงานราบรื่น"],
  1: ["วันแห่งโชคลาภ", "เงินทองไหลมาเทมา", "ความสัมพันธ์แน่นแฟ้น"],
  2: ["วันแห่งความกล้าหาญ", "เอาชนะอุปสรรคได้", "พลังงานสูง"],
  3: ["วันแห่งปัญญา", "เหมาะแก่การเรียนรู้", "สุขภาพแข็งแรง"],
  4: ["วันแห่งความมั่งคั่ง", "โชคดีด้านการเงิน", "ผู้ใหญ่ให้การสนับสนุน"],
  5: ["วันแห่งความรัก", "เสน่ห์แรง", "ความสัมพันธ์ดีเยี่ยม"],
  6: ["วันแห่งการพักผ่อน", "ทำบุญได้ผล", "จิตใจสงบ"],
};

// Numerology reduction
function reduceToSingleDigit(n) {
  while (n > 9) {
    n = String(n).split("").reduce((a, b) => a + parseInt(b), 0);
  }
  return n;
}

// Lucky number meanings
const NUMBER_MEANINGS = {
  1: { th: "ความเป็นผู้นำ", en: "Leadership & Independence" },
  2: { th: "ความสมดุล", en: "Balance & Partnership" },
  3: { th: "ความสร้างสรรค์", en: "Creativity & Joy" },
  4: { th: "ความมั่นคง", en: "Stability & Hard Work" },
  5: { th: "อิสรภาพ", en: "Freedom & Adventure" },
  6: { th: "ความรัก", en: "Love & Harmony" },
  7: { th: "ปัญญา", en: "Wisdom & Spirituality" },
  8: { th: "ความมั่งคั่ง", en: "Wealth & Power" },
  9: { th: "มนุษยธรรม", en: "Compassion & Completion" },
};

// Get Thai zodiac from birth year
export function getThaiZodiac(birthYear) {
  const zodiacKeys = Object.keys(THAI_ZODIAC);
  const idx = (birthYear - 2008 % 12 + 12) % 12;
  // More reliable: mod 12 from base year
  const base = birthYear % 12;
  const mapping = {
    0: "monkey", 1: "rooster", 2: "dog", 3: "pig",
    4: "rat",    5: "ox",      6: "tiger", 7: "rabbit",
    8: "dragon", 9: "snake",  10: "horse", 11: "goat",
  };
  const key = mapping[base];
  return { key, ...THAI_ZODIAC[key] };
}

// Convert CE year to Buddhist Era
export function toBuddhistEra(ceYear) {
  return ceYear + 543;
}

// Get life path number from birth date
export function getLifePathNumber(birthDate) {
  // birthDate: Date object
  const day   = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year  = birthDate.getFullYear();
  const sum   = reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(year);
  return reduceToSingleDigit(sum);
}

// Get daily lucky numbers (unique per birth date + today)
export function getDailyLuckyNumbers(today, lifePathNumber, birthDate) {
  const todayDay  = today.getDate();
  const todayMon  = today.getMonth() + 1;
  const dayOfWeek = today.getDay();

  // Use birth date components directly so each birthday gives unique numbers
  const bDay  = birthDate ? birthDate.getDate() : 1;
  const bMon  = birthDate ? birthDate.getMonth() + 1 : 1;
  const bYear = birthDate ? birthDate.getFullYear() : 1990;

  const base = reduceToSingleDigit(todayDay + bDay + lifePathNumber);
  const n1 = base;
  const n2 = reduceToSingleDigit(base + todayMon + bMon);
  const n3 = reduceToSingleDigit(base + dayOfWeek + reduceToSingleDigit(bYear));

  // Expand to 2-digit lucky numbers (popular for Thai lottery)
  const twoDigit1 = String(n1 * 10 + n2).padStart(2, "0");
  const twoDigit2 = String(n2 * 10 + n3).padStart(2, "0");

  return {
    singleDigits: [n1, n2, n3],
    twoDigitLucky: [twoDigit1, twoDigit2],
    lifePathMeaning: NUMBER_MEANINGS[lifePathNumber],
  };
}

// Get full daily reading
export function getDailyReading(birthDate, today = new Date()) {
  const dayOfWeek = today.getDay();
  const lifePathNumber = getLifePathNumber(birthDate);
  const zodiac = getThaiZodiac(birthDate.getFullYear());
  const dayColor = DAY_COLORS[dayOfWeek];
  const direction = DAY_DIRECTIONS[dayOfWeek];
  const fortunes = DAILY_FORTUNES[dayOfWeek];
  const luckyNumbers = getDailyLuckyNumbers(today, lifePathNumber, birthDate);
  const beYear = toBuddhistEra(today.getFullYear());

  return {
    date: {
      ce: today.toLocaleDateString("th-TH"),
      be: `${today.toLocaleDateString("th-TH", { day: "numeric", month: "long" })} พ.ศ. ${beYear}`,
    },
    zodiac,
    dayColor,
    direction,
    fortunes,
    luckyNumbers,
    lifePathNumber,
    lifePathMeaning: NUMBER_MEANINGS[lifePathNumber],
  };
}

// ─── 3-Domain readings: Love / Career / Money ───────────────────────────────

const DOMAIN_RATINGS = {
  love: {
    5: { stars: 5, short: "ความรักรุ่งโรจน์มาก ❤️", detail: "วันนี้เสน่ห์ของคุณแรงมาก คนรอบข้างสนใจคุณเป็นพิเศษ เหมาะสำหรับการบอกรัก หรือออกเดทครั้งแรก" },
    4: { stars: 4, short: "ความรักดีมาก 🌹",         detail: "ความสัมพันธ์ราบรื่น มีโมเมนต์ดีๆ เกิดขึ้น พูดคุยความในใจกับคนรักได้ผล" },
    3: { stars: 3, short: "ความรักปานกลาง 💛",        detail: "วันธรรมดาสำหรับความรัก ไม่มีเรื่องพิเศษ แต่ก็ไม่มีปัญหา ใช้เวลาดูแลตัวเองก่อน" },
    2: { stars: 2, short: "ระวังความเข้าใจผิด ⚠️",   detail: "อาจมีความเข้าใจผิดเล็กน้อย ควรพูดคุยด้วยความใจเย็น อย่าตัดสินใจเรื่องรักวันนี้" },
    1: { stars: 1, short: "วันไม่ดีด้านความรัก 🌙",   detail: "เก็บตัวไว้ก่อน ไม่ควรบอกรักหรือทะเลาะกับคนรักวันนี้ พรุ่งนี้ดีกว่าแน่นอน" },
  },
  career: {
    5: { stars: 5, short: "การงานเด่นมากวันนี้ 🚀",  detail: "เหมาะสำหรับการนำเสนองาน เจรจาธุรกิจ หรือขอขึ้นเงินเดือน ผู้ใหญ่เห็นด้วยทุกอย่าง" },
    4: { stars: 4, short: "การงานดีมาก 💼",           detail: "งานสำเร็จตามแผน เพื่อนร่วมงานให้ความร่วมมือ มีโอกาสได้รับคำชมจากหัวหน้า" },
    3: { stars: 3, short: "การงานปกติ 📋",             detail: "วันทำงานธรรมดา ทำงานให้เสร็จตามหน้าที่ อย่าเสี่ยงตัดสินใจใหญ่โดยไม่จำเป็น" },
    2: { stars: 2, short: "งานมีอุปสรรคเล็กน้อย 🔧",  detail: "อาจเจออุปสรรคหรืองานล่าช้า ใจเย็นและแก้ปัญหาทีละขั้น อย่าโกรธเพื่อนร่วมงาน" },
    1: { stars: 1, short: "พักผ่อน อย่ารีบตัดสินใจ 😴", detail: "ไม่ควรเซ็นสัญญาหรือตัดสินใจธุรกิจสำคัญวันนี้ รอวันที่ดีกว่านี้" },
  },
  money: {
    5: { stars: 5, short: "เงินทองไหลมาเทมา 💰",     detail: "วันดีสำหรับการลงทุน เปิดบัญชีออมทรัพย์ หรือเซ็นสัญญาเงิน โชคลาภมาจากทิศที่คาดไม่ถึง" },
    4: { stars: 4, short: "การเงินดีมาก 📈",           detail: "รายได้ดีกว่าปกติ เหมาะสำหรับการออมหรือลงทุนระยะสั้น หลีกเลี่ยงการกู้ยืม" },
    3: { stars: 3, short: "การเงินปกติ 💵",             detail: "รายรับรายจ่ายสมดุล ไม่มีกำไรพิเศษ แต่ก็ไม่ขาดทุน ประหยัดไว้ก่อน" },
    2: { stars: 2, short: "ระวังค่าใช้จ่ายเกิน ⚡",   detail: "อาจมีค่าใช้จ่ายไม่คาดคิด เช็คบัญชีและไม่ควรช็อปปิ้งวันนี้" },
    1: { stars: 1, short: "ไม่ควรเสี่ยงทางการเงิน 🚫", detail: "หลีกเลี่ยงการพนัน หุ้น หรือลงทุนเสี่ยงวันนี้ รักษาเงินที่มีอยู่ให้ดี" },
  },
};

// Score 1-5 based on life path + day + domain seed
function domainScore(lifePathNumber, dayOfWeek, seed) {
  const raw = (lifePathNumber * 3 + dayOfWeek * 7 + seed) % 5;
  return raw + 1; // 1-5
}

export function getDomainReadings(lifePathNumber, dayOfWeek) {
  const loveScore   = domainScore(lifePathNumber, dayOfWeek, 11);
  const careerScore = domainScore(lifePathNumber, dayOfWeek, 17);
  const moneyScore  = domainScore(lifePathNumber, dayOfWeek, 23);
  return {
    love:   { ...DOMAIN_RATINGS.love[loveScore],   score: loveScore },
    career: { ...DOMAIN_RATINGS.career[careerScore], score: careerScore },
    money:  { ...DOMAIN_RATINGS.money[moneyScore],  score: moneyScore },
  };
}

// ─── Weekly calendar (good / ok / avoid) ─────────────────────────────────────

const DAY_QUALITY = {
  0: { label: "วันอาทิตย์", short: "อา." },
  1: { label: "วันจันทร์",  short: "จ." },
  2: { label: "วันอังคาร", short: "อ." },
  3: { label: "วันพุธ",     short: "พ." },
  4: { label: "วันพฤหัส",  short: "พฤ." },
  5: { label: "วันศุกร์",  short: "ศ." },
  6: { label: "วันเสาร์",  short: "ส." },
};

// Returns 7 days starting from today with lucky level 1-5
export function getWeeklyCalendar(lifePathNumber, today = new Date()) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    const score = domainScore(lifePathNumber, dow, i * 13 + 7);
    const beDate = d.getDate();
    const beMonth = d.getMonth() + 1;
    return {
      date: beDate,
      month: beMonth,
      dow,
      dayLabel: DAY_QUALITY[dow].short,
      score,
      level: score >= 4 ? "ดีมาก" : score === 3 ? "ปกติ" : "ระวัง",
      color: score >= 4 ? "#D4A017" : score === 3 ? "rgba(245,214,160,0.4)" : "#8B0000",
      isToday: i === 0,
    };
  });
}

// ─── Daily affirmations ───────────────────────────────────────────────────────

const AFFIRMATIONS = [
  "วันนี้ฉันเปิดรับโชคลาภที่กำลังเดินทางมาหาฉัน 🌟",
  "ฉันมีพลังงานดีๆ ที่ดึงดูดสิ่งดีๆ เข้ามาในชีวิต ✨",
  "ทุกก้าวที่ฉันเดินวันนี้นำไปสู่ความสำเร็จ 🪷",
  "ฉันสมควรได้รับความรัก ความสุข และความมั่งคั่ง 💛",
  "จักรวาลเข้าข้างฉันวันนี้และทุกๆ วัน 🌙",
  "ฉันปล่อยวางสิ่งที่ไม่ดีและเปิดรับพลังบวก 🌸",
  "ความสำเร็จของฉันกำลังเติบโตขึ้นทุกวัน 🔥",
  "ฉันขอบคุณทุกสิ่งดีๆ ในชีวิตของฉัน 🙏",
  "เงินทองไหลมาหาฉันอย่างง่ายดายและสม่ำเสมอ 💰",
  "ฉันมีสุขภาพแข็งแรง จิตใจดี และชีวิตที่สมบูรณ์ 🌺",
];

export function getDailyAffirmation(lifePathNumber, dayOfWeek) {
  const idx = (lifePathNumber + dayOfWeek * 3) % AFFIRMATIONS.length;
  return AFFIRMATIONS[idx];
}

// ─── Auspicious time slots per day (เวลาดี) ──────────────────────────────────

// Auspicious time slots per day (เวลาดี)
export function getAuspiciousTimes(dayOfWeek) {
  const times = {
    0: ["06:00-08:00", "12:00-14:00"],
    1: ["07:00-09:00", "15:00-17:00"],
    2: ["09:00-11:00", "19:00-21:00"],
    3: ["06:00-08:00", "14:00-16:00"],
    4: ["08:00-10:00", "16:00-18:00"],
    5: ["10:00-12:00", "18:00-20:00"],
    6: ["07:00-09:00", "13:00-15:00"],
  };
  return times[dayOfWeek];
}

// ─── วันชง (bad day by zodiac year) ────────────────────────────────────────
// Each zodiac year has one day of week that conflicts (Thai folk astrology)
const WANCHONG_MAP = {
  rat:    2, // อังคาร
  ox:     3, // พุธ
  tiger:  4, // พฤหัสบดี
  rabbit: 5, // ศุกร์
  dragon: 6, // เสาร์
  snake:  0, // อาทิตย์
  horse:  1, // จันทร์
  goat:   2, // อังคาร
  monkey: 3, // พุธ
  rooster:4, // พฤหัสบดี
  dog:    5, // ศุกร์
  pig:    6, // เสาร์
};

const DAY_NAMES_TH = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];

export function getWanChong(zodiacKey, today) {
  const badDay = WANCHONG_MAP[zodiacKey];
  const todayDow = today.getDay();
  if (todayDow === badDay) {
    return {
      isWanChong: true,
      dayName: DAY_NAMES_TH[badDay],
      tip: "ระวังการตัดสินใจสำคัญ หลีกเลี่ยงการทะเลาะ และทำบุญเพื่อเสริมดวง",
    };
  }
  return { isWanChong: false };
}

// ─── Couple Compatibility ──────────────────────────────────────────────────
const ELEMENT_COMPAT = {
  water: { water:85, wood:80, fire:35, earth:50, metal:75 },
  wood:  { water:80, wood:70, fire:75, earth:40, metal:35 },
  fire:  { water:35, wood:75, fire:80, earth:70, metal:40 },
  earth: { water:50, wood:40, fire:70, earth:75, metal:80 },
  metal: { water:75, wood:35, fire:40, earth:80, metal:70 },
};

const LP_COMPAT = [
  [0,85,70,55,75,90,60,80,50,65],
  [0,85,90,60,50,80,95,55,85,40],
  [0,70,90,75,85,60,50,70,40,90],
  [0,55,60,75,70,90,80,50,65,75],
  [0,75,50,85,70,60,90,80,55,70],
  [0,90,80,60,90,60,75,85,70,50],
  [0,60,95,50,80,90,75,60,85,70],
  [0,80,55,70,50,80,85,60,90,75],
  [0,50,85,40,65,55,70,85,90,80],
  [0,65,40,90,75,70,50,70,80,80],
];

export function getCoupleCompatibility(birthDate1, birthDate2) {
  const lp1 = getLifePathNumber(birthDate1);
  const lp2 = getLifePathNumber(birthDate2);
  const z1  = getThaiZodiac(birthDate1.getFullYear());
  const z2  = getThaiZodiac(birthDate2.getFullYear());

  const lpScore  = LP_COMPAT[lp1][lp2] || LP_COMPAT[lp2][lp1] || 65;
  const elScore  = ELEMENT_COMPAT[z1.element]?.[z2.element] ?? 65;
  const total    = Math.round(lpScore * 0.55 + elScore * 0.45);

  const aspects = [
    { label: "ความรัก", score: Math.min(99, Math.round(lpScore * 0.6 + elScore * 0.4 + (lp1 === lp2 ? 5 : 0))) },
    { label: "การสื่อสาร", score: Math.min(99, Math.round(elScore * 0.7 + lpScore * 0.3)) },
    { label: "อนาคตร่วมกัน", score: Math.min(99, Math.round((lpScore + elScore) / 2 + ((lp1 + lp2) % 3 === 0 ? 8 : 0))) },
  ];

  const verdict =
    total >= 85 ? { th: "คู่แท้ — ดวงชะตาเสริมกันอย่างสมบูรณ์แบบ ✨", level: "gold" } :
    total >= 70 ? { th: "คู่ดี — มีความเข้าใจกันและเติบโตไปด้วยกันได้ 🌸", level: "good" } :
    total >= 55 ? { th: "พอไหว — ต้องใช้ความพยายามสร้างความสัมพันธ์ 🤝", level: "ok" } :
                  { th: "ท้าทาย — ดวงขัดกัน ต้องอดทนและเข้าใจกัน 🌊", level: "hard" };

  return { total, aspects, verdict, z1, z2, lp1, lp2 };
}
