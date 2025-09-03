"use client";

import { Column, Row, Text } from "@/components/ui";

import { useFixedExpenseStore } from "../../store";

const fmt = new Intl.NumberFormat("ko-KR");

export default function FixedExpenseList() {
  const items = useFixedExpenseStore((s) => s.items);
  const remove = useFixedExpenseStore((s) => s.remove);

  return (
    <Column gap={12} width="100%">
      {items.map((it) => (
        <Row key={it.id} justify="space-between" align="center" gap={12} width="100%">
          <Text variant="body">{it.tag}</Text>
          <Row gap={12} align="center">
            <Text variant="body">{fmt.format(it.amount)}원</Text>
            <button onClick={() => remove(it.id)}>삭제</button>
          </Row>
        </Row>
      ))}
    </Column>
  );
}
