import { memo } from "react";

import { SlotCounter } from "@/features/common/components";
import { AmountSummary } from "@/features/common/types";
import { Row, Text } from "@/shared/ui";
import { getBudgetStatusDisplay } from "@/shared/utils/budgetStatus";

import * as S from "./style";

type BudgetReportProps = {
  data: AmountSummary;
};

function BudgetReport({ data }: BudgetReportProps) {
  const amountAvailable = data?.amountAvailable ?? 0;
  const { label: statusLabel, color: statusColor, icon: StatusIcon } = getBudgetStatusDisplay(data);

  return (
    <S.Container>
      <Row justify="space-between">
        <Text variant="caption" weight={500}>
          이번달 생활비는
        </Text>
        <Row gap={6} align="center">
          <S.StatusText $color={statusColor}>
            <StatusIcon size={18} />
            {statusLabel}
          </S.StatusText>
        </Row>
      </Row>
      <S.AmountRow>
        <SlotCounter value={amountAvailable} suffix="원" color="blue" fontSize={20} duration={1.8} spins={2} />
        <S.AvailableText>사용 가능해요</S.AvailableText>
      </S.AmountRow>
    </S.Container>
  );
}

export default memo(BudgetReport);
