import { ChevronDown } from "lucide-react";
import styled from "styled-components";

export const SelectFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

export const SelectField = styled.label`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const SelectControl = styled.div`
  position: relative;
`;

export const SelectIcon = styled(ChevronDown)`
  position: absolute;
  top: 50%;
  right: 12px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  transform: translateY(-50%);
`;

export const NativeSelect = styled.select`
  width: 100%;
  min-height: 44px;
  padding: 0 36px 0 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font: inherit;
  text-overflow: ellipsis;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
`;
