import { motion } from "framer-motion";
import styled from "styled-components";

import { AppTheme } from "@/shared/styles/theme";

export const ReelBox = styled.div<{ $fontSize: number; $cellH: number }>`
  position: relative;
  font-size: ${({ $fontSize }) => $fontSize}px;
  width: ${({ $fontSize }) => Math.ceil($fontSize * 0.65)}px;
  height: ${({ $cellH }) => Math.round($cellH)}px;
  overflow: hidden;
  border-radius: 6px;
  /* iOS 뿌연 라인 방지 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const ReelTrack = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;
`;

export const Cell = styled.div<{ $cellH: number; $color: keyof AppTheme["colors"]["text"] }>`
  display: grid;
  place-items: center;
  height: ${({ $cellH }) => Math.round($cellH)}px;
  line-height: ${({ $cellH }) => Math.round($cellH)}px;
  font-weight: 800;
  font-size: 1em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $color }) => theme.colors.text[$color]};
`;
