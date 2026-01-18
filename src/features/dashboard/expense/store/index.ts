import { create } from "zustand";

type AiInsight = {
  text: string;
  month: string;
  createdAt: string;
};

type AiInsightStore = {
  insight: AiInsight | null;
  setInsight: (insight: AiInsight) => void;
  clearInsight: () => void;
};

export const useAiInsightStore = create<AiInsightStore>((set) => ({
  insight: null,
  setInsight: (insight) => set({ insight }),
  clearInsight: () => set({ insight: null }),
}));
