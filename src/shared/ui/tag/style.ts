
import shouldForwardProp from "@styled-system/should-forward-prop";
import styled, { css } from "styled-components";

import { TagStylesProps } from "./type";

const COMMON = css<TagStylesProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 700;
  white-space: nowrap;
  line-height: 1;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
`;

const sizeStyles = {
  sm: css`
    min-height: 28px;
    padding: 0 10px;
    font-size: 12px;
  `,
  md: css`
    min-height: 34px;
    padding: 0 12px;
    font-size: 13px;
  `,
} as const;

const chipStyles = css<TagStylesProps>`
  border: none;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.bg.lightBlue : "#ECEFF3")};
  color: ${({ theme, selected }) => (selected ? theme.colors.text.blue : theme.colors.text.secondary)};
`;

const badgeStyles = css<TagStylesProps>`
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const variantStyles = {
  chip: chipStyles,
  badge: badgeStyles,
} as const;

export const TagButton = styled("button").attrs({ type: "button" }).withConfig({ shouldForwardProp })<TagStylesProps>`
  ${COMMON}
  ${({ size = "sm" }) => sizeStyles[size]}
  ${({ variant = "badge" }) => variantStyles[variant]}
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;
