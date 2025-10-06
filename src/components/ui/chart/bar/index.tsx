"use client";

import { useMemo } from "react";

import { motion, useReducedMotion } from "framer-motion";

import Column from "@/components/ui/column";

import * as S from "./style";

type Props = {
  income: number;
  expense: number;
  duration?: number;
  isRatio?: boolean;
};

export default function BarChart({ income, expense, duration = 900, isRatio = true }: Props) {
  const ratio = useMemo(() => (income > 0 ? Math.min((expense / income) * 100, 100) : 0), [income, expense]);
  const prefersReduced = useReducedMotion();

  return (
    <Column gap={8}>
      <S.Bar role="meter" aria-valuenow={Math.round(ratio)} aria-valuemin={0} aria-valuemax={100}>
        <S.Fill
          as={motion.div}
          initial={{ width: 0 }}
          animate={{ width: `${ratio}%` }}
          transition={prefersReduced ? { duration: 0 } : { duration: duration / 1000, ease: "easeOut" }}
          $danger={ratio > 80}
        />
      </S.Bar>

      {isRatio && ratio && <S.Percent aria-hidden>{ratio?.toFixed(1)}%</S.Percent>}
    </Column>
  );
}
