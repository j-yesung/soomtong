import styled from "styled-components";

import { SingleArrowIcon } from "@/assets/svg/interface";
import { Column, Row, Tag, Text } from "@/components/ui";
import { FixedItem } from "@/features/expense/types";

const ItemCard = styled.div`
  padding: 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadows.card};
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
            <Tag variant="fixed" fontSize={12}>
              {items.tag}
            </Tag>
            <Text size={16} weight={700}>
              {items.amount.toLocaleString()}원
            </Text>
          </Row>
          <Row justify="flex-end">
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
