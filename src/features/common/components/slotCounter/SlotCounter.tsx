"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [enableMotion, setEnableMotion] = useState(false);

  useEffect(() => {
    setEnableMotion(true);
  }, []);

  const formatted = useMemo(() => formatWithComma(value), [value]);

  const glyphs = useMemo(
    () => Array.from(formatted).map((ch) => (/\d/.test(ch) ? { type: "digit", char: ch } : { type: "sep", char: ch })),
    [formatted],
  );

  return (
    <motion.div
      initial={enableMotion ? { opacity: 0, y: 10, filter: "blur(4px)" } : false}
      animate={enableMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={enableMotion ? { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } : undefined}
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
