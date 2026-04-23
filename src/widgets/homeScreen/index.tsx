import Image from "next/image";

import { useUserStore } from "@/features/auth/store";
import { useAmountSummaryQuery, useFixedExpenseTableQuery } from "@/features/common/queries";
import { BudgetBoard, FixedExpenseBoard } from "@/features/dashboard/home/components";
import Logo from "@/shared/assets/images/soomtong.png";
import useMinimumVisible from "@/shared/model/useMinimumVisible";
import { Column } from "@/shared/ui";

export default function HomeScreen() {
  const userId = useUserStore((state) => state.userId);
  const isAuthReady = useUserStore((state) => state.isReady);
  const amountQuery = useAmountSummaryQuery(userId);
  const fixedQuery = useFixedExpenseTableQuery(userId);

  const isHomeLoading = !isAuthReady || !userId || !amountQuery.isFetched || !fixedQuery.isFetched;

  const showLogoLoading = useMinimumVisible(isHomeLoading);

  if (showLogoLoading) {
    return (
      <Column height="100%" flex={1} align="center" justify="center">
        <Image src={Logo} width={120} height={120} alt="Soomtong Logo" priority />
      </Column>
    );
  }

  return (
    <Column gap={12}>
      <BudgetBoard />
      <FixedExpenseBoard />
    </Column>
  );
}
