import styled, { css } from "styled-components";

import { TagStylesProps } from "./type";

export const TagButton = styled.button<TagStylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $isSelected }) => ($isSelected ? "#fff" : theme.colors.text.primary)};
  font-size: ${({ theme }) => theme.font.sm};
  height: 30px;
  cursor: default;

  ${({ $variant, $isSelected, theme }) => {
    switch ($variant) {
      case "select":
        return css`
          background-color: ${$isSelected ? theme.colors.bg.primary : theme.colors.bg.secondary};
          border-radius: ${theme.radius.sm};
          padding: 4px 8px;
          cursor: pointer;
        `;
      case "list":
        return css`
          background-color: ${theme.colors.bg.inverseWhite};
          border: 1px solid ${theme.colors.border.secondary};
          border-radius: ${theme.radius.sm};
          padding: 4px 8px;
        `;
      case "default":
      default:
        return css`
          border: 1px solid ${theme.colors.border.secondary};
          border-radius: ${theme.radius.sm};
          padding: 4px 8px;
        `;
    }
  }}
`;
