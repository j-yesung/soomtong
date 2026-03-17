import { FixedItem } from "@/features/common/types";
import { SingleArrowIcon } from "@/shared/assets/svg/interface";
import { Column, Row, Tag, Text } from "@/shared/ui";

import * as S from "./style";

type Props = {
  onClick?: () => void;
  items: FixedItem;
};

export default function ExpenseItem({ onClick, items }: Props) {
  return (
    <S.ItemCard as="li" onClick={onClick}>
      <Row justify="center" gap={16}>
        <Column gap={4} fullWidth>
          <Row align="center" justify="space-between">
            <Tag variant="chip" size="sm">
              {items.tag}
            </Tag>
            <Text size={16} weight={700}>
              {items.amount.toLocaleString()}원
            </Text>
          </Row>
          <S.MetaRow>
            <Text size={12} variant="caption">
              {items.memo && items.memo}
            </Text>
            <Text size={14} variant="caption">
              매월 {items.day}일
            </Text>
          </S.MetaRow>
        </Column>
        <Row align="center">
          <SingleArrowIcon size={32} />
        </Row>
      </Row>
    </S.ItemCard>
  );
}
