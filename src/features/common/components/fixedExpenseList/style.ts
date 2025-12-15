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

export const ListAddButton = styled.button`
  border: 1px dashed ${({ theme }) => theme.colors.border.primary};
  max-height: 85px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
`;
