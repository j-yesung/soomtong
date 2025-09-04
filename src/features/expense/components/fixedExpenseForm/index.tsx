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

  const [tagList, setTagList] = useState<string[]>(DEFAULT_TAGS);

  const [alwaysShowAdd, setAlwaysShowAdd] = useState(false);

  const amount = useMemo(() => parseNumericInput(value), [value]);
  const canSubmit = amount > 0 && !!tag;

  const handleSubmit = () => {
    if (!canSubmit) return;
    add({ tag, amount });
    setValue("");
    setTag("");
    setAlwaysShowAdd(true);
  };

  const handleAddTag = (name: string) => {
    const t = name.trim();
    if (!t) return;
    if (tagList.includes(t)) return;
    setTagList((prev) => [...prev, t]);
    setTag(t);
  };

  return (
    <Column width="100%" gap={24}>
      <FixedExpenseInput value={value} onChange={setValue} />
      <FixedTagSelector tags={tagList} selected={tag} onSelect={setTag} onAddTag={handleAddTag} />
      <ReadyButton onClick={handleSubmit} text="추가" condition={alwaysShowAdd ? true : canSubmit} />
    </Column>
  );
}
