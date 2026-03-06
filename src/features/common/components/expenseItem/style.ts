import styled from "styled-components";

export const ItemCard = styled.div`
  padding: 14px 12px;
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
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

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  span:first-child {
    padding-left: 5px;
  }
`;
