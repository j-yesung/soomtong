import { useEffect, useMemo, useState } from "react";

import { PanInfo, animate, useMotionValue, useMotionValueEvent } from "framer-motion";

import { indexToY, yToIndex } from "./util";

type UseWheelParams = {
  items: number[];
  valueIndex: number;
  itemHeight: number;
  visibleCount: number;
  onActiveChange?: (index: number) => void;
  onChange?: (index: number) => void;
};

export function useWheel({ items, valueIndex, itemHeight, visibleCount, onActiveChange, onChange }: UseWheelParams) {
  const maxIndex = items.length - 1;
  const y = useMotionValue(indexToY(valueIndex, itemHeight, visibleCount));
  const [activeIndex, setActiveIndex] = useState(valueIndex);

  useEffect(() => {
    animate(y, indexToY(valueIndex, itemHeight, visibleCount), { duration: 0 });
    setActiveIndex(valueIndex);
  }, [valueIndex, itemHeight, visibleCount, y]);

  // 드래그 중 중앙 인덱스 변경
  useMotionValueEvent(y, "change", (latest) => {
    const idx = yToIndex(latest, itemHeight, visibleCount, maxIndex);
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      onActiveChange?.(idx);
    }
  });

  const dragConstraints = useMemo(() => {
    const top = indexToY(maxIndex, itemHeight, visibleCount);
    const bottom = indexToY(0, itemHeight, visibleCount);
    return { top, bottom };
  }, [maxIndex, itemHeight, visibleCount]);

  const snapToIndex = (idx: number) => {
    const clamped = Math.max(0, Math.min(maxIndex, idx));
    animate(y, indexToY(clamped, itemHeight, visibleCount), { type: "spring", stiffness: 260, damping: 28, mass: 0.6 });
    onChange?.(clamped);
  };

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const latest = y.get();
    const v = info.velocity.y ?? 0;
    const projected = latest + v * 0.35;
    const idx = yToIndex(projected, itemHeight, visibleCount, maxIndex);
    snapToIndex(idx);
  };

  return { y, activeIndex, dragConstraints, onDragEnd, snapToIndex };
}
