import styled from "styled-components";

type StylesProps = {
  $isDirection?: "row" | "column";
  $gap?: number;
};

export const CardRoot = styled.div<StylesProps>`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  display: flex;
  flex-direction: ${({ $isDirection }) => ($isDirection === "column" ? "column" : "row")};
  white-space: pre-wrap;
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : "0")};
`;
