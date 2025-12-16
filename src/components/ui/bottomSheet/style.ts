import styled, { css } from "styled-components";

import { hideScrollbarOnTouch } from "@/styles/scroll";

export const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1100;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Sheet = styled.div<{
  $dragging?: boolean;
  $snapBack?: boolean;
}>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 1110;

  width: 100%;
  max-width: 500px;
  min-width: 320px;

  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);

  max-height: 80dvh;
  display: flex;
  flex-direction: column;

  padding-bottom: env(safe-area-inset-bottom);
  overflow: hidden;

  will-change: transform;
  backface-visibility: hidden;

  transform: translate3d(0, var(--sheet-drag, 0px), 0) translateY(var(--sheet-base, 110%));
  transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1);

  ${({ $dragging }) =>
    $dragging &&
    css`
      transition: none;
    `}

  ${({ $snapBack }) =>
    $snapBack &&
    css`
      transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
    `}

  touch-action: pan-y;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px;
  gap: 20px;

  ${hideScrollbarOnTouch}
`;

export const DragArea = styled.div`
  padding: 16px 0;
  cursor: grab;
  touch-action: none;
`;

export const HandleBar = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.16);
  margin: 0 auto 8px;
`;

export const CloseButton = styled.button`
  margin-left: auto;
  border: 0;
  background: transparent;
  font-size: 18px;
  line-height: 1;
`;
