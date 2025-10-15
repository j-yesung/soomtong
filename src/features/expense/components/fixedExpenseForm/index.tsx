import { useMemo, useState } from "react";

import { Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { DatePicker } from "@/features/common/components";
import { FixedExpenseInput, FixedTagSelector } from "@/features/expense/components";
import { useFixedExpenseStore } from "@/features/expense/store";
import { parseNumericInput } from "@/utils/formatter";

export default function FixedExpenseForm() {
  const add = useFixedExpenseStore((state) => state.add);
  const userInfo = useUserStore((state) => state.userInfo);

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false);

  const amount = useMemo(() => parseNumericInput(value), [value]);
  const canSubmit = amount > 0 && !!tag;

  const handleSubmit = () => {
    if (!canSubmit) return;
    add({ userId: userInfo.id, tag, amount });
    setValue("");
    setTag("");
  };

  return (
    <Column gap={24} fullWidth>
      <FixedTagSelector selected={tag} onSelect={setTag} />
      <Row gap={4} height={40} align="center" fullWidth>
        <FixedExpenseInput value={value} onChange={setValue} />
        <Button width={120} onClick={() => setOpen(true)}>
          납입일 선택
        </Button>
      </Row>
      <DatePicker open={open} onClose={() => setOpen(false)} callback={handleSubmit} />
    </Column>
  );
}
