import styled from "styled-components";

import { CategoryButton } from "@/components/ui";
import { DEFAULT_TAG_LIST } from "@/features/expense/constants";

export default function FixedExpenseCategoryList() {
  return (
    <ListGrid>
      {DEFAULT_TAG_LIST.map(({ name, icon }) => (
        <CategoryButton key={name} name={name} icon={icon} onClick={() => {}} />
      ))}
      {DEFAULT_TAG_LIST.map(({ name, icon }) => (
        <CategoryButton key={name} name={name} icon={icon} onClick={() => {}} />
      ))}
    </ListGrid>
  );
}

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  overflow: auto;
  align-self: stretch;
`;
