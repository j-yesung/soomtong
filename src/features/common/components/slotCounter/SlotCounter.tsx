"use client";

import { useEffect, useMemo, useRef } from "react";

import { motion } from "framer-motion";

import { Row, Text } from "@/shared/ui";
import { AppTheme } from "@/shared/styles/theme";
import { formatWithComma } from "@/shared/utils/formatter";

import DigitReel from "./DigitRell";

type SlotCounterProps = {
  value: number;
  duration?: number; // 전체 애니메이션 시간
  spins?: number; // 최소 회전 바퀴 수
  fontSize?: number;
  suffix?: React.ReactNode;
  lineHeightFactor?: number;
  color?: keyof AppTheme["colors"]["text"];
};

export default function SlotCounter({
  value,
  duration = 1.2,
  spins = 1,
  fontSize = 28,
  suffix,
  lineHeightFactor = 1.2,
  color = "primary",
}: SlotCounterProps) {
  const prevValueRef = useRef<number | null>(null);
  const prevValue = prevValueRef.current;

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const formatted = useMemo(() => formatWithComma(value), [value]);

  const digitAtPlace = (n: number, place: number) => Math.floor(Math.abs(n) / place) % 10;

  const glyphs = useMemo(() => {
    const chars = Array.from(formatted);
    const list: Array<
      | { type: "digit"; char: string; place: number; shouldAnimate: boolean }
      | { type: "sep"; char: string }
    > = [];

    let place = 1;
    for (let i = chars.length - 1; i >= 0; i -= 1) {
      const ch = chars[i];
      if (/\d/.test(ch)) {
        const shouldAnimate =
          prevValue === null ? true : digitAtPlace(prevValue, place) !== digitAtPlace(value, place);
        list[i] = { type: "digit", char: ch, place, shouldAnimate };
        place *= 10;
      } else {
        list[i] = { type: "sep", char: ch };
      }
    }

    return list;
  }, [formatted, prevValue, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Row align="center" aria-label="total-amount" role="figure">
        {glyphs.map((g, i) =>
          g.type === "digit" ? (
            <DigitReel
              key={`d-${i}`}
              playKey={value}
              shouldAnimate={g.shouldAnimate}
              digit={Number(g.char)}
              duration={duration}
              spins={spins}
              fontSize={fontSize}
              lineHeightFactor={lineHeightFactor}
              color={color}
            />
          ) : (
            <Text key={`s-${i}`} size={24} weight={700} color={color}>
              {g.char}
            </Text>
          ),
        )}
        {suffix && (
          <Text size={fontSize} weight={700}>
            {suffix}
          </Text>
        )}
      </Row>
    </motion.div>
  );
}
