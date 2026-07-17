import { ExpenseList, GroupedExpense } from "@/features/common/types";

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

function getKstDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
    day: Number(parts.find((part) => part.type === "day")?.value),
  };
}

function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getScheduledDateKey(year: number, month: number, day: number) {
  return formatDateKey(year, month, Math.min(day, getLastDayOfMonth(year, month)));
}

function getFirstFixedExpenseDueDate(day: number, createdAt: number) {
  const created = getKstDateParts(new Date(createdAt));
  const createdMonthDueDay = Math.min(day, getLastDayOfMonth(created.year, created.month));

  if (created.day <= createdMonthDueDay) {
    return formatDateKey(created.year, created.month, createdMonthDueDay);
  }

  const nextMonth = created.month === 12 ? 1 : created.month + 1;
  const nextYear = created.month === 12 ? created.year + 1 : created.year;

  return getScheduledDateKey(nextYear, nextMonth, day);
}

export function getCurrentFixedExpenseDueDate(day: number, now = new Date()) {
  const today = getKstDateParts(now);
  const thisMonthDueDay = Math.min(day, getLastDayOfMonth(today.year, today.month));

  if (today.day >= thisMonthDueDay) {
    return formatDateKey(today.year, today.month, thisMonthDueDay);
  }

  const prevMonth = today.month === 1 ? 12 : today.month - 1;
  const prevYear = today.month === 1 ? today.year - 1 : today.year;
  const prevMonthDueDay = Math.min(day, getLastDayOfMonth(prevYear, prevMonth));

  return formatDateKey(prevYear, prevMonth, prevMonthDueDay);
}

type FixedExpenseSchedule = {
  day: number;
  createdAt: number;
};

export function getFixedExpenseDueDate(item: FixedExpenseSchedule, now = new Date()) {
  const latestDueDate = getCurrentFixedExpenseDueDate(item.day, now);
  const createdDate = getKstDateParts(new Date(item.createdAt));
  const createdDateKey = formatDateKey(createdDate.year, createdDate.month, createdDate.day);

  if (latestDueDate >= createdDateKey) {
    return latestDueDate;
  }

  return getFirstFixedExpenseDueDate(item.day, item.createdAt);
}

export type FixedExpensePaymentStatus = "upcoming" | "dueToday" | "needsConfirmation" | "paid";

export function getFixedExpensePaymentStatus(
  dueDate: string,
  isPaid: boolean,
  now = new Date(),
): FixedExpensePaymentStatus {
  if (isPaid) return "paid";

  const today = getKstDateParts(now);
  const todayKey = formatDateKey(today.year, today.month, today.day);

  if (dueDate > todayKey) return "upcoming";
  if (dueDate === todayKey) return "dueToday";
  return "needsConfirmation";
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
