import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { Alert, Button, Column, Row, Text } from "@/components/ui";
import { SlotCounter } from "@/features/common/components";
import { useDetailExpenseListQuery } from "@/features/common/queries";
import { useAiInsightMutation } from "@/features/dashboard/expense/queries";
import { useAiInsightStore } from "@/features/dashboard/expense/store";
import { buildMonthlySummary } from "@/features/dashboard/expense/utils/summary";
import { formatTitle, getCurrentYearMonthKst, groupByKstDate } from "@/utils/date";

import * as S from "./style";

export default function DashboardExpenseScreen() {
  const { data } = useDetailExpenseListQuery();

  const grouped = useMemo(() => groupByKstDate(data ?? []), [data]);
  const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);

  const summary = buildMonthlySummary(data ?? [], getCurrentYearMonthKst());
  const { mutate, isPending } = useAiInsightMutation();

  const setInsight = useAiInsightStore((state) => state.setInsight);
  const [alertOpen, setAlertOpen] = useState(false);

  const router = useRouter();

  const handleAnalyze = () => {
    mutate(summary, {
      onSuccess: (res) => {
        setInsight({
          text: res.text,
          month: summary.month,
          createdAt: new Date().toISOString(),
        });
        setAlertOpen(true);
      },
    });
  };

  return (
    <Column gap={12}>
      <Column gap={6}>
        <Row align="center" justify="space-between">
          <Text size={24} weight={700}>
            지출내역
          </Text>
          <Button variant="outline" width={88} height={36} disabled={isPending} onClick={handleAnalyze}>
            {isPending ? (
              <Row align="center" gap={6}>
                <Text size={14} weight={600}>
                  분석중
                </Text>
                <S.LoadingDots aria-label="loading">
                  <span />
                  <span />
                  <span />
                </S.LoadingDots>
              </Row>
            ) : (
              "AI 분석"
            )}
          </Button>
        </Row>
        {isPending && (
          <Text size={13} color="secondary">
            AI 분석 중입니다. 잠시만 기다려 주세요.
          </Text>
        )}
        {/* 지출 총 금액 */}
        {totalAmount && <SlotCounter value={totalAmount} suffix="원" />}
      </Column>

      <Column gap={16} pb={12}>
        {grouped.map(([dateKey, items]) => (
          <Column key={dateKey} gap={8}>
            <Text size={14} weight={400} color="secondary">
              {formatTitle(dateKey)}
            </Text>

            <Column gap={4}>
              {items.map((item) => (
                <Column key={item.id}>
                  {item.category && <Text size={18}>{item.category}</Text>}

                  <Row align="center" justify="space-between">
                    {/* 사용날짜 */}
                    <Text size={14} color="secondary">
                      {new Intl.DateTimeFormat("ko-KR", {
                        timeZone: "Asia/Seoul",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }).format(new Date(item.created_at))}
                    </Text>
                    {/* 사용금액 */}
                    <Text size={16}>{item.amount?.toLocaleString()}원 </Text>
                  </Row>
                </Column>
              ))}
            </Column>
          </Column>
        ))}
      </Column>
      <Alert
        isOpen={alertOpen}
        title="AI 분석 완료"
        description="분석 결과를 저장했어요. 확인하시겠어요?"
        confirmText="확인"
        cancelText="닫기"
        onConfirm={() => {
          setAlertOpen(false);
          router.push("/dashboard/expense/analysis");
        }}
        onCancel={() => setAlertOpen(false)}
      />
    </Column>
  );
}
