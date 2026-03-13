import { AnimatedMonth } from "./animatedMonth";
import { CalendarDayButton } from "./calendarDayButton";
import { NextMonthTextButton, PreviousMonthTextButton } from "./monthNavButtons";

export const CALENDAR_COMPONENTS = {
  Month: AnimatedMonth,
  PreviousMonthButton: PreviousMonthTextButton,
  NextMonthButton: NextMonthTextButton,
  DayButton: CalendarDayButton,
} as const;
