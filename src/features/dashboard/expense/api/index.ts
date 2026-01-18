import { MonthlySummary } from "../types";

export async function getAiInsights(summary: MonthlySummary) {
  const res = await fetch("/api/ai/insight", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ summary }),
  });

  if (!res.ok) throw new Error("AI 요청 실패");
  return res.json();
}
