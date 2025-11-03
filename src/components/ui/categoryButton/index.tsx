import styled from "styled-components";

import { Row, Text } from "@/components/ui";

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
        <Text weight={600}>{name}</Text>
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
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.bg.darkBlue : theme.colors.border.secondary)};
  min-height: 80px;
`;
