import styled from "styled-components";

import { Column, Text } from "@/shared/ui";

export const Container = styled(Column)`
  gap: 4px;
  flex: 1;
`;

export const Description = styled(Text)`
  font-size: clamp(14px, 4vw, 18px);
  font-weight: 500;
`;

export const Amount = styled(Text)`
  font-size: clamp(18px, 5.5vw, 24px);
  font-weight: 700;
`;
