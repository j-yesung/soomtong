import { useState } from "react";

import styled from "styled-components";

import { CategoryButton } from "@/shared/ui";
import { TagItem } from "@/shared/config";

type Props = {
  onClick: (tag: string) => void;
  defaultTag?: string;
  categoryList: TagItem[];
};

export default function FixedExpenseCategoryList({ onClick, defaultTag, categoryList }: Props) {
  const [selectedName, setSelectedName] = useState(defaultTag ?? "");

  const handleClick = (name: string) => {
    setSelectedName(name);
    onClick(name);
  };

  return (
    <ListGrid>
      {categoryList.map(({ name, icon }) => (
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
  align-self: stretch;
`;
