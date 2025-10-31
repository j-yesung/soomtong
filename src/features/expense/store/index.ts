import { create } from "zustand";

import { FixedActions, FixedState } from "@/features/expense/types";
import { removeFixedItem } from "@/supabase/expense";

export const useFixedExpenseStore = create<FixedState & FixedActions>((set) => ({
  userId: "",
  items: [],

  remove: async ({ userId, tag, createdAt }) => {
    const row = await removeFixedItem({ userId, tag, createdAt });
    set(() => ({ userId: row.userId, items: row.items }));
  },

  updateItems: (items) => set(() => ({ items })),
}));

export const removeFixedExpense = useFixedExpenseStore.getState().remove;
