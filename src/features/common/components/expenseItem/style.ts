import styled, { css } from "styled-components";

import type { FixedExpensePaymentStatus } from "@/shared/utils/date";

export const ItemCard = styled.div`
  padding: 14px 12px;
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition:
    transform 0.14s ease,
    box-shadow 0.14s ease,
    background-color 0.14s ease;
  touch-action: manipulation;
  will-change: transform;

  &:active {
    transform: scale(0.98) translateY(1px);
    box-shadow: none;
    background: ${({ theme }) => theme.colors.bg.secondary};
  }

  svg {
    transform: rotate(180deg);
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  > span {
    flex: 0 0 auto;
  }
`;

export const ItemIdentity = styled.div`
  display: inline-flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  min-width: 0;

  > button {
    flex: 0 0 auto;
  }

  .item-memo {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const StatusGroup = styled.div`
  display: inline-flex;
  flex: 1;
  align-items: center;
  gap: 6px;
  min-width: 0;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const paymentStatusStyles = {
  upcoming: css`
    border-color: ${({ theme }) => theme.colors.border.secondary};
    background: ${({ theme }) => theme.colors.bg.inverseWhite};
    color: ${({ theme }) => theme.colors.text.gray};
  `,
  dueToday: css`
    border-color: ${({ theme }) => theme.colors.border.blue};
    background: ${({ theme }) => theme.colors.bg.lightBlue};
    color: ${({ theme }) => theme.colors.text.blue};
  `,
  needsConfirmation: css`
    border-color: ${({ theme }) => theme.colors.badge.amber.text};
    background: ${({ theme }) => theme.colors.badge.amber.background};
    color: ${({ theme }) => theme.colors.badge.amber.text};
  `,
  paid: css`
    border-color: ${({ theme }) => theme.colors.border.darkBlue};
    background: ${({ theme }) => theme.colors.bg.darkBlue};
    color: ${({ theme }) => theme.colors.text.inverseWhite};
  `,
} as const;

export const PaidButton = styled.button<{ $status: FixedExpensePaymentStatus }>`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 22px;
  height: 22px;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  transition:
    transform 0.14s ease,
    background-color 0.14s ease,
    border-color 0.14s ease;

  ${({ $status }) => paymentStatusStyles[$status]}

  &::after {
    content: "";
    position: absolute;
    inset: -5px;
  }

  &:active {
    transform: scale(0.94);
  }

  svg {
    transform: none;
  }
`;

export const StatusLabel = styled.span<{ $status: FixedExpensePaymentStatus }>`
  overflow: hidden;
  color: ${({ $status, theme }) => {
    if ($status === "dueToday") return theme.colors.text.blue;
    if ($status === "needsConfirmation") return theme.colors.badge.amber.text;
    return theme.colors.text.darkBlue;
  }};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  > span {
    flex: 0 0 auto;
  }
`;
