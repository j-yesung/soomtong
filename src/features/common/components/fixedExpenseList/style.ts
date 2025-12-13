import styled from "styled-components";

import { Column } from "@/components/ui";
import { hideScrollbarOnTouch } from "@/styles/scroll";

export const ListScreenContainer = styled(Column)`
  height: calc(100dvh - 160px);
  overflow: hidden;
  gap: 12px;
`;

export const ListBox = styled(Column)`
  overflow: auto;
  gap: 12px;
  min-height: 0;
  align-self: stretch;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  ${hideScrollbarOnTouch}
`;
