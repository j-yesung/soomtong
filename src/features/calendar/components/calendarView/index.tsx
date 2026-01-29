"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

import * as S from "./style";

type Props = {
  selectedDate: Date | undefined;
  onDayClick: (date: Date) => void;
};

const getDotCount = (date: Date) => {
  const day = date.getDate();
  if ([1, 2, 4, 8, 14, 22, 25, 28].includes(day)) {
    return (day % 3) + 1;
  }
  return 0;
};

export default function CalendarView({ selectedDate, onDayClick }: Props) {
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
            const dotCount = getDotCount(day.date);
            return (
              <S.DayCell {...props}>
                <span>{day.date.getDate()}</span>
                {dotCount > 0 && (
                  <S.DotContainer>
                    {Array.from({ length: dotCount }).map((_, i) => (
                      <S.Dot key={i} />
                    ))}
                  </S.DotContainer>
                )}
              </S.DayCell>
            );
          },
        }}
      />
    </S.CalendarWrapper>
  );
}
