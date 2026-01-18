"use client";

import { useRouter } from "next/navigation";

import { Button, Card, Column, Text } from "@/components/ui";
import { useAiInsightStore } from "@/features/dashboard/expense/store";

export default function ExpenseAnalysisResultScreen() {
  const router = useRouter();
  const insight = useAiInsightStore((state) => state.insight);

  if (!insight) {
    return (
      <Column gap={12}>
        <Text size={20} weight={700}>
          AI 분석 결과
        </Text>
        <Text size={14} color="secondary">
          아직 분석 결과가 없어요. 지출내역에서 AI 분석을 실행해 주세요.
        </Text>
        <Button width={140} height={36} onClick={() => router.push("/dashboard/expense")}>
          분석하러 가기
        </Button>
      </Column>
    );
  }

  return (
    <Column gap={12}>
      <Text size={20} weight={700}>
        AI 분석 결과
      </Text>
      <Card direction="column" gap={8}>
        <Column gap={8} pvh={[0, 16]}>
          <Text size={13} color="secondary">
            {insight.month} 분석
          </Text>
          <Text as="p" size={15} style={{ whiteSpace: "pre-wrap" }}>
            {insight.text}
          </Text>
        </Column>
      </Card>
    </Column>
  );
}
