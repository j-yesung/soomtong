import styled from "styled-components";

import { Column } from "@/components/ui";

export const ListItem = styled(Column)`
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bg.inverseWhite};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;
