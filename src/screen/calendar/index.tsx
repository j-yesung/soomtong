"use client";

import { useState } from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { Box } from "@/components/ui";

import CalendarView from "./components/calendarView";
import DayDetailSheet from "./components/dayDetailSheet";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <Box>
      <CalendarView selectedDate={selectedDate} onDayClick={handleDayClick} />

      <DayDetailSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        selectedDate={selectedDate}
        dateLabel={selectedDate ? format(selectedDate, "d. EEE", { locale: ko }) : ""}
      />
    </Box>
  );
}
