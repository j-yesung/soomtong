import { Row } from "react-day-picker";
import styled from "styled-components";

import { hideScrollbarOnTouch } from "@/shared/styles/scroll";

export const PanelContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 20px 20px 12px;
  border-bottom: 1px solid #f0f0f0;
`;

export const ScrollableContent = styled.div<{ $hasExpenses: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: ${({ $hasExpenses }) => ($hasExpenses ? "calc(84px + env(safe-area-inset-bottom))" : "20px")};

  ${hideScrollbarOnTouch};
`;

export const ExpenseItem = styled(Row)`
  gap: 12px;
  align-items: flex-start;
`;

export const DotIndicator = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
