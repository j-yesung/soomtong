import { create } from "zustand";

import { FixedActions, FixedState } from "@/features/expense/types";

export const useFixedExpenseStore = create<FixedState & FixedActions>((set) => ({
  userId: "",
  items: [],

  updateItems: (items) => set(() => ({ items })),
}));
