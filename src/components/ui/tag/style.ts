import styled, { css } from "styled-components";

import { TagStylesProps } from "./type";

export const TagButton = styled.button<TagStylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $isSelected }) => ($isSelected ? "#fff" : theme.colors.text)};
  font-size: ${({ theme }) => theme.font.sm};
  height: 30px;

  ${({ $variant, $isSelected, theme }) => {
    switch ($variant) {
      case "select":
        return css`
          background-color: ${$isSelected ? "#000" : theme.bg.secondary};
          border-radius: ${theme.radius.lg};
          padding: 4px 8px;
        `;
      case "base":
      default:
        return css`
          border: 1px solid ${theme.colors.border};
          background-color: transparent;
          border-radius: ${theme.radius.sm};
          padding: 4px 8px;
          cursor: default;
        `;
    }
  }}
`;
