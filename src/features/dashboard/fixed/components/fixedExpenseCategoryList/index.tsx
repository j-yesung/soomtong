import { useState } from "react";

import styled from "styled-components";

import { CategoryButton } from "@/components/ui";
import { DEFAULT_TAG_LIST } from "@/features/expense/constants";

type Props = {
  onClick: (tag: string) => void;
  defaultTag?: string;
};

export default function FixedExpenseCategoryList({ onClick, defaultTag }: Props) {
  const [selectedName, setSelectedName] = useState(defaultTag ?? "");

  const handleClick = (name: string) => {
    setSelectedName(name);
    onClick(name);
  };

  return (
    <ListGrid onPointerDownCapture={(e) => e.stopPropagation()}>
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
