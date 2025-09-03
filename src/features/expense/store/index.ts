"use client";

import { create } from "zustand";

export type FixedExpense = {
  id: string;
  tag: string;
  amount: number;
  createdAt: number;
};

type State = {
  items: FixedExpense[];
};

type Actions = {
  add: (payload: { tag: string; amount: number }) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useFixedExpenseStore = create<State & Actions>()((set) => ({
  items: [],
  add: ({ tag, amount }) =>
    set((s) => ({
      items: [...s.items, { id: crypto.randomUUID(), tag, amount, createdAt: Date.now() }],
    })),
  remove: (id) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
  clear: () => set({ items: [] }),
}));
