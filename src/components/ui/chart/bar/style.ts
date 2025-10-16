import styled from "styled-components";

import { AppTheme } from "@/styles/theme";

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

export const Legend = styled.div<{ $color: keyof AppTheme["colors"]["bg"] }>`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  background: ${({ $color, theme }) => theme.colors.bg[$color]};
`;
