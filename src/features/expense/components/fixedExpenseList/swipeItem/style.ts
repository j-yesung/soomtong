import { motion } from "framer-motion";
import { styled } from "styled-components";

export const ItemSlot = styled(motion.li)<{ $isPresent: boolean }>`
  position: relative;
  list-style: none;
  will-change: transform, opacity;
  width: 100%;
  position: ${({ $isPresent }) => ($isPresent ? "relative" : "absolute")};
`;

export const ActionLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  pointer-events: none;
  will-change: transform;
`;

export const ActionPop = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: max-content;
  will-change: transform;
`;

export const Card = styled(motion.div)`
  position: relative;
  z-index: 1;
  border-radius: 8px;
  touch-action: pan-y;
  will-change: transform, opacity;
`;
