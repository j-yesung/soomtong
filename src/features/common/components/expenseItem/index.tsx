import type { MouseEvent } from "react";

import { Check } from "lucide-react";

import { FixedItem } from "@/features/common/types";
import { getFixedExpenseBadgeTone } from "@/shared/config";
import { Column, Row, Tag, Text } from "@/shared/ui";
import { type FixedExpensePaymentStatus, getFixedExpensePaymentStatus } from "@/shared/utils/date";

import * as S from "./style";

type Props = {
  onClick?: () => void;
  onTogglePaid?: () => void;
  items: FixedItem;
  isPaid?: boolean;
  dueDate: string;
};

const PAYMENT_STATUS_LABELS: Partial<Record<FixedExpensePaymentStatus, string>> = {
  dueToday: "오늘 납부 예정",
  needsConfirmation: "납부 확인 필요",
  paid: "납부 완료",
};

export default function ExpenseItem({ onClick, onTogglePaid, items, isPaid = false, dueDate }: Props) {
  const badgeTone = getFixedExpenseBadgeTone(items.tag);
  const paymentStatus = getFixedExpensePaymentStatus(dueDate, isPaid);
  const paymentStatusLabel = PAYMENT_STATUS_LABELS[paymentStatus];

  const handlePaidClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onTogglePaid?.();
  };

  return (
    <S.ItemCard as="li" onClick={onClick}>
      <Row justify="center" gap={16}>
        <Column gap={10} fullWidth>
          <S.HeaderRow>
            <S.ItemIdentity>
              <Tag variant="badge" size="sm" tone={badgeTone}>
                {items.tag}
              </Tag>
              {items.memo && (
                <Text className="item-memo" size={12} weight={500} color="secondary">
                  {items.memo}
                </Text>
              )}
            </S.ItemIdentity>
            <Text size={16} weight={700}>
              {items.amount.toLocaleString()}원
            </Text>
          </S.HeaderRow>
          <S.MetaRow>
            <S.StatusGroup>
              <S.PaidButton
                type="button"
                onClick={handlePaidClick}
                $status={paymentStatus}
                aria-label={`${items.tag} ${dueDate} 납부 완료 ${isPaid ? "해제" : "표시"}`}
                aria-pressed={isPaid}
              >
                <Check size={12} strokeWidth={2.8} />
              </S.PaidButton>
              {paymentStatusLabel && <S.StatusLabel $status={paymentStatus}>{paymentStatusLabel}</S.StatusLabel>}
            </S.StatusGroup>
            <Text size={14} variant="caption">
              {items.day}일
            </Text>
          </S.MetaRow>
        </Column>
      </Row>
    </S.ItemCard>
  );
}
