import shouldForwardProp from "@styled-system/should-forward-prop";
import styled, { css } from "styled-components";

import { TagStylesProps } from "./type";

const COMMON = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.sm};
`;

const variantStyles = {
  select: css<TagStylesProps>`
    cursor: pointer;
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.bg.primary : theme.colors.bg.secondary};
    color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.text.inverseWhite : theme.colors.text.primary)};
    border: none;
  `,
  list: css<TagStylesProps>`
    cursor: default;
    background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
    border: 1px solid ${({ theme, $color }) => $color ?? theme.colors.border.secondary};
    color: ${({ theme, $color }) => $color ?? theme.colors.text.primary};
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
  ${({ $variant = "default" }) => variantStyles[$variant]}
`;
