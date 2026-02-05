"use client";

import styled from "styled-components";

import { Row, Text } from "@/shared/ui";

type Props = {
  name: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
};

export default function CategoryButton({ name, icon, selected, onClick }: Props) {
  return (
    <Row justify="center" align="center" fullWidth>
      <ItemButton onClick={onClick} $selected={selected}>
        {icon}
        <Text weight={600} color={selected ? "darkBlue" : "primary"}>
          {name}
        </Text>
      </ItemButton>
    </Row>
  );
}

const ItemButton = styled.button.attrs({ type: "button" })<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background: ${({ theme, $selected }) => ($selected ? theme.colors.bg.lightBlue : theme.colors.bg.inverseWhite)};
  border: 1px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.border.darkBlue : theme.colors.border.secondary)};
  color: ${({ theme, $selected }) => ($selected ? theme.colors.text.darkBlue : theme.colors.text.primary)};
  min-height: 80px;

  & > svg {
    stroke: ${({ theme, $selected }) => ($selected ? theme.colors.border.darkBlue : theme.colors.border.primary)};
  }
`;
