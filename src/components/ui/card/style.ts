import styled from "styled-components";

import { AppTheme } from "@/styles/theme";

type StylesProps = {
  $direction?: "row" | "column";
  $gap?: number;
  $radius?: keyof AppTheme["radius"];
  $position?: React.CSSProperties["position"];
};

export const CardFooter = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background: ${({ theme }) => theme.colors.bg.primary};
  color: ${({ theme }) => theme.colors.text.inverseWhite};

  display: flex;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;

  & > button + button {
    position: relative;
  }

  & > button + button::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    width: 1px;
    background: ${({ theme }) => theme.colors.border.light};
    pointer-events: none;
  }

  button {
    flex: 1;
    overflow: hidden;
    position: relative;
    padding: 12px 8px;
  }

  button::after {
    content: "";
    inset: 8px;
    position: absolute;
    background: rgba(255, 255, 255, 0.12);
    opacity: 0;
    transition: opacity 120ms ease;
    pointer-events: none;
    border-radius: 8px;
  }

  button:active::after {
    opacity: 1;
  }

  button:active > .inner {
    transform: scale(0.98);
  }
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
