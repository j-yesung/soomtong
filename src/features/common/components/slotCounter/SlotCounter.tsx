"use client";

import { useMemo } from "react";

import { Row, Text } from "@/components/ui";
import { formatWithComma } from "@/utils/formatter";

import DigitReel from "./DigitRell";

type SlotCounterProps = {
  value: number;
  duration?: number; // 전체 애니메이션 시간
  spins?: number; // 최소 회전 바퀴 수
  fontSize?: number;
  gap?: number;
  suffix?: React.ReactNode;
  lineHeightFactor?: number;
};

export default function SlotCounter({
  value,
  duration = 1.2,
  spins = 1,
  fontSize = 28,
  gap = 0,
  suffix,
  lineHeightFactor = 1.2,
}: SlotCounterProps) {
  const formatted = useMemo(() => formatWithComma(value), [value]);
  const glyphs = useMemo(
    () => Array.from(formatted).map((ch) => (/\d/.test(ch) ? { type: "digit", char: ch } : { type: "sep", char: ch })),
    [formatted],
  );

  return (
    <>
      <Row gap={gap} align="flex-end" aria-label="total-amount" role="figure">
        {glyphs.map((g, i) =>
          g.type === "digit" ? (
            <DigitReel
              key={`d-${i}-${g.char}`}
              digit={Number(g.char)}
              duration={duration}
              spins={spins}
              fontSize={fontSize}
              lineHeightFactor={lineHeightFactor}
            />
          ) : (
            <Text key={`s-${i}`} weight={700}>
              {g.char}
            </Text>
          ),
        )}
      </Row>
      {suffix && <Text>{suffix}</Text>}
    </>
  );
}
