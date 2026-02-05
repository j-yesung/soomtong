"use client";

import { useEffect, useMemo } from "react";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";

import { theme } from "@/shared/styles/theme";

import { Donut, Percent } from "./style";

type Props = {
  value: number;
  size?: number;
  thickness?: number;
};

export default function DonutChart({ value, size = 100, thickness = 14 }: Props) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  const radius = useMemo(() => (size - thickness) / 2, [size, thickness]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const mv = useMotionValue(0);
  const dashOffset = useTransform(mv, (v) => circumference * (1 - v / 100));
  const percentText = useTransform(mv, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduce) {
      mv.set(clamped);
      return;
    }

    const controls = animate(mv, clamped, {
      duration: 0.9,
      delay: 0,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [clamped, mv]);

  return (
    <Donut role="img" $size={size}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.bg.secondary}
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
