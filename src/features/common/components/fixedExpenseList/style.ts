import styled, { css } from "styled-components";

import { hideScrollbarOnTouch } from "@/shared/styles/scroll";
import { Column } from "@/shared/ui";

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
  padding-bottom: 110px;
  ${hideScrollbarOnTouch}

  ${({ $hasItems }) =>
    $hasItems &&
    css`
      padding-bottom: 75px;
    `}
`;
