import { CircleAlert, Gauge, LucideIcon, Wind } from "lucide-react";

import { AmountSummary } from "@/features/expense/types";

export type BudgetStatus = "여유" | "안정" | "조절";

export type BudgetStatusMeta = {
  label: BudgetStatus;
  color: string;
  icon: LucideIcon;
};

/**
 * 사용 가능 금액 대비 사용 금액 비율에 따른 예산 상태를 계산
 * @param data - 금액 요약 데이터
 * @returns 예산 상태 라벨 ("여유", "안정", "조절")
 */
export function getBudgetStatus(data: AmountSummary): BudgetStatus {
  if (!data) return "안정";

  const { amountAvailable, totalVariable } = data;

  // 사용 가능 금액이 0 이하면 빠듯함
  if (amountAvailable <= 0) return "조절";

  // 사용 비율 계산
  const usageRatio = totalVariable / amountAvailable;

  if (usageRatio >= 0.8) return "조절";
  if (usageRatio >= 0.5) return "안정";
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
        color: "#74B075",
        icon: Wind,
      };
    case "안정":
      return {
        label: "안정",
        color: "#dfdc31",
        icon: Gauge,
      };
    case "조절":
      return {
        label: "조절",
        color: "#EB003B",
        icon: CircleAlert,
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

/**
 * 예산 상태에 따른 색상을 반환 (호환성 유지용)
 */
export function getBudgetStatusColor(status: BudgetStatus) {
  return getBudgetStatusMeta(status).color;
}
