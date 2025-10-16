"use client";

import { useMemo } from "react";

import { motion, useReducedMotion } from "framer-motion";

import Column from "@/components/ui/column";
import { AppTheme } from "@/styles/theme";

import Row from "../../row";
import Text from "../../text/style";
import { Bar, Fill, Legend } from "./style";

type Props = {
  income: number;
  expense: number;
  duration?: number;
  LegendItems?: {
    color: keyof AppTheme["colors"]["bg"];
    label: string;
    value: number;
  }[];
};

export default function BarChart({ income, expense, duration = 900, LegendItems }: Props) {
  const ratio = useMemo(() => (income > 0 ? Math.min((expense / income) * 100, 100) : 0), [income, expense]);
  const prefersReduced = useReducedMotion();

  return (
    <Column gap={12}>
      <Bar role="meter" aria-valuenow={Math.round(ratio)} aria-valuemin={0} aria-valuemax={100}>
        <Fill
          as={motion.div}
          initial={{ width: 0 }}
          animate={{ width: `${ratio}%` }}
          transition={prefersReduced ? { duration: 0 } : { duration: duration / 1000, ease: "easeOut" }}
          $danger={ratio > 80}
        />
      </Bar>
      {LegendItems && (
        <Column gap={8}>
          {LegendItems?.map(({ color, label, value }) => (
            <Row key={label} gap={8} align="center" justify="space-between">
              <Row gap={4} align="center">
                <Legend $color={color} />
                <Text size={14} color="secondary">
                  {label}
                </Text>
              </Row>
              <Text size={14}>{value?.toLocaleString()}원</Text>
            </Row>
          ))}
        </Column>
      )}
    </Column>
  );
}
