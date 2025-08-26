import { css, styled } from "styled-components";

import { ButtonStyleProps } from "./type";

export const Button = styled.button<ButtonStyleProps>`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.white};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border-radius: 4px;

  ${({ $size }) => {
    switch ($size) {
      case "s":
        return css`
          font-size: ${({ theme }) => theme.font.sm};
          padding: 8px 12px;
        `;
      case "l":
        return css`
          font-size: ${({ theme }) => theme.font.lg};
          padding: 16px 20px;
        `;
      default:
        return css`
          font-size: ${({ theme }) => theme.font.md};
          padding: 12px 16px;
        `;
    }
  }}

  ${({ $color }) => {
    switch ($color) {
      case "primary":
        return css`
          background-color: ${({ theme }) => theme.colors.primary};
        `;
      case "secondary":
        return css`
          background-color: ${({ theme }) => theme.colors.success};
        `;
      case "warning":
        return css`
          background-color: ${({ theme }) => theme.colors.warning};
        `;
      case "danger":
        return css`
          background-color: ${({ theme }) => theme.colors.danger};
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.default};
        `;
    }
  }}
`;
