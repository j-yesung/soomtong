import styled from "styled-components";

export const ItemCard = styled.div<{ $isPaid: boolean }>`
  padding: 14px 12px;
  background: ${({ $isPaid, theme }) => ($isPaid ? theme.colors.bg.lightBlue : theme.colors.bg.inverseWhite)};
  border: 1px solid ${({ $isPaid, theme }) => ($isPaid ? theme.colors.border.darkBlue : theme.colors.border.secondary)};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition:
    transform 0.14s ease,
    box-shadow 0.14s ease,
    background-color 0.14s ease;
  touch-action: manipulation;
  will-change: transform;

  &:active {
    transform: scale(0.98) translateY(1px);
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
    background: ${({ theme }) => theme.colors.bg.secondary};
  }

  svg {
    transform: rotate(180deg);
  }
`;

export const PaidButton = styled.button<{ $isPaid: boolean }>`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${({ $isPaid, theme }) => ($isPaid ? theme.colors.border.darkBlue : theme.colors.border.secondary)};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $isPaid, theme }) => ($isPaid ? theme.colors.bg.darkBlue : theme.colors.bg.inverseWhite)};
  color: ${({ $isPaid, theme }) => ($isPaid ? theme.colors.text.inverseWhite : theme.colors.text.gray)};
  cursor: pointer;
  transition:
    transform 0.14s ease,
    background-color 0.14s ease,
    border-color 0.14s ease;

  &:active {
    transform: scale(0.94);
  }

  svg {
    transform: none;
  }
`;

export const ArrowBox = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.gray};
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  span:first-child {
    padding-left: 5px;
  }
`;
