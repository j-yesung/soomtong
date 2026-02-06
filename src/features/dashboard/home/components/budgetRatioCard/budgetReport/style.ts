import styled from "styled-components";

import { Column, Row, Text } from "@/shared/ui";

export const Container = styled(Column)`
  gap: 4px;
  padding: 0 16px;
`;

export const AmountRow = styled(Row)`
  gap: clamp(4px, 1.5vw, 6px);
  align-items: center;
  flex-wrap: wrap;
`;

export const AvailableText = styled(Text)`
  font-size: clamp(16px, 5vw, 20px);
  font-weight: 700;
`;
