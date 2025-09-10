"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Button, ChipInput, Column, Row, Tag, Text } from "@/components/ui";

type Props = {
  tags: string[];
  selected: string;
  onSelect: (tag: string) => void;
  onAddTag?: (name: string) => void;
};

export default function FixedTagSelector({ tags, selected, onSelect, onAddTag }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const commitAdd = () => {
    const name = draft.trim();
    if (!name) return cancelAdd();
    onAddTag?.(name);
    setIsAdding(false);
    setDraft("");
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setDraft("");
  };

  return (
    <Column gap={8}>
      <Text variant="caption">카테고리 선택</Text>

      <Row gap={4} wrap="wrap" align="center">
        {tags.map((tag) => (
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
