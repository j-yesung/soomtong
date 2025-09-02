"use client";

import { useState } from "react";

import MainLayout from "@/components/layout/mainLayout";
import { Column, Heading, Row, Tag, Text } from "@/components/ui";
import ReadyButton from "@/features/common/readyButton";
import ExpensesInput from "@/features/expenses/components/expensesInput";

export default function ExpensesPage() {
  const [value, setValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <MainLayout>
      <Column align="flex-start" gap={24} width="100%">
        <Heading level={2} fontWeight="bold">
          고정지출을 입력해 주세요
        </Heading>

        <Column width="100%" gap={24}>
          <ExpensesInput value={value} onChange={setValue} />

          <Column gap={8}>
            <Text variant="caption" color="secondary">
              카테고리 선택
            </Text>

            <Row gap={8}>
              {["교통비", "식비", "구독료"].map((tag) => (
                <Tag key={tag} variant="select" onClick={() => handleTagClick(tag)} isSelected={selectedTag === tag}>
                  {tag}
                </Tag>
              ))}
            </Row>
          </Column>

          <ReadyButton onClick={() => {}} text="추가" condition={!!value} />
        </Column>
      </Column>
    </MainLayout>
  );
}
