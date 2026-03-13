import { useEffect, useMemo, useRef } from "react";

import { animate, useMotionValue, useTransform } from "framer-motion";

import { useCellHeight } from "@/features/common/hooks/useCellHeight";
import { AppTheme } from "@/shared/styles/theme";

import * as S from "./style";

type Props = {
  playKey: number;
  shouldAnimate: boolean;
  digit: number;
  duration: number;
  spins: number;
  fontSize: number;
  lineHeightFactor: number;
  color: keyof AppTheme["colors"]["text"];
};

export default function DigitReel({
  playKey,
  shouldAnimate,
  digit,
  duration,
  spins,
  fontSize,
  lineHeightFactor,
  color,
}: Props) {
  const estimated = Math.ceil(fontSize * lineHeightFactor);

  const { ref: containerRef, cellH } = useCellHeight(estimated);

  const hasAnimated = useRef(false);
  const prevDigit = useRef<number | null>(null);
  const prevPlayKey = useRef<number | null>(null);

  const y = useMotionValue(0);
  const yRounded = useTransform(y, (v) => Math.round(v));

  const loopDigits = useMemo(() => {
    const rounds = spins + 2;
    return Array.from({ length: rounds * 10 }, (_, i) => i % 10);
  }, [spins]);

  useEffect(() => {
    if (!cellH) return;

    const targetIdx = digit + spins * 10;
    const targetY = -targetIdx * cellH;

    if (!hasAnimated.current) {
      const controls = shouldAnimate
        ? animate(y, targetY, {
            duration,
            ease: [0.25, 0.8, 0.25, 1],
          })
        : null;
      hasAnimated.current = true;
      prevDigit.current = digit;
      prevPlayKey.current = playKey;
      if (!controls) {
        y.set(targetY);
        return;
      }
      return controls.stop;
    }

    if (prevPlayKey.current !== playKey) {
      const controls = shouldAnimate
        ? animate(y, targetY, {
            duration,
            ease: [0.25, 0.8, 0.25, 1],
          })
        : null;
      prevPlayKey.current = playKey;
      prevDigit.current = digit;
      if (!controls) {
        y.set(targetY);
        return;
      }
      return controls.stop;
    }

    if (shouldAnimate && prevDigit.current !== digit) {
      const controls = animate(y, targetY, {
        duration,
        ease: [0.25, 0.8, 0.25, 1],
      });
      prevDigit.current = digit;
      return controls.stop;
    }

    prevDigit.current = digit;
    y.set(targetY);
  }, [cellH, digit, duration, playKey, shouldAnimate, spins, y]);

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
