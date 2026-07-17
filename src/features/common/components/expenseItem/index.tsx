import type { MouseEvent } from "react";

import { Check } from "lucide-react";

import { FixedItem } from "@/features/common/types";
import { SingleArrowIcon } from "@/shared/assets/svg/interface";
import { getFixedExpenseBadgeTone } from "@/shared/config";
import { Column, Row, Tag, Text } from "@/shared/ui";

import * as S from "./style";

type Props = {
  onClick?: () => void;
  onTogglePaid?: () => void;
  items: FixedItem;
  isPaid?: boolean;
  dueDate?: string;
};

export default function ExpenseItem({ onClick, onTogglePaid, items, isPaid = false, dueDate }: Props) {
  const badgeTone = getFixedExpenseBadgeTone(items.tag);

  const handlePaidClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onTogglePaid?.();
  };

  return (
    <S.ItemCard as="li" onClick={onClick} $isPaid={isPaid}>
      <Row justify="center" gap={16}>
        <Column gap={4} fullWidth>
          <Row align="center" justify="space-between">
            <Tag variant="badge" size="sm" tone={badgeTone}>
              {items.tag}
            </Tag>
            <Text size={16} weight={700}>
              {items.amount.toLocaleString()}원
            </Text>
          </Row>
          <S.MetaRow>
            <Text size={12} variant="caption">
              {isPaid ? "납부 완료" : items.memo}
            </Text>
            <Text size={14} variant="caption">
              매월 {items.day}일
            </Text>
          </S.MetaRow>
        </Column>
        <S.PaidButton
          type="button"
          onClick={handlePaidClick}
          $isPaid={isPaid}
          aria-label={`${items.tag} ${dueDate ?? ""} 납부 완료 ${isPaid ? "해제" : "표시"}`}
          aria-pressed={isPaid}
        >
          <Check size={18} strokeWidth={2.4} />
        </S.PaidButton>
        <S.ArrowBox>
          <SingleArrowIcon size={32} />
        </S.ArrowBox>
      </Row>
    </S.ItemCard>
  );
}
