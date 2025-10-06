import styled from "styled-components";

export const Bar = styled.div`
  width: 100%;
  height: 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.bg.secondary};
  overflow: hidden;
`;

export const Fill = styled.div<{ $danger?: boolean }>`
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $danger, theme }) => ($danger ? theme.colors.bg.danger : theme.colors.bg.primary)};
`;

export const Percent = styled.div`
  font-size: ${({ theme }) => theme.font.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: right;
`;
