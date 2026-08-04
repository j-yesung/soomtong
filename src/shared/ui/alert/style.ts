import styled from "styled-components";

export const Dialog = styled.dialog`
  width: min(92vw, 320px);
  padding: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.modal};

  &[open] {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.45);
  }
`;
