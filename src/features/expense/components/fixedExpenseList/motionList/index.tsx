"use client";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { LAYOUT_SPRING } from "@/features/expense/constants";

const List = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 80px;
  list-style: none;
`;

export default function MotionList({ children }: { children: React.ReactNode }) {
  return (
    <List layout transition={{ layout: LAYOUT_SPRING }}>
      <AnimatePresence initial={false} mode="popLayout">
        {children}
      </AnimatePresence>
    </List>
  );
}
