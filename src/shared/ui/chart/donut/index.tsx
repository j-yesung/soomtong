import { useEffect, useMemo, useRef } from "react";

import { animate, motion, useMotionValue, useTransform } from "motion/react";

import { Donut, Percent } from "./style";

type Props = {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  ariaLabel?: string;
};

export default function DonutChart({ value, size = 100, thickness = 14, color, ariaLabel }: Props) {
  const normalized = Math.max(0, Number.isFinite(value) ? value : 0);
  const radius = useMemo(() => (size - thickness) / 2, [size, thickness]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const mv = useMotionValue(normalized);
  const dashOffset = useTransform(mv, (v) => circumference * (1 - Math.min(v, 100) / 100));
  const percentText = useTransform(mv, (v) => `${Math.round(v)}%`);

  const isFirst = useRef(true);

  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduce || isFirst.current) {
      mv.set(normalized);
      isFirst.current = false;
      return;
    }

    const controls = animate(mv, normalized, {
      duration: 0.9,
      delay: 0,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [mv, normalized]);

  return (
    <Donut role="img" aria-label={ariaLabel ?? `비율 ${Math.round(normalized)}%`} $size={size} $color={color}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-secondary)"
          strokeWidth={thickness}
          fill="none"
        />
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: dashOffset }}
          />
        </g>
      </svg>

      <Percent $size={size}>
        <motion.span>{percentText}</motion.span>
      </Percent>
    </Donut>
  );
}
