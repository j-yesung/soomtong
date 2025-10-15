"use client";

import { useEffect } from "react";

import { Row, Tag, Text } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { removeFixedExpense, useFixedExpenseStore } from "@/features/expense/store";
import { formatWithComma } from "@/utils/formatter";

import DeleteIconButton from "./deleteIconButton";
import MotionList from "./motionList";
import { ListItem } from "./style";
import SwipeItem from "./swipeItem";

export default function FixedExpenseList() {
  const userInfo = useUserStore((state) => state.userInfo);
  const { items, updateItems } = useFixedExpenseStore();
  const { data } = useFixedExpenseTableQuery();

  useEffect(() => {
    if (data) {
      updateItems(data?.items);
    }
  }, [data]);

  const handleRemove = (tag: string, createdAt: number) => {
    return removeFixedExpense({ userId: userInfo.id, tag, createdAt });
  };

  return (
    <MotionList>
      {items?.map(({ createdAt, tag, amount, day }) => (
        <SwipeItem
          key={createdAt}
          onRemove={() => handleRemove(tag, createdAt)}
          rightAction={<DeleteIconButton onClick={() => handleRemove(tag, createdAt)} />}
        >
          <ListItem role="button" aria-label={`${tag} list remove`}>
            <Row gap={12} justify="space-between" align="center" fullWidth>
              <Tag variant="list">{tag}</Tag>
              <Text size={18} weight={700}>
                {formatWithComma(amount)}원
              </Text>
            </Row>
            <Row justify="flex-end" fullWidth>
              <Text variant="caption" size={14}>
                매월 {day}일
              </Text>
            </Row>
          </ListItem>
        </SwipeItem>
      ))}
    </MotionList>
  );
}
