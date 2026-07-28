import styled from "styled-components";

export const SettingsButton = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  color: ${({ theme }) => theme.colors.text.secondary};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.blue};
      color: ${({ theme }) => theme.colors.text.primary};
      transform: rotate(10deg);
    }
  }
`;
