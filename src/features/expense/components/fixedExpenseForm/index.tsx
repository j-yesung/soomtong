import { useMemo, useState } from "react";

import { BottomSheet, Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { WheelPicker } from "@/features/common/components";
import { useFixedExpenseAddMutation } from "@/features/common/queries";
import { FixedExpenseInput, FixedTagSelector } from "@/features/expense/components";
import { parseNumericInput } from "@/utils/formatter";

export default function FixedExpenseForm() {
  const today = new Date().getDate();
  const userId = useUserStore((state) => state.userInfo).id;

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(today);

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
    setOpen(false);
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

      <BottomSheet isOpen={open} onClose={() => setOpen(false)} title="납입일 선택">
        <WheelPicker items={Array.from({ length: 31 }, (_, i) => i + 1)} value={day} onChange={setDay} />

        <Button onClick={handleSubmit}>추가하기</Button>
      </BottomSheet>
    </Column>
  );
}
