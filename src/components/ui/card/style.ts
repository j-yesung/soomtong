import styled from "styled-components";

type StylesProps = {
  $direction?: "row" | "column";
  $gap?: number;
};

export const CardFooter = styled.button`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background: ${({ theme }) => theme.colors.bg.primary};
  color: ${({ theme }) => theme.colors.text.inverseWhite};
  font-size: 14px;
  font-weight: 700;
  padding: 10px 16px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  text-align: center;
  margin-top: 14px;
`;

export const CardRoot = styled.div<StylesProps>`
  width: 100%;
  padding: 16px 0;
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === "column" ? "column" : "row")};
  white-space: pre-wrap;
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : "0")};

  &:has(${CardFooter}) {
    padding-bottom: 0;
  }
`;
