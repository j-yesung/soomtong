"use client";

import { useState } from "react";

import { format, getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";

import { Column } from "@/components/ui";
import { CalendarView, DayDetailSheet } from "@/features/calendar/components";
import { useCalendarExpenseData } from "@/features/calendar/hooks";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const currentDate = selectedDate ?? new Date();
  const year = getYear(currentDate);
  const month = getMonth(currentDate) + 1;
  const { expensesByDay } = useCalendarExpenseData(year, month);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedDate(undefined);
  };

  return (
    <Column>
      <Column flex={1}>
        <CalendarView selectedDate={selectedDate} onDayClick={handleDayClick} expensesByDay={expensesByDay} />
      </Column>

      <DayDetailSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        selectedDate={selectedDate}
        dateLabel={selectedDate ? format(selectedDate, "d. EEE", { locale: ko }) : ""}
        expensesByDay={expensesByDay}
      />
    </Column>
  );
}
