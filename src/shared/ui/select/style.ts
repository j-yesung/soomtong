import styled from "styled-components";

export const Control = styled.div`
  position: relative;
  width: 100%;

  > svg {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.text.secondary};
    pointer-events: none;
  }
`;

export const NativeSelect = styled.select`
  width: 100%;
  min-height: 52px;
  padding: 0 38px 0 12px;
  appearance: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font: inherit;
  font-size: 16px;
  text-overflow: ellipsis;
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  outline: none;

  &:disabled {
    opacity: 0.5;
  }
`;
