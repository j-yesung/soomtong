import { ExpenseList, FixedItem } from "@/features/common/types";
import { ExpensesByDay } from "@/features/dashboard/calendar/model/useCalendarExpenseData";

export type DayExpenseData = {
  fixed: FixedItem[];
  variable: ExpenseList[];
};

export type CalendarViewContextValue = {
  slideDirection: 1 | -1;
  expensesByDay: ExpensesByDay;
  reduceMotion: boolean;
};
