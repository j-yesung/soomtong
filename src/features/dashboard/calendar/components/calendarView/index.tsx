import { useMemo } from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useReducedMotion } from "framer-motion";
import { DayPicker } from "react-day-picker";

import { useCalendarMonthInteraction } from "@/features/dashboard/calendar/hooks/useCalendarMonthInteraction";

import { ExpensesByDay } from "../../hooks/useCalendarExpenseData";
import { CalendarViewContextValue } from "../../types";
import { CALENDAR_COMPONENTS } from "./calendarComponents";
import { CalendarViewProvider } from "./context";
import * as S from "./style";

type Props = {
  onDayClick: (date: Date) => void;
  onMonthChange: (nextMonth: Date) => void;
  month: Date;
  selectedDate: Date | undefined;
  expensesByDay: ExpensesByDay;
};

export default function CalendarView({ onDayClick, onMonthChange, month, selectedDate, expensesByDay }: Props) {
  const reduceMotion = useReducedMotion();
  const {
    slideDirection,
    handleMonthTransition,
    setDirectionByDate,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    consumeSwipeSelectionBlock,
  } = useCalendarMonthInteraction({
    month,
    onMonthChange,
  });

  const formatCaption = (currentMonth: Date) => {
    return format(currentMonth, "yyyy.M", { locale: ko });
  };

  const contextValue = useMemo<CalendarViewContextValue>(
    () => ({
      slideDirection,
      expensesByDay,
      reduceMotion: Boolean(reduceMotion),
    }),
    [slideDirection, expensesByDay, reduceMotion],
  );

  return (
    <S.CalendarWrapper
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <CalendarViewProvider value={contextValue}>
        <DayPicker
          mode="single"
          month={month}
          onMonthChange={handleMonthTransition}
          selected={selectedDate}
          onSelect={(date) => {
            if (consumeSwipeSelectionBlock()) {
              return;
            }

            if (date) {
              setDirectionByDate(date);
              onDayClick(date);
            }
          }}
          locale={ko}
          weekStartsOn={0}
          showOutsideDays
          fixedWeeks
          formatters={{
            formatCaption,
          }}
          modifiers={{
            sunday: (date) => date.getDay() === 0,
            saturday: (date) => date.getDay() === 6,
          }}
          modifiersClassNames={{
            sunday: "rdp-day_sunday",
            saturday: "rdp-day_saturday",
          }}
          components={CALENDAR_COMPONENTS}
        />
      </CalendarViewProvider>
    </S.CalendarWrapper>
  );
}
