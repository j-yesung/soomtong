import { motion } from "framer-motion";

import { Flex } from "@/components/ui";

import { CenterHighlight, Item, Viewport } from "./style";
import { useWheel } from "./useWheel";

export type Props = {
  items: number[];
  value: number;
  itemHeight?: number;
  visibleCount?: number;
  onChange: (d: number) => void;
  onActiveChange?: (d: number) => void;
};

export default function WheelPicker({
  items,
  value,
  itemHeight = 44,
  visibleCount = 5,
  onChange,
  onActiveChange,
}: Props) {
  const { y, activeIndex, dragConstraints, onDragEnd } = useWheel({
    items,
    itemHeight,
    visibleCount,
    valueIndex: Math.max(0, items.indexOf(value)),
    onActiveChange: (i) => onActiveChange?.(items[i]),
    onChange: (i) => onChange?.(items[i]),
  });

  return (
    <Flex justify="center" marginBottom={24}>
      <Viewport role="listbox" aria-label="일 선택" $itemHeight={itemHeight} $visibleCount={visibleCount}>
        <CenterHighlight $itemHeight={itemHeight} aria-hidden />

        <motion.ul drag="y" style={{ y }} dragConstraints={dragConstraints} dragElastic={0.2} onDragEnd={onDragEnd}>
          {items.map((d, i) => (
            <Item
              key={d}
              role="option"
              aria-selected={i === activeIndex}
              $active={i === activeIndex}
              $itemHeight={itemHeight}
              style={{ height: itemHeight }}
            >
              {d}일
            </Item>
          ))}
        </motion.ul>
      </Viewport>
    </Flex>
  );
}
