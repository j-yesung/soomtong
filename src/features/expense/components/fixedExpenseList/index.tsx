"use client";

import { Column, Row, Tag, Text } from "@/components/ui";

import { useFixedExpenseStore } from "../../store";

const fmt = new Intl.NumberFormat("ko-KR");

export default function FixedExpenseList() {
  const items = useFixedExpenseStore((s) => s.items);
  console.log(items);
  const remove = useFixedExpenseStore((s) => s.remove);

  return (
    <Column gap={12} width="100%">
      {items.map(({ id, tag, amount }) => (
        <Row key={id} justify="space-between" align="center" gap={12} width="100%">
          <Tag variant="base">{tag}</Tag>
          <Row gap={12} align="center">
            <Text variant="body">{fmt.format(amount)}원</Text>
            <button onClick={() => remove(id)}>삭제</button>
          </Row>
        </Row>
      ))}
    </Column>
  );
}
