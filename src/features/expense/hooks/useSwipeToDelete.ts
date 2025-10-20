"use client";

import { PanInfo, animate, useMotionValue } from "framer-motion";

import { REMOVE_TWEEN, SPRING, THRESHOLD } from "../constants";

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
        animate(x, -260, REMOVE_TWEEN);
        onRemove();
      } else {
        animate(x, 0, SPRING);
      }
    },
  };

  return { x, dragProps };
}
