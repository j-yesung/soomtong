import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  padding: 24px 16px;
  background: rgba(0, 0, 0, 0.35);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 999px;

  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 28px;
  cursor: pointer;
`;

export const TodayButton = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;
