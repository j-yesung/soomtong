import { useMutation } from "@tanstack/react-query";

import { getAiInsights } from "../api";
import { MonthlySummary } from "../types";

export function useAiInsightMutation() {
  return useMutation({
    mutationFn: (summary: MonthlySummary) => getAiInsights(summary),
    retry: false,
  });
}
