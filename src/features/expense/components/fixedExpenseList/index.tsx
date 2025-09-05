"use client";

import { Button, Column, Row, Tag, Text } from "@/components/ui";
import { formatWithComma } from "@/utils/formatter";

import { useFixedExpenseStore } from "../../store";

export default function FixedExpenseList() {
  const items = useFixedExpenseStore((s) => s.items);
  const remove = useFixedExpenseStore((s) => s.remove);

  return (
    <Column as="ul" gap={12} width="100%">
      {items.map(({ id, tag, amount }) => (
        <Row as="li" key={id} justify="space-between" align="center" gap={12} width="100%">
          <Tag variant="base">{tag}</Tag>
          <Row gap={12} align="center">
            <Text variant="body">{formatWithComma(amount)}원</Text>
            <Button onClick={() => remove(id)}>삭제</Button>
          </Row>
        </Row>
      ))}
    </Column>
  );
}
