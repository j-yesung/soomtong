import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Dialog = styled.div`
  width: min(92vw, 320px);
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.modal};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
