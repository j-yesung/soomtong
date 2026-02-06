import styled from "styled-components";

import { FixedItem } from "@/features/expense/types";
import { SingleArrowIcon } from "@/shared/assets/svg/interface";
import { Column, Row, Tag, Text } from "@/shared/ui";

const ItemCard = styled.div`
  padding: 12px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  svg {
    transform: rotate(180deg);
  }
`;

type Props = {
  onClick?: () => void;
  items: FixedItem;
};

export default function ExpenseItem({ onClick, items }: Props) {
  return (
    <ItemCard as="li" onClick={onClick}>
      <Row justify="center" gap={16}>
        <Column gap={4} fullWidth>
          <Row align="center" justify="space-between">
            <Tag variant="fixed" fontSize={14} fontWeight={600}>
              {items.tag}
            </Tag>
            <Text size={16} weight={700}>
              {items.amount.toLocaleString()}원
            </Text>
          </Row>
          <Row justify="space-between">
            <Text size={14} variant="caption">
              {items.memo && items.memo}
            </Text>
            <Text size={14} variant="caption">
              매월 {items.day}일
            </Text>
          </Row>
        </Column>
        <Row align="center">
          <SingleArrowIcon size={36} />
        </Row>
      </Row>
    </ItemCard>
  );
}
