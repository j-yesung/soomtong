import styled, { css } from "styled-components";

import { ButtonStyleProps } from "./type";

export const Button = styled.button<ButtonStyleProps>`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.inverseWhite};
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => ($height ? `${$height}px` : "100%")};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 모바일 탭 하이라이트 제거 */
  -webkit-tap-highlight-color: transparent;

  /* 브라우저 기본 appearance 제거 (특히 iOS) */
  -webkit-appearance: none;
  appearance: none;

  ${({ $fullWidth }) => $fullWidth && "width: 100%"};

  border-radius: ${({ theme, $radius }) => {
    switch ($radius) {
      case "sm":
        return theme.radius.sm;
      case "md":
        return theme.radius.md;
      case "lg":
        return theme.radius.lg;
      case "pill":
        return theme.radius.pill;
      case "none":
        return "0";
      default:
        return theme.radius.md;
    }
  }};

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
