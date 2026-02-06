import { ExpenseList, GroupedExpense } from "@/features/expense/types";

export function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getCurrentYearMonthKst() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
  }).format(new Date());
}

export function groupByKstDate(items: ExpenseList[]) {
  const groups = items.reduce<GroupedExpense>((acc, item) => {
    const dateKey = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date(item.created_at))
      .replaceAll(". ", "-")
      .replaceAll(".", "")
      .trim();

    (acc[dateKey] ??= []).push(item);
    return acc;
  }, {});

  const sortedEntries = Object.entries(groups)
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([dateKey, list]) => [dateKey, [...list].sort((x, y) => (x.created_at < y.created_at ? 1 : -1))] as const);

  return sortedEntries;
}

export function formatTitle(dateKey: string) {
  const [, m, d] = dateKey.split("-").map(Number);
  return `${m}월 ${d}일`;
}
