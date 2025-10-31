import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  width: 100%;
  max-width: 500px;
  min-width: 320px;
  margin: 0 auto;
  touch-action: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Sheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
  max-height: 80dvh;
  display: flex;
  flex-direction: column;
  will-change: transform, opacity;
  transform: translateZ(0);
  animation: ${slideUp} 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  z-index: 1110;
  width: 100%;
  max-width: 500px;
  min-width: 320px;

  padding-bottom: env(safe-area-inset-bottom);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 16px 8px;
`;

export const CloseButton = styled.button`
  margin-left: auto;
  border: 0;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
`;
