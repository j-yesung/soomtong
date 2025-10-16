"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { LAYOUT_SPRING } from "@/features/expense/constants";

const List = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 60px;
  padding: 0;
  list-style: none;
`;

export default function MotionList({ children }: { children: React.ReactNode }) {
  return (
    <List layout transition={{ layout: LAYOUT_SPRING }}>
      {children}
    </List>
  );
}
