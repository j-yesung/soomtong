import styled from "styled-components";

import { Text } from "@/components/ui";

type Props = {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export default function CategoryButton({ name, icon, onClick }: Props) {
  return (
    <ItemBox>
      <ItemButton onClick={onClick}>
        {icon}
        <Text>{name}</Text>
      </ItemButton>
    </ItemBox>
  );
}

const ItemBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemButton = styled.button.attrs({ type: "button" })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  min-height: 80px;
`;
