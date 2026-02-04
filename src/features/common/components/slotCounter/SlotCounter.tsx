"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";

import { Row, Text } from "@/components/ui";
import { AppTheme } from "@/styles/theme";
import { formatWithComma } from "@/utils/formatter";

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
  const formatted = useMemo(() => formatWithComma(value), [value]);

  const glyphs = useMemo(
    () => Array.from(formatted).map((ch) => (/\d/.test(ch) ? { type: "digit", char: ch } : { type: "sep", char: ch })),
    [formatted],
  );

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
              key={`d-${i}-${g.char}`}
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
