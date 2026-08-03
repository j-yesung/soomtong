import styled from "styled-components";

export const NativeSelect = styled.select`
  width: 100%;
  min-height: 52px;
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font: inherit;
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.md};

  &:focus {
    outline: none;
  }

  @media (hover: hover) {
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.border.primary};
      outline-offset: 2px;
    }
  }
`;
