import { format, startOfMonth } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { MonthProps } from "react-day-picker";

import { useCalendarViewContext } from "../context";
import * as S from "../style";

const SLIDE_TRANSITION = {
  type: "tween",
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1],
} as const;

const REDUCED_TRANSITION = { duration: 0 } as const;

export function AnimatedMonth({ calendarMonth, displayIndex, children, ...rest }: MonthProps) {
  const { slideDirection, reduceMotion } = useCalendarViewContext();
  const motionKey = format(startOfMonth(calendarMonth.date), "yyyy-MM");

  return (
    <S.MonthMotionViewport data-display-index={displayIndex} {...rest}>
      <AnimatePresence custom={slideDirection} initial={false} mode="sync">
        <S.MotionMonth
          key={motionKey}
          custom={slideDirection}
          initial="enter"
          animate="center"
          exit="exit"
          variants={reduceMotion ? S.monthSlideReducedVariants : S.monthSlideVariants}
          transition={reduceMotion ? REDUCED_TRANSITION : SLIDE_TRANSITION}
        >
          {children}
        </S.MotionMonth>
      </AnimatePresence>
    </S.MonthMotionViewport>
  );
}
