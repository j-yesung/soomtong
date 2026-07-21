import type { AmountSummary } from "@/features/common/types";

export type BudgetStatus = "여유" | "주의" | "부담";

export type BudgetStatusMeta = {
  label: BudgetStatus;
  color: string;
};

/**
 * 월수입 대비 고정지출 비율에 따른 예산 상태를 계산
 * @param data - 금액 요약 데이터
 * @returns 예산 상태 라벨 ("여유", "주의", "부담")
 */
export function getBudgetStatus(data: AmountSummary): BudgetStatus {
  if (!data || data.budget <= 0) return "부담";

  const fixedExpenseRatio = data.fixedTotal / data.budget;

  if (fixedExpenseRatio >= 0.8) return "부담";
  if (fixedExpenseRatio >= 0.5) return "주의";
  return "여유";
}

/**
 * 예산 상태에 따른 메타데이터를 반환
 */
export function getBudgetStatusMeta(status: BudgetStatus): BudgetStatusMeta {
  switch (status) {
    case "여유":
      return {
        label: "여유",
        color: "var(--color-success)",
      };
    case "주의":
      return {
        label: "주의",
        color: "var(--color-warning)",
      };
    case "부담":
      return {
        label: "부담",
        color: "var(--color-danger)",
      };
  }
}

/**
 * 예산 데이터 기준으로 상태 메타데이터를 반환
 */
export function getBudgetStatusDisplay(data: AmountSummary): BudgetStatusMeta {
  const status = getBudgetStatus(data);
  return getBudgetStatusMeta(status);
}
