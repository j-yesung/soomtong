import styled from "styled-components";

import { AppTheme } from "@/styles/theme";

type StylesProps = {
  $direction?: "row" | "column";
  $gap?: number;
  $radius?: keyof AppTheme["radius"];
  $position?: React.CSSProperties["position"];
};

export const CardFooter = styled.button`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background: ${({ theme }) => theme.colors.bg.primary};
  color: ${({ theme }) => theme.colors.text.inverseWhite};
  font-size: 16px;
  font-weight: 700;
  padding: 12px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  text-align: center;
  margin-top: 14px;
  cursor: pointer;
`;

export const CardRoot = styled.div<StylesProps>`
  width: 100%;
  padding: 16px 0;
  border-radius: ${({ theme, $radius }) => theme.radius[$radius ?? "sm"]};
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === "column" ? "column" : "row")};
  white-space: pre-wrap;
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : "0")};

  ${({ $position }) => $position && `position: ${$position};`}

  &:has(${CardFooter}) {
    padding-bottom: 0;
  }
`;
