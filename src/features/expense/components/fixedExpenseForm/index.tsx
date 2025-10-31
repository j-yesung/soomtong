import { useMemo, useState } from "react";

import { Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { DatePicker } from "@/features/common/components";
import { useFixedExpenseAddMutation } from "@/features/common/queries";
import { FixedExpenseInput, FixedTagSelector } from "@/features/expense/components";
import { parseNumericInput } from "@/utils/formatter";

export default function FixedExpenseForm() {
  const userId = useUserStore((state) => state.userInfo).id;

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(1);

  const { mutate } = useFixedExpenseAddMutation();

  const amount = useMemo(() => parseNumericInput(value), [value]);
  const canSubmit = amount > 0 && !!tag;

  const handleDatePickerOpen = () => {
    if (!canSubmit) return;
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    mutate({
      userId,
      item: {
        tag,
        amount,
        day,
        createdAt: Date.now(),
      },
    });
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

      <DatePicker day={day} isOpen={open} onClose={() => setOpen(false)} callback={handleSubmit} onDayChange={setDay} />
    </Column>
  );
}
