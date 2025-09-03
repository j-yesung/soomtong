import { useMemo, useState } from "react";

import { Column } from "@/components/ui";
import ReadyButton from "@/features/common/readyButton";
import { FixedExpenseInput, FixedTagSelector } from "@/features/expense/components";
import { useFixedExpenseStore } from "@/features/expense/store";
import { parseNumericInput } from "@/utils/formatter";

const DEFAULT_TAGS = ["교통비", "식비", "구독료"];

export default function FixedExpenseForm() {
  const add = useFixedExpenseStore((s) => s.add);

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");

  const amount = useMemo(() => parseNumericInput(value), [value]);

  const canSubmit = amount > 0 && !!tag;

  const handleAdd = () => {
    if (!canSubmit) return;

    add({ tag, amount });
    setValue("");
    setTag("");
  };

  return (
    <Column width="100%" gap={24}>
      <FixedExpenseInput value={value} onChange={setValue} />
      <FixedTagSelector tags={DEFAULT_TAGS} selected={tag} onSelect={setTag} />
      <ReadyButton onClick={handleAdd} text="추가" condition={canSubmit} />
    </Column>
  );
}
