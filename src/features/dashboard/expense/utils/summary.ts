import { Expense, MonthlySummary } from "../types";

function getKstYearMonth(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
  }).format(new Date(iso));
}

export function buildMonthlySummary(expenses: Expense[], targetMonth: string): MonthlySummary {
  const inMonth = expenses.filter((e) => getKstYearMonth(e.spent_at) === targetMonth);

  const totalExpense = inMonth.reduce((sum, e) => sum + (e.amount ?? 0), 0);

  const byCategory = new Map<string, { amount: number; count: number }>();

  for (const e of inMonth) {
    const cat = e.category?.trim() || "미분류";
    const prev = byCategory.get(cat) ?? { amount: 0, count: 0 };
    byCategory.set(cat, { amount: prev.amount + e.amount, count: prev.count + 1 });
  }

  const topCategories = [...byCategory.entries()]
    .map(([category, v]) => ({
      category,
      amount: v.amount,
      count: v.count,
      ratio: totalExpense > 0 ? Math.round((v.amount / totalExpense) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8);

  return {
    month: targetMonth,
    totalExpense,
    topCategories,
  };
}
