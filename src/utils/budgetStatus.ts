import { AmountSummary } from "@/features/expense/types";

export type BudgetStatus = "넉넉해요" | "적당해요" | "빠듯해요";

/**
 * 사용 가능 금액 대비 사용 금액 비율에 따른 예산 상태를 계산
 * @param data - 금액 요약 데이터
 * @returns 예산 상태 라벨 ("넉넉해요", "적당해요", "빠듯해요")
 */
export function getBudgetStatus(data: AmountSummary): BudgetStatus {
  if (!data) return "적당해요";

  const { amountAvailable, totalVariable } = data;

  // 사용 가능 금액이 0 이하면 빠듯함
  if (amountAvailable <= 0) return "빠듯해요";

  // 사용 비율 계산
  const usageRatio = totalVariable / amountAvailable;

  if (usageRatio >= 0.8) return "빠듯해요";
  if (usageRatio >= 0.5) return "적당해요";
  return "넉넉해요";
}

/**
 * 예산 상태에 따른 색상을 반환
 * @param status - 예산 상태
 * @returns 테마 색상 값
 */
export function getBudgetStatusColor(status: BudgetStatus) {
  switch (status) {
    case "넉넉해요":
      return "#74B075"; // --color-success
    case "적당해요":
      return "#2D2D2D"; // --color-brand
    case "빠듯해요":
      return "#EB003B"; // --color-danger
  }
}
