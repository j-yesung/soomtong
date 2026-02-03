"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

import { ExpensesByDay } from "@/features/calendar/hooks/useCalendarExpenseData";

import * as S from "./style";

type Props = {
  onDayClick: (date: Date) => void;
  selectedDate: Date | undefined;
  expensesByDay: ExpensesByDay;
};

export default function CalendarView({ onDayClick, selectedDate, expensesByDay }: Props) {
  const formatCaption = (month: Date) => {
    return format(month, "yyyy.M", { locale: ko });
  };

  return (
    <S.CalendarWrapper>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDayClick(date)}
        locale={ko}
        weekStartsOn={0}
        showOutsideDays
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
        components={{
          DayButton: ({ day, ...props }) => {
            const dayOfMonth = day.date.getDate();
            const expenseData = expensesByDay.get(dayOfMonth);
            const hasFixed = expenseData && expenseData.fixed.length > 0;
            const hasVariable = expenseData && expenseData.variable.length > 0;

            return (
              <S.DayCell {...props}>
                <S.DayNumber>{dayOfMonth}</S.DayNumber>
                <S.DotContainer>
                  {hasFixed && <S.FixedDot />}
                  {hasVariable && <S.VariableDot />}
                </S.DotContainer>
              </S.DayCell>
            );
          },
        }}
      />
    </S.CalendarWrapper>
  );
}
