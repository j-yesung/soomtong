import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  gap: 16px;

  @media (max-height: 760px) {
    gap: 8px;
  }
`;

export const CalendarSection = styled.div`
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
`;

export const DetailSection = styled.div`
  flex: 1 1 0;
  min-height: 0;
`;
