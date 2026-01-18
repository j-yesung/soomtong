import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { summary } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      너는 개인 재무 코치야.

      규칙:
      1) 이번 달 가장 지출 비중이 큰 카테고리를 먼저 설명
      2) 줄일 수 있는 항목 최대 2개만 추천
      3) 실천 방법은 구체적으로
      4) 비난하지 말고 코치처럼
      5) 한국 직장인 기준
      6) 마크다운 없이 평문

      지출 데이터:
      ${JSON.stringify(summary, null, 2)}
    `.trim();

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return NextResponse.json({ text: result.text });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Gemini error" }, { status: 500 });
  }
}
