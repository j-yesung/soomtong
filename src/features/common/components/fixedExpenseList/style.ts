import styled, { css } from "styled-components";

import { hideScrollbarOnTouch } from "@/shared/styles/scroll";
import { Column } from "@/shared/ui";

export const ListScreenContainer = styled(Column)`
  height: calc(100dvh - 100px);
  overflow: hidden;
  gap: 12px;
  position: relative;
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
