import { useEffect, useState } from "react";

import styled from "styled-components";

import { CategoryItem } from "@/shared/config";
import { Tag } from "@/shared/ui";

type Props = {
  onClick: (tag: string) => void;
  defaultTag?: string;
  categoryList: CategoryItem[];
};

export default function FixedExpenseCategoryList({ onClick, defaultTag, categoryList }: Props) {
  const [selectedName, setSelectedName] = useState(defaultTag ?? "");

  useEffect(() => {
    setSelectedName(defaultTag ?? "");
  }, [defaultTag]);

  const handleClick = (name: string) => {
    setSelectedName(name);
    onClick(name);
  };

  return (
    <ListWrap>
      {categoryList.map(({ name }) => (
        <Tag key={name} variant="chip" size="md" selected={name === selectedName} onClick={() => handleClick(name)}>
          {name}
        </Tag>
      ))}
    </ListWrap>
  );
}

const ListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-self: stretch;
`;
