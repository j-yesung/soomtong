import styled, { css } from "styled-components";

import { ButtonStyleProps } from "./type";

const sizeStyles = {
  s: css`
    font-size: ${({ theme }) => theme.font.sm};
    padding: 8px 12px;
  `,
  m: css`
    font-size: ${({ theme }) => theme.font.md};
    padding: 12px 16px;
  `,
  l: css`
    font-size: ${({ theme }) => theme.font.lg};
    padding: 16px 20px;
  `,
} as const;

const radiusStyles = {
  sm: css`
    border-radius: ${({ theme }) => theme.radius.sm};
  `,
  md: css`
    border-radius: ${({ theme }) => theme.radius.md};
  `,
  lg: css`
    border-radius: ${({ theme }) => theme.radius.lg};
  `,
  pill: css`
    border-radius: ${({ theme }) => theme.radius.pill};
  `,
  none: css`
    border-radius: 0;
  `,
} as const;

const variantColorStyles = {
  fill: {
    primary: css`
      background-color: ${({ theme }) => theme.colors.button.primary};
      color: ${({ theme }) => theme.colors.text.inverseWhite};
      border: none;
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.colors.button.secondary};
      color: ${({ theme }) => theme.colors.text.inverseWhite};
      border: none;
    `,
    danger: css`
      background-color: ${({ theme }) => theme.colors.button.danger};
      color: ${({ theme }) => theme.colors.text.inverseWhite};
      border: none;
    `,
    default: css`
      background-color: ${({ theme }) => theme.colors.button.secondary};
      color: ${({ theme }) => theme.colors.text.inverseWhite};
      border: none;
    `,
  },
  outline: {
    primary: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.button.primary}; /* 브랜드 컬러 */
      border: 1px solid ${({ theme }) => theme.colors.button.primary};
    `,
    secondary: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text};
      border: 1px solid ${({ theme }) => theme.colors.border.secondary};
    `,
    danger: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.button.danger};
      border: 1px solid ${({ theme }) => theme.colors.button.danger};
    `,
    default: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text};
      border: 1px solid ${({ theme }) => theme.colors.border.secondary};
    `,
  },
  dash: {
    primary: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.button.primary};
      border: 1px dashed ${({ theme }) => theme.colors.button.primary};
    `,
    secondary: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text};
      border: 1px dashed ${({ theme }) => theme.colors.border.primary};
    `,
    danger: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.button.danger};
      border: 1px dashed ${({ theme }) => theme.colors.button.danger};
    `,
    default: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text};
      border: 1px dashed ${({ theme }) => theme.colors.border.primary};
    `,
  },
};

export const Button = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  font-weight: ${({ theme }) => theme.fontWeight.medium};

  white-space: nowrap;
  word-break: keep-all;

  /* mobile 터치 하이라이트 제거 */
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  appearance: none;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $radius = "md" }) => radiusStyles[$radius]}

  ${({ $height }) =>
    $height &&
    css`
      height: ${$height}px;
    `}
  ${({ $width }) =>
    $width
      ? css`
          min-width: ${$width}px;
        `
      : css`
          width: 100%;
        `}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $variant = "fill", $color = "primary", $isActive }) => {
    const baseStyle = variantColorStyles[$variant][$color] ?? variantColorStyles.fill.primary;

    const activeStyle = $isActive
      ? css`
          ${$variant === "fill" &&
          css`
            filter: brightness(0.9);
          `}
          ${$variant === "outline" &&
          css`
            background-color: ${({ theme }) => theme.colors.bg.lightBlue};
            color: ${({ theme }) => theme.colors.text.darkBlue};
            border-color: ${({ theme }) => theme.colors.border.darkBlue};
          `}
        `
      : null;

    return css`
      ${baseStyle}
      ${activeStyle}
    `;
  }}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
      background-color: ${({ theme }) => theme.colors.disabled};
    `}
`;
