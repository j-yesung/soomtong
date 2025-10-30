import { useState } from "react";

import { Button, Column, Row } from "@/components/ui";
import { MoneyInput, SmoothTabs, WheelPicker } from "@/features/common/components";

type Props = {
  onClose: () => void;
};

export default function FixedExpenseAddForm({ onClose }: Props) {
  const today = new Date().getDate();

  const [expense, setExpense] = useState("");
  const [day, setDay] = useState(today);

  return (
    <Column gap={20}>
      <SmoothTabs tabList={["금액 입력", "지출일"]}>
        <MoneyInput value={expense} onChange={setExpense} />
        <WheelPicker
          items={Array.from({ length: 31 }, (_, i) => i + 1)}
          value={day}
          onChange={(d) => setDay?.(d)}
          onActiveChange={(d) => setDay?.(d)}
        />
      </SmoothTabs>

      <Row gap={4} justify="space-between">
        <Button color="danger" onClick={onClose}>
          취소
        </Button>
        <Button onClick={() => {}} disabled={!expense}>
          저장
        </Button>
      </Row>
    </Column>
  );
}
