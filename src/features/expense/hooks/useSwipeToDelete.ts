"use client";

import { PanInfo, animate, useMotionValue } from "framer-motion";

import { REMOVE_TWEEN, SPRING, THRESHOLD } from "../constant";

export function useSwipeToDelete(onRemove: () => void) {
  const x = useMotionValue(0);

  const dragProps = {
    drag: "x" as const,
    dragElastic: 0.04,
    dragMomentum: false,
    onDragEnd: async (_: MouseEvent, info: PanInfo) => {
      const shouldRemove = info.offset.x < -THRESHOLD || info.velocity.x < -600;
      x.stop();
      if (shouldRemove) {
        await animate(x, -260, REMOVE_TWEEN).finished; // 왼쪽으로 드래우 후 제거
        onRemove();
      } else {
        animate(x, 0, SPRING); // 원위치 복원
      }
    },
  };

  return { x, dragProps };
}
