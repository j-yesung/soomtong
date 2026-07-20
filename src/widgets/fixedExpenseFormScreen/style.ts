import { ChevronDown } from "lucide-react";
import styled from "styled-components";

export const SelectFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

export const SelectField = styled.label`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const FieldLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const SelectControl = styled.div`
  position: relative;
`;

export const SelectIcon = styled(ChevronDown)`
  position: absolute;
  top: 50%;
  right: 14px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  transform: translateY(-50%);
`;

export const NativeSelect = styled.select`
  width: 100%;
  min-height: 52px;
  padding: 0 40px 0 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  font: inherit;
  text-overflow: ellipsis;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.md};

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.border.primary};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;
