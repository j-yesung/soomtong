import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  grid-area: 1 / 1;
  position: relative;
  z-index: ${({ $isActive }) => ($isActive ? 10 : 0)};
  pointer-events: ${({ $isActive }) => ($isActive ? "auto" : "none")};
`;
