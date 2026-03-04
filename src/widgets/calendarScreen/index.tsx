"use client";

import { useState } from "react";

import { getMonth, getYear } from "date-fns";

import { Column } from "@/shared/ui";
import { CalendarView, DayDetailPanel } from "@/features/dashboard/calendar/components";
import { useCalendarExpenseData } from "@/features/dashboard/calendar/hooks/useCalendarExpenseData";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const currentDate = selectedDate;
  const year = getYear(currentDate);
  const month = getMonth(currentDate) + 1;

  const { expensesByDay } = useCalendarExpenseData(year, month);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <Column height="100%" minHeight={0} gap={12}>
      <Column flex={1} minHeight={0}>
        <CalendarView selectedDate={selectedDate} onDayClick={handleDayClick} expensesByDay={expensesByDay} />
      </Column>
      <Column flex={1} minHeight={0}>
        <DayDetailPanel selectedDate={selectedDate} expensesByDay={expensesByDay} />
      </Column>
    </Column>
  );
}
