import { motion } from "framer-motion";
import styled from "styled-components";

import { hideScrollbarOnTouch } from "@/styles/scroll";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  gap: 12px;
`;

export const TabList = styled.div<{ $tabCount: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${({ $tabCount }) => $tabCount}, 1fr);
  gap: 0;
  padding: 6px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bg?.secondary};
  overflow: hidden;
  flex: 0 0 auto;
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
  color: ${({ $active, theme }) => ($active ? theme.colors.text?.primary : theme.colors?.text?.gray)};
`;

export const Highlight = styled(motion.div)`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0%;
  height: calc(100% - 12px);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg?.inverseWhite};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  z-index: 0;
`;

export const PanelViewport = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

export const PanelTrack = styled.div<{ $tabCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $tabCount }) => $tabCount}, 100%);
  will-change: transform;
  height: 100%;
`;

export const PanelItem = styled.div`
  height: 100%;
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  will-change: filter;

  ${hideScrollbarOnTouch}
`;
