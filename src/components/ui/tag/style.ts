import shouldForwardProp from "@styled-system/should-forward-prop";
import styled, { css } from "styled-components";

import { TagStylesProps } from "./type";

const COMMON = css<TagStylesProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 14px;
  font-size: ${({ theme, fontSize }) => `${fontSize ?? theme.font.sm}px`};
  font-weight: ${({ fontWeight }) => fontWeight ?? 500};
`;

const variantStyles = {
  fixed: css<TagStylesProps>`
    cursor: default;
    background-color: ${({ theme, color }) => color ?? theme.colors.bg.inverseWhite};
    color: ${({ theme, color }) => (color ? theme.colors.text.darkBlue : theme.colors.text.gray)};
    border: none;
  `,
  select: css<TagStylesProps>`
    cursor: pointer;
    background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.bg.primary : theme.colors.bg.secondary)};
    color: ${({ theme, isSelected }) => (isSelected ? theme.colors.text.inverseWhite : theme.colors.text.primary)};
    border: none;
  `,
  list: css<TagStylesProps>`
    cursor: default;
    background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
    border: 1px solid ${({ theme, color }) => color ?? theme.colors.border.secondary};
    color: ${({ theme, color }) => color ?? theme.colors.text.primary};
  `,
  default: css<TagStylesProps>`
    cursor: default;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  `,
} as const;

export const TagButton = styled("button").withConfig({ shouldForwardProp })<TagStylesProps>`
  ${COMMON}
  ${({ variant = "default" }) => variantStyles[variant]}
`;
