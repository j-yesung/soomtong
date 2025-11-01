import { useState } from "react";

import styled from "styled-components";

import { CategoryButton } from "@/components/ui";
import { DEFAULT_TAG_LIST } from "@/features/expense/constants";

type Props = {
  onClick: (tag: string) => void;
};

export default function FixedExpenseCategoryList({ onClick }: Props) {
  const [selectedName, setSelectedName] = useState("");

  const handleClick = (name: string) => {
    setSelectedName(name);
    onClick(name);
  };

  return (
    <ListGrid>
      {DEFAULT_TAG_LIST.map(({ name, icon }) => (
        <CategoryButton
          key={name}
          name={name}
          icon={icon}
          selected={name === selectedName}
          onClick={() => handleClick(name)}
        />
      ))}
    </ListGrid>
  );
}

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  overflow: auto;
  align-self: stretch;
`;
