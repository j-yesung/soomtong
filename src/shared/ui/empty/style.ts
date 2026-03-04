import styled from "styled-components";

import Column from "../column";

export const Wrapper = styled(Column)`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.65;
`;
