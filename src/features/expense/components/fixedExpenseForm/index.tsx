import { useMemo, useState } from "react";

import { Button, Column, Row } from "@/components/ui";
import { FixedExpenseInput, FixedTagSelector } from "@/features/expense/components";
import { DEFAULT_TAGS } from "@/features/expense/constant";
import { useFixedExpenseStore } from "@/features/expense/store";
import { parseNumericInput } from "@/utils/formatter";

export default function FixedExpenseForm() {
  const add = useFixedExpenseStore((state) => state.add);

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");

  const [tagList, setTagList] = useState<string[]>(DEFAULT_TAGS);

  const amount = useMemo(() => parseNumericInput(value), [value]);
  const canSubmit = amount > 0 && !!tag;

  const handleSubmit = () => {
    if (!canSubmit) return;
    add({ tag, amount });
    setValue("");
    setTag("");
  };

  const handleAddTag = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (tagList.includes(trimmedName)) return;
    setTagList((prev) => [...prev, trimmedName]);
    setTag(trimmedName);
  };

  return (
    <Column gap={24} fullWidth>
      <FixedTagSelector tags={tagList} selected={tag} onSelect={setTag} onAddTag={handleAddTag} />
      <Row fullWidth gap={4} align="center">
        <FixedExpenseInput value={value} onChange={setValue} />
        <Button onClick={handleSubmit} height={42}>
          +
        </Button>
      </Row>
    </Column>
  );
}
