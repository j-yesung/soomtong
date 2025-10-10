import { FormEvent, useMemo, useState } from "react";

import { Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { FixedExpenseInput, FixedTagSelector } from "@/features/expense/components";
import { useFixedExpenseStore } from "@/features/expense/store";
import { parseNumericInput } from "@/utils/formatter";

export default function FixedExpenseForm() {
  const add = useFixedExpenseStore((state) => state.add);
  const userInfo = useUserStore((state) => state.userInfo);

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");

  const amount = useMemo(() => parseNumericInput(value), [value]);
  const canSubmit = amount > 0 && !!tag;

  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();
    if (!canSubmit) return;
    add({ userId: userInfo.id, tag, amount });
    setValue("");
    setTag("");
  };

  return (
    <Column gap={24} fullWidth>
      <FixedTagSelector selected={tag} onSelect={setTag} />
      <Row as="form" gap={4} align="center" onSubmit={handleSubmit} fullWidth>
        <FixedExpenseInput value={value} onChange={setValue} />
        <Button type="submit" height={39}>
          +
        </Button>
      </Row>
    </Column>
  );
}
