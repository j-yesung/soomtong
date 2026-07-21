import styled from "styled-components";

import { Column } from "@/shared/ui";

export const ListScreenContainer = styled(Column)`
  gap: 16px;
  position: relative;
  padding-bottom: calc(110px + env(safe-area-inset-bottom));
`;

export const ListBox = styled(Column)`
  gap: 10px;
  align-self: stretch;
  padding-bottom: 12px;
`;

export const ListActions = styled.div<{ $hasItems: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $hasItems }) => ($hasItems ? "space-between" : "flex-end")};
`;

export const SortControl = styled.label`
  position: relative;
  align-self: flex-start;
  min-height: 36px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.border.primary};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

export const SortSelect = styled.select`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  font-size: 16px;
  cursor: pointer;
`;

export const EmptyState = styled(Column)`
  flex: 1;
  min-height: 0;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;
