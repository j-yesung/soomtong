import { DayButtonProps } from "react-day-picker";

import { useCalendarViewContext } from "../context";
import * as S from "../style";

export function CalendarDayButton({ day, modifiers, ...props }: DayButtonProps) {
  const { expensesByDay } = useCalendarViewContext();
  const dayOfMonth = day.date.getDate();
  const expenseData = expensesByDay.get(dayOfMonth);
  const hasFixed = expenseData && expenseData.fixed.length > 0;
  const hasVariable = expenseData && expenseData.variable.length > 0;

  return (
    <S.DayCell {...props} data-outside={modifiers.outside || undefined}>
      <S.DayNumber>{dayOfMonth}</S.DayNumber>
      <S.DotContainer>
        {hasFixed && <S.FixedDot />}
        {hasVariable && <S.VariableDot />}
      </S.DotContainer>
    </S.DayCell>
  );
}
