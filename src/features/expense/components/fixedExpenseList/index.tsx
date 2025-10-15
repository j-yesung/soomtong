"use client";

import { useEffect } from "react";

import { Row, Tag, Text } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { removeFixedExpense, useFixedExpenseStore } from "@/features/expense/store";
import { theme } from "@/styles/theme";
import { formatWithComma } from "@/utils/formatter";

import DeleteIconButton from "./deleteIconButton";
import MotionList from "./motionList";
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
      {items?.map(({ createdAt, tag, amount }) => (
        <SwipeItem
          key={createdAt}
          onRemove={() => handleRemove(tag, createdAt)}
          rightAction={<DeleteIconButton onClick={() => handleRemove(tag, createdAt)} />}
        >
          <Row
            justify="space-between"
            align="center"
            gap={12}
            width="100%"
            borderRadius={8}
            padding={2}
            backgroundColor={theme.colors.bg.secondary}
            role="button"
            aria-label={`${tag} list remove`}
          >
            <Tag variant="list">{tag}</Tag>
            <Row gap={12} align="center">
              <Text>{formatWithComma(amount)}원</Text>
            </Row>
          </Row>
        </SwipeItem>
      ))}
    </MotionList>
  );
}
