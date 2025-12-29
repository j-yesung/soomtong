import { create } from "zustand";

type Budget = {
  amount: number;
  day: number;
};

interface BudgetStoreState {
  budget: Budget;
  updateBudget: (payload: Partial<Budget>) => void;
  resetBudget: () => void;
}

const initialBudget: Budget = {
  amount: 0,
  day: 1,
};

export const useBudgetStore = create<BudgetStoreState>((set) => ({
  budget: initialBudget,

  updateBudget: (payload) =>
    set((state) => ({
      budget: {
        ...state.budget,
        ...payload,
      },
    })),

  resetBudget: () =>
    set({
      budget: initialBudget,
    }),
}));
