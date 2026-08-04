import { FixedExpenseTableItem } from "@/features/common/types";

import * as S from "./style";

type Props = {
  data: FixedExpenseTableItem;
};

export default function FixedExpenseReport({ data }: Props) {
  const totalFixed = data?.totalFixedExpense ?? 0;

  return (
    <S.Container>
      <S.Description>
        매월 총
        <br />
        <S.Amount>{totalFixed.toLocaleString()}원이</S.Amount>
        <br />
        빠져나가요
      </S.Description>
    </S.Container>
  );
}
