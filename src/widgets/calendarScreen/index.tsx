"use client";

import { useState } from "react";

import { getDaysInMonth, getMonth, getYear, startOfMonth } from "date-fns";

import { CalendarView, DayDetailPanel } from "@/features/dashboard/calendar/components";
import { useCalendarExpenseData } from "@/features/dashboard/calendar/hooks/useCalendarExpenseData";

import * as S from "./style";

export default function CalendarScreen() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [displayedMonth, setDisplayedMonth] = useState<Date>(startOfMonth(today));

  const currentDate = displayedMonth;
  const year = getYear(currentDate);
  const month = getMonth(currentDate) + 1;

  const { expensesByDay } = useCalendarExpenseData(year, month);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setDisplayedMonth(startOfMonth(date));
  };

  const handleMonthChange = (nextMonth: Date) => {
    const normalizedMonth = startOfMonth(nextMonth);
    const nextYear = normalizedMonth.getFullYear();
    const nextMonthIndex = normalizedMonth.getMonth();

    setDisplayedMonth(normalizedMonth);
    setSelectedDate((previous) => {
      const currentDay = previous.getDate();
      const maxDay = getDaysInMonth(normalizedMonth);
      return new Date(nextYear, nextMonthIndex, Math.min(currentDay, maxDay));
    });
  };

  return (
    <S.Container>
      <S.CalendarSection>
        <CalendarView
          month={displayedMonth}
          onMonthChange={handleMonthChange}
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
          expensesByDay={expensesByDay}
        />
      </S.CalendarSection>
      <S.DetailSection>
        <DayDetailPanel selectedDate={selectedDate} expensesByDay={expensesByDay} />
      </S.DetailSection>
    </S.Container>
  );
}
