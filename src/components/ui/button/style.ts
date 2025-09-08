import styled, { css } from "styled-components";

import { ButtonStyleProps } from "./type";

export const Button = styled.button<ButtonStyleProps>`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.white};
  width: ${({ $width }) => $width && `${$width}px`};
  height: ${({ $height }) => $height && `${$height}px`};
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ $fullWidth }) => $fullWidth && "width: 100%"};

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
          background-color: ${({ theme }) => theme.bg.secondary};
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

  ${({ $variant }) => {
    switch ($variant) {
      case "outline":
        return css`
          border: 1px solid ${({ theme }) => theme.colors.border};
        `;
      case "dash":
        return css`
          border: 1px dashed ${({ theme }) => theme.border.default};
          background-color: transparent;
          color: ${({ theme }) => theme.colors.text};
        `;
      case "fill":
        return css`
          border: none;
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.default};
        `;
    }
  }}

  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.muted};
      cursor: not-allowed;
    `}
`;
