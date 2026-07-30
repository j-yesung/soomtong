export function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

function getNextMonth(year: number, month: number) {
  return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
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

export function getFixedExpenseDueDateForCycle(
  item: FixedExpenseSchedule,
  salaryDay: number,
  now = new Date(),
) {
  const [cycleYear, cycleMonth] = getCurrentFixedExpenseDueDate(salaryDay, now).split("-").map(Number);
  const cycleStart = getScheduledDateKey(cycleYear, cycleMonth, salaryDay);
  const thisMonthDueDate = getScheduledDateKey(cycleYear, cycleMonth, item.day);
  const nextMonth = getNextMonth(cycleYear, cycleMonth);
  const dueDate =
    thisMonthDueDate >= cycleStart
      ? thisMonthDueDate
      : getScheduledDateKey(nextMonth.year, nextMonth.month, item.day);
  const created = getKstDateParts(new Date(item.createdAt));
  const createdDate = formatDateKey(created.year, created.month, created.day);

  return dueDate >= createdDate ? dueDate : getFirstFixedExpenseDueDate(item.day, item.createdAt);
}

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
