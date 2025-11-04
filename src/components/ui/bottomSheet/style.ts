import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
`;

export const Sheet = styled.div`
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
  max-height: 90dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  will-change: transform, opacity;
  transform: translateZ(0);
  padding-bottom: env(safe-area-inset-bottom);
`;

export const DragHandleArea = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  touch-action: pan-y;
`;

export const DragHandleBar = styled.div`
  width: 48px;
  height: 5px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.18);
`;
