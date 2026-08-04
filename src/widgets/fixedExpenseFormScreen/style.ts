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
