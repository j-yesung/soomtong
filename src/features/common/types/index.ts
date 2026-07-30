export type BaseFixedItem = {
  tag: string;
  amount: number;
  day: number;
  createdAt: number;
  memo?: string;
};

export type FixedItem = BaseFixedItem;

export type FixedExpenseTableItem = {
  amountAvailable: number;
  totalFixedExpense: number;
  id: number;
  userId: string;
  day: number;
  budget: number;
  items: FixedItem[];
  createdAt: string;
};

export type FixedRow = {
  id: number;
  userId: string;
  budget: number;
  items: FixedItem[];
  createdAt: string;
};

export type FixedAddParams = {
  userId: string;
  item: FixedItem;
};

export type FixedRemoveItem = {
  userId: string;
  tag: string;
  createdAt: number;
};

export type FixedUpdateItem = {
  userId: string;
  createdAt: number;
  item: FixedItem;
};

export type FixedExpensePayment = {
  fixedItemCreatedAt: number;
  dueDate: string;
  paidAt: string | null;
};

export type FixedExpensePaymentSchedule = {
  fixedItemCreatedAt: number;
  dueDate: string;
};

export type ToggleFixedExpensePaymentParams = {
  userId: string;
  fixedItemCreatedAt: number;
  dueDate: string;
  isPaid: boolean;
};

export type UpdateBudgetParams = {
  userId: string;
  budget: number;
  day: number;
};

export interface AmountSummary {
  budget: number;
  fixedTotal: number;
  amountAvailable: number;
}
