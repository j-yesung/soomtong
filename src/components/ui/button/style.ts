import styled, { css } from "styled-components";

import { ButtonStyleProps } from "./type";

export const Button = styled.button<ButtonStyleProps>`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.inverseWhite};
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
          background-color: ${({ theme }) => theme.colors.button.primary};
        `;
      case "secondary":
        return css`
          background-color: ${({ theme }) => theme.colors.button.secondary};
        `;
      case "danger":
        return css`
          background-color: ${({ theme }) => theme.colors.button.danger};
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.button.primary};
        `;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case "outline":
        return css`
          border: 1px solid ${({ theme }) => theme.colors.border.secondary};
        `;
      case "dash":
        return css`
          border: 1px dashed ${({ theme }) => theme.colors.border.primary};
          background-color: transparent;
          color: ${({ theme }) => theme.colors.text};
        `;
      case "fill":
        return css`
          border: none;
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.button.primary};
        `;
    }
  }}

  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.disabled};
      cursor: not-allowed;
    `}
`;
