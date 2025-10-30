import styled, { keyframes } from "styled-components";

const fade = keyframes`
  from { opacity: 0; } to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  animation: ${fade} 0.16s ease-out;
  z-index: 1100;
  width: 100%;
  max-width: 500px;
  min-width: 320px;
  margin: 0 auto;
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
  animation: ${slideUp} 0.2s ease-out forwards;
  z-index: 1110;
  width: 100%;
  max-width: 500px;
  min-width: 320px;

  padding-bottom: env(safe-area-inset-bottom);
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
