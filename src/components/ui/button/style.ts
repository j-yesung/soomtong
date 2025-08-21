import styled from "styled-components";

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.font.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.warning};
  }
`;
