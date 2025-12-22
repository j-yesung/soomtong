import styled, { css } from "styled-components";

import { Column } from "@/components/ui";
import { hideScrollbarOnTouch } from "@/styles/scroll";

export const ListScreenContainer = styled(Column)<{ $renderType: "expense" | "dashboard" }>`
  height: calc(100dvh - ${({ $renderType }) => ($renderType === "expense" ? 110 : 100)}px);
  overflow: hidden;
  gap: 12px;
  position: relative;

  .next-btn {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ListBox = styled(Column)<{ $hasItems: boolean }>`
  overflow: auto;
  gap: 12px;
  min-height: 0;
  align-self: stretch;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  ${hideScrollbarOnTouch}

  ${({ $hasItems }) =>
    $hasItems &&
    css`
      padding-bottom: 75px;
    `}
`;
