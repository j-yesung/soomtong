import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Button, ChipInput, Column, Row, Tag } from "@/components/ui";
import { DEFAULT_TAGS } from "@/features/expense/constants";

type Props = {
  selected: string;
  onSelect: (tag: string) => void;
};

export default function FixedTagSelector({ selected, onSelect }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [tagList, setTagList] = useState<string[]>(DEFAULT_TAGS);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const AddTag = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (tagList.includes(trimmedName)) return;
    setTagList((prev) => [...prev, trimmedName]);
    onSelect(trimmedName);
  };

  const commitAdd = () => {
    const name = draft.trim();
    if (!name) return cancelAdd();
    AddTag(name);
    setIsAdding(false);
    setDraft("");
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setDraft("");
  };

  return (
    <Column gap={8}>
      <Row gap={4} wrap="wrap" align="center">
        {tagList.map((tag) => (
          <Tag key={tag} variant="select" onClick={() => onSelect(tag)} isSelected={selected === tag}>
            {tag}
          </Tag>
        ))}

        <AnimatePresence mode="popLayout" initial={false}>
          {!isAdding ? (
            <motion.div initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0 }}>
              <Button onClick={() => setIsAdding(true)} variant="dash" color="secondary" size="s" height={30}>
                + 추가
              </Button>
            </motion.div>
          ) : (
            <Row>
              <ChipInput
                id="chip-input"
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onEnter={commitAdd}
                onBlur={cancelAdd}
                type="text"
                enterKeyHint="done"
                fullWidth
              />
            </Row>
          )}
        </AnimatePresence>
      </Row>
    </Column>
  );
}
