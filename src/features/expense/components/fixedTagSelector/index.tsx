"use client";

import { Column, Row, Tag, Text } from "@/components/ui";

type Props = {
  tags: string[];
  selected: string;
  onSelect: (tag: string) => void;
};

export default function FixedTagSelector({ tags, selected, onSelect }: Props) {
  return (
    <Column gap={8}>
      <Text variant="caption" color="secondary">
        카테고리 선택
      </Text>
      <Row gap={8} wrap="wrap">
        {tags.map((tag) => (
          <Tag key={tag} variant="select" onClick={() => onSelect(tag)} isSelected={selected === tag}>
            {tag}
          </Tag>
        ))}
      </Row>
    </Column>
  );
}
