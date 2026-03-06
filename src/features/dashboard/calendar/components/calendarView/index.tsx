import { createContext, useContext, useMemo } from "react";

import { format, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { DayButtonProps, DayPicker, MonthProps, NextMonthButtonProps, PreviousMonthButtonProps } from "react-day-picker";

import { ExpensesByDay } from "@/features/dashboard/calendar/hooks/useCalendarExpenseData";
import { useCalendarMonthInteraction } from "@/features/dashboard/calendar/hooks/useCalendarMonthInteraction";

import * as S from "./style";

type Props = {
  onDayClick: (date: Date) => void;
  onMonthChange: (nextMonth: Date) => void;
  month: Date;
  selectedDate: Date | undefined;
  expensesByDay: ExpensesByDay;
};

type CalendarViewContextValue = {
  expensesByDay: ExpensesByDay;
  reduceMotion: boolean;
};

const CalendarViewContext = createContext<CalendarViewContextValue | null>(null);

const SLIDE_TRANSITION = {
  type: "tween",
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1],
} as const;

const REDUCED_TRANSITION = { duration: 0 } as const;

const useCalendarViewContext = () => {
  const context = useContext(CalendarViewContext);

  if (!context) {
    throw new Error("CalendarView custom components must be rendered inside CalendarViewContext.");
  }

  return context;
};

function AnimatedMonth({ calendarMonth, displayIndex, children, ...rest }: MonthProps) {
  const { reduceMotion } = useCalendarViewContext();
  const motionKey = format(startOfMonth(calendarMonth.date), "yyyy-MM");

  return (
    <S.MonthMotionViewport data-display-index={displayIndex} {...rest}>
      <AnimatePresence initial={false} mode="wait">
        <S.MotionMonth
          key={motionKey}
          initial="enter"
          animate="center"
          exit="exit"
          variants={reduceMotion ? S.monthFadeReducedVariants : S.monthFadeVariants}
          transition={reduceMotion ? REDUCED_TRANSITION : SLIDE_TRANSITION}
        >
          {children}
        </S.MotionMonth>
      </AnimatePresence>
    </S.MonthMotionViewport>
  );
}

function PreviousMonthTextButton(props: PreviousMonthButtonProps) {
  const isDisabled = Boolean(props.disabled || props["aria-disabled"] === true);

  return (
    <S.MonthNavButton {...props} disabled={isDisabled} size="s" variant="outline" color="default" radius="pill" width={84} height={34}>
      이전달
    </S.MonthNavButton>
  );
}

function NextMonthTextButton(props: NextMonthButtonProps) {
  const isDisabled = Boolean(props.disabled || props["aria-disabled"] === true);

  return (
    <S.MonthNavButton {...props} disabled={isDisabled} size="s" variant="outline" color="default" radius="pill" width={84} height={34}>
      다음달
    </S.MonthNavButton>
  );
}

function CalendarDayButton({ day, ...props }: DayButtonProps) {
  const { expensesByDay } = useCalendarViewContext();
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
}

const CALENDAR_COMPONENTS = {
  Month: AnimatedMonth,
  PreviousMonthButton: PreviousMonthTextButton,
  NextMonthButton: NextMonthTextButton,
  DayButton: CalendarDayButton,
} as const;

export default function CalendarView({ onDayClick, onMonthChange, month, selectedDate, expensesByDay }: Props) {
  const reduceMotion = useReducedMotion();
  const {
    handleMonthTransition,
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
      expensesByDay,
      reduceMotion: Boolean(reduceMotion),
    }),
    [expensesByDay, reduceMotion]
  );

  return (
    <S.CalendarWrapper
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <CalendarViewContext.Provider value={contextValue}>
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
      </CalendarViewContext.Provider>
    </S.CalendarWrapper>
  );
}
