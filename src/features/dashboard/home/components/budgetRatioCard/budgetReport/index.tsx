import { Tag, Text } from "@/components/ui";
import { SlotCounter } from "@/features/common/components";
import { AmountSummary } from "@/features/expense/types";
import { getBudgetStatus, getBudgetStatusColor } from "@/utils/budgetStatus";

import * as S from "./style";

type Props = {
  data: AmountSummary;
};

export default function BudgetReport({ data }: Props) {
  const budgetStatus = getBudgetStatus(data);
  const statusColor = getBudgetStatusColor(budgetStatus);

  return (
    <S.Container>
      <Text variant="caption" weight={500}>
        이번달 생활비는
      </Text>
      <S.AmountRow>
        <SlotCounter value={data?.amountAvailable} suffix="원" color="blue" fontSize={20} />
        <S.AvailableText>사용 가능해요</S.AvailableText>
        <Tag variant="status" color={statusColor}>
          {budgetStatus}
        </Tag>
      </S.AmountRow>
    </S.Container>
  );
}
