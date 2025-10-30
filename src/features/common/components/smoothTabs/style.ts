import { motion } from "framer-motion";
import styled from "styled-components";

export const TabList = styled.div<{ $tabCount: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${({ $tabCount }) => $tabCount}, 1fr);
  gap: 0;
  padding: 6px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bg?.secondary ?? "#f3f4f6"};
  overflow: hidden; /* 하이라이트가 밖으로 나가지 않도록 */
`;

export const TabButton = styled.button`
  position: relative;
  border: 0;
  background: transparent;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
`;

export const Label = styled.span<{ $active: boolean }>`
  font-size: 14px;
  font-weight: 600;
  user-select: none;
  color: ${({ $active, theme }) =>
    $active ? (theme.colors.text?.primary ?? "#111827") : (theme.colors?.text?.gray ?? "#6b7280")};
`;

export const Highlight = styled(motion.div)`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0%;
  height: calc(100% - 12px);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg?.inverseWhite ?? "#fff"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  z-index: 0;
`;

export const PanelViewport = styled.div`
  overflow: hidden;
`;

export const PanelTrack = styled.div<{ $tabCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $tabCount }) => $tabCount}, 100%);
  will-change: transform;
`;

export const PanelItem = styled.div`
  will-change: filter;
  backface-visibility: hidden;
`;
