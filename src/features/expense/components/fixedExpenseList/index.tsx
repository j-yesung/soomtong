"use client";

import { Row, Tag, Text } from "@/components/ui";
import { theme } from "@/styles/theme";
import { formatWithComma } from "@/utils/formatter";

import { useFixedExpenseStore } from "../../store";
import DeleteIconButton from "./deleteIconButton";
import MotionList from "./motionList";
import SwipeItem from "./swipeItem";

export default function FixedExpenseList() {
  const items = useFixedExpenseStore((s) => s.items);
  const remove = useFixedExpenseStore((s) => s.remove);

  return (
    <MotionList>
      {items.map(({ id, tag, amount }) => (
        <SwipeItem key={id} onRemove={() => remove(id)} rightAction={<DeleteIconButton onClick={() => remove(id)} />}>
          <Row
            justify="space-between"
            align="center"
            gap={12}
            width="100%"
            borderRadius={8}
            padding={2}
            backgroundColor={theme.bg.secondary}
            role="button"
            aria-label={`${tag} list remove`}
          >
            <Tag variant="list">{tag}</Tag>
            <Row gap={12} align="center">
              <Text variant="body">{formatWithComma(amount)}원</Text>
            </Row>
          </Row>
        </SwipeItem>
      ))}
    </MotionList>
  );
}
