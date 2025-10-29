import { useMemo, useState } from "react";

import { Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { DatePicker } from "@/features/common/components";
import { FixedExpenseInput, FixedTagSelector } from "@/features/expense/components";
import { addFixedExpense } from "@/features/expense/store";
import { parseNumericInput } from "@/utils/formatter";

export default function FixedExpenseForm() {
  const userInfo = useUserStore((state) => state.userInfo);

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(1);

  const amount = useMemo(() => parseNumericInput(value), [value]);
  const canSubmit = amount > 0 && !!tag;

  const handleDatePickerOpen = () => {
    if (!canSubmit) return;
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    addFixedExpense({ userId: userInfo.id, tag, amount, day });
    setValue("");
    setTag("");
  };

  return (
    <Column gap={24} fullWidth>
      <FixedTagSelector selected={tag} onSelect={setTag} />
      <Row gap={4} height={40} align="center" fullWidth>
        <FixedExpenseInput value={value} onChange={setValue} />
        <Button width={120} onClick={handleDatePickerOpen} disabled={!canSubmit}>
          지출일 선택
        </Button>
      </Row>
      {open && <DatePicker day={day} onClose={() => setOpen(false)} callback={handleSubmit} onDayChange={setDay} />}
    </Column>
  );
}
