import { useMemo } from "react";

import { Column, Row, Text } from "@/components/ui";
import { SlotCounter } from "@/features/common/components";
import { useDetailExpenseListQuery } from "@/features/common/queries";
import { formatTitle, groupByKstDate } from "@/utils/date";

export default function DashboardExpenseScreen() {
  const { data } = useDetailExpenseListQuery();

  const grouped = useMemo(() => groupByKstDate(data ?? []), [data]);
  const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Column gap={12}>
      <Column gap={6}>
        <Text size={24} weight={700}>
          지출내역
        </Text>
        {/* 지출 총 금액 */}
        {totalAmount && <SlotCounter value={totalAmount} suffix="원" />}
      </Column>

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
  );
}
