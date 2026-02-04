import { FixedExpenseTableItem } from "@/features/expense/types";

import * as S from "./style";

type Props = {
  data: FixedExpenseTableItem;
};

export default function FixedExpenseReport({ data }: Props) {
  const totalCount = data?.items?.length ?? 0;

  return (
    <S.Container>
      <S.Description>
        총 {totalCount}건이
        <br />
        매월 발생하고 있어요
      </S.Description>
      <S.Amount>{data?.totalFixedExpense?.toLocaleString()}원</S.Amount>
    </S.Container>
  );
}
