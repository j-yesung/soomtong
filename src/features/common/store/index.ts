import { create } from "zustand";

import { Budget } from "../types";

interface BudgetStoreState {
  budget: Budget;
  updateBudget: (payload: Partial<Budget>) => void;
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
}));
