import { NextResponse } from "next/server";
import { getDailyReading, getAuspiciousTimes } from "@/lib/astrology";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const birthDateStr = searchParams.get("birthDate"); // YYYY-MM-DD

  if (!birthDateStr) {
    return NextResponse.json({ error: "birthDate required" }, { status: 400 });
  }

  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const today = new Date();
  const reading = getDailyReading(birthDate, today);
  const auspiciousTimes = getAuspiciousTimes(today.getDay());

  return NextResponse.json({ ...reading, auspiciousTimes });
}
