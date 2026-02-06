import { useEffect, useMemo } from "react";

import { animate, useMotionValue, useTransform } from "framer-motion";

import { useCellHeight } from "@/features/common/hooks/useCellHeight";
import { AppTheme } from "@/shared/styles/theme";

import * as S from "./style";

type Props = {
  digit: number;
  duration: number;
  spins: number;
  fontSize: number;
  lineHeightFactor: number;
  color: keyof AppTheme["colors"]["text"];
};

export default function DigitReel({ digit, duration, spins, fontSize, lineHeightFactor, color }: Props) {
  const estimated = Math.ceil(fontSize * lineHeightFactor);

  const { ref: containerRef, cellH } = useCellHeight(estimated);

  const targetIdx = digit + spins * 10;

  const y = useMotionValue(0);
  const yRounded = useTransform(y, (v) => Math.round(v));

  const loopDigits = useMemo(() => {
    const rounds = spins + 2;
    return Array.from({ length: rounds * 10 }, (_, i) => i % 10);
  }, [spins]);

  useEffect(() => {
    if (!cellH) return;

    y.set(0);

    const controls = animate(y, -targetIdx * cellH, {
      duration,
      ease: [0.25, 0.8, 0.25, 1],
    });
    return controls.stop;
  }, [digit, spins, duration, cellH, y, targetIdx]);

  return (
    <S.ReelBox ref={containerRef} $fontSize={fontSize} $cellH={cellH || Math.ceil(fontSize * 1.2)}>
      <S.ReelTrack style={{ y: yRounded }}>
        {loopDigits.map((d, idx) => (
          <S.Cell key={`${idx}-${d}`} data-cell={d} $cellH={cellH || Math.ceil(fontSize * 1.2)} $color={color}>
            {d}
          </S.Cell>
        ))}
      </S.ReelTrack>
    </S.ReelBox>
  );
}
