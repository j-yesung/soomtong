import styled from "styled-components";

import { Column } from "@/shared/ui";

export const ListScreenContainer = styled(Column)`
  height: 100%;
  gap: 16px;
  position: relative;
`;

export const ListBox = styled(Column)`
  gap: 10px;
  align-self: stretch;
  padding-bottom: calc(110px + env(safe-area-inset-bottom));
`;

export const SummarySlot = styled.div`
  min-height: 56px;
  flex-shrink: 0;
`;

export const ListActions = styled.div<{ $hasItems: boolean }>`
  width: 100%;
  min-height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $hasItems }) => ($hasItems ? "space-between" : "flex-end")};
`;

export const SortControl = styled.label`
  position: relative;
  align-self: flex-start;
  min-height: 44px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
`;

export const SortSelect = styled.select`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border: 0;
  outline: none;
  font-size: 16px;
  cursor: pointer;

  @media (hover: hover) {
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.border.primary};
      outline-offset: 2px;
    }
  }
`;

export const EmptyState = styled(Column)`
  flex: 1;
  min-height: 0;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const Feedback = styled(Column)`
  flex: 1;
  min-height: 0;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
`;
