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

export interface AddExpenseParams {
  userId: string;
  amount: number;
  category?: string;
}

export type UpdateBudgetParams = {
  budget: number;
  day: number;
};

export interface AmountSummary {
  budget: number;
  totalFixed?: number;
  totalVariable: number;
  amountAvailable: number;
}

export type ExpenseList = {
  id: number;
  user_id: string;
  amount: number;
  category: string;
  spent_at: string;
  created_at: string;
};

export type GroupedExpense = Record<string, ExpenseList[]>;

export interface AddExpenseResult extends AmountSummary {
  expenseId: number;
}
