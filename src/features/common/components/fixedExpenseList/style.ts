import styled, { css } from "styled-components";

import { Column } from "@/shared/ui";

export const ListScreenContainer = styled(Column)`
  gap: 16px;
  position: relative;
  padding-bottom: calc(110px + env(safe-area-inset-bottom));
`;

export const ListBox = styled(Column)<{ $hasItems: boolean }>`
  gap: 10px;
  align-self: stretch;
  padding-bottom: 12px;

  ${({ $hasItems }) =>
    $hasItems &&
    css`
      padding-bottom: 12px;
    `}
`;

export const EmptyState = styled(Column)`
  flex: 1;
  min-height: 0;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;
