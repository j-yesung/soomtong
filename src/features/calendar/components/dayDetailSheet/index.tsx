import styled from "styled-components";

import { Column, Row, Text } from "@/components/ui";
import BottomSheet from "@/components/ui/bottomSheet";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  dateLabel: string;
};

// 임시 데이터 - 추후 실제 데이터 연동
const MOCK_EXPENSES = [
  {
    id: 1,
    title: "뒷브레이크패드, 디스크 교환",
    subtitle: "(84440km)",
    time: "오전 10:20 - 오전 11:20",
    icon: "🚗",
  },
];

export default function DayDetailSheet({ isOpen, onClose, dateLabel }: Props) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={dateLabel}>
      <Column gap={16} style={{ padding: "16px 0" }}>
        {MOCK_EXPENSES.length > 0 ? (
          MOCK_EXPENSES.map((expense) => (
            <Row key={expense.id} gap={12} align="flex-start">
              <IconWrapper>{expense.icon}</IconWrapper>
              <Column gap={4} style={{ flex: 1 }}>
                <Text weight={500} size={15}>
                  {expense.title}
                </Text>
                {expense.subtitle && (
                  <Text color="gray" size={13}>
                    {expense.subtitle}
                  </Text>
                )}
                <Text color="gray" size={13}>
                  {expense.time}
                </Text>
              </Column>
            </Row>
          ))
        ) : (
          <Text color="gray" align="center" size={14}>
            이 날짜에 등록된 내역이 없습니다.
          </Text>
        )}
      </Column>
    </BottomSheet>
  );
}

const IconWrapper = styled.span`
  font-size: 24px;
`;
