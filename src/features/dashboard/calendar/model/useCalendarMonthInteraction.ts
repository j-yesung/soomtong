import { PointerEvent, useRef, useState } from "react";

import { addMonths, startOfMonth } from "date-fns";

type Params = {
  month: Date;
  onMonthChange: (nextMonth: Date) => void;
};

const SWIPE_THRESHOLD = 40;

export function useCalendarMonthInteraction({ month, onMonthChange }: Params) {
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isTrackingRef = useRef(false);
  const didSwipeRef = useRef(false);

  const currentMonth = startOfMonth(month);

  const resolveDirection = (nextMonth: Date) => {
    const next = startOfMonth(nextMonth).getTime();
    const current = currentMonth.getTime();

    if (next === current) return slideDirection;
    return next > current ? 1 : -1;
  };

  const setDirectionByDate = (date: Date) => {
    const next = startOfMonth(date).getTime();
    const current = currentMonth.getTime();

    if (next !== current) {
      setSlideDirection(next > current ? 1 : -1);
    }
  };

  const handleMonthTransition = (nextMonth: Date) => {
    setSlideDirection(resolveDirection(nextMonth));
    onMonthChange(nextMonth);
  };

  const isMonthGridTarget = (target: EventTarget | null) => {
    const element = target as HTMLElement | null;
    if (!element) return false;

    if (element.closest(".rdp-nav, .rdp-month_caption, .rdp-weekdays")) {
      return false;
    }

    return Boolean(element.closest(".rdp-month, .rdp-month_grid, .rdp-weeks, .rdp-week, .rdp-day, .rdp-day_button"));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || !isMonthGridTarget(event.target)) {
      return;
    }

    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    isTrackingRef.current = true;
    didSwipeRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isTrackingRef.current) return;

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absY > absX) {
      isTrackingRef.current = false;
      return;
    }

    if (absX < SWIPE_THRESHOLD) return;

    didSwipeRef.current = true;
    isTrackingRef.current = false;

    const offset = deltaX < 0 ? 1 : -1;
    handleMonthTransition(addMonths(currentMonth, offset));
  };

  const handlePointerEnd = () => {
    isTrackingRef.current = false;
  };

  const consumeSwipeSelectionBlock = () => {
    if (!didSwipeRef.current) return false;
    didSwipeRef.current = false;
    return true;
  };

  return {
    slideDirection,
    handleMonthTransition,
    setDirectionByDate,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    consumeSwipeSelectionBlock,
  };
}
