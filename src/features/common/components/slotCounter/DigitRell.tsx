import { useEffect, useMemo } from "react";

import { animate, useMotionValue, useTransform } from "framer-motion";

import { useCellHeight } from "@/features/common/hooks/useCellHeight";

import * as S from "./style";

type Props = {
  digit: number;
  duration: number;
  spins: number;
  fontSize: number;
  lineHeightFactor: number;
};

export default function DigitReel({ digit, duration, spins, fontSize, lineHeightFactor }: Props) {
  const estimated = Math.ceil(fontSize * lineHeightFactor);
  const { ref: containerRef, cellH } = useCellHeight(estimated);

  const y = useMotionValue(0);
  const yRounded = useTransform(y, (v) => Math.round(v));

  const loopDigits = useMemo(() => {
    const rounds = spins + 2;
    return Array.from({ length: rounds * 10 }, (_, i) => i % 10);
  }, [spins]);

  useEffect(() => {
    if (!cellH) return;

    const fromIdx = (spins + 1) * 10;
    const toIdx = spins * 10 + digit;

    y.set(-fromIdx * cellH);
    const controls = animate(y, -toIdx * cellH, {
      duration,
      ease: [0.2, 0.6, 0.2, 1],
    });
    return controls.stop;
  }, [digit, spins, duration, cellH, y]);

  return (
    <S.ReelBox ref={containerRef} $fontSize={fontSize} $cellH={cellH || Math.ceil(fontSize * 1.2)}>
      <S.ReelTrack style={{ y: yRounded }}>
        {loopDigits.map((d, idx) => (
          <S.Cell key={`${idx}-${d}`} data-cell={d} $cellH={cellH || Math.ceil(fontSize * 1.2)}>
            {d}
          </S.Cell>
        ))}
      </S.ReelTrack>
    </S.ReelBox>
  );
}
