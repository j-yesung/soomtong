import { create } from "zustand";

import { FixedActions, FixedState } from "@/features/expense/types";
import { addFixedItem, removeFixedItem } from "@/supabase/expense";

export const useFixedExpenseStore = create<FixedState & FixedActions>((set) => ({
  userId: "",
  items: [],

  add: async ({ userId, tag, amount }) => {
    const item = { tag, amount, createdAt: Date.now() };
    const row = await addFixedItem({ userId, item });
    set(() => ({ userId: row.userId, items: row.items }));
  },

  remove: async ({ userId, tag, createdAt }) => {
    const row = await removeFixedItem({ userId, tag, createdAt });
    set(() => ({ userId: row.userId, items: row.items }));
  },

  updateItems: (items) => set(() => ({ items })),
}));

export const addFixedExpense = useFixedExpenseStore.getState().add;
export const removeFixedExpense = useFixedExpenseStore.getState().remove;
