export type BaseFixedItem = {
  tag: string;
  amount: number;
  day: number;
  createdAt: number;
};

export type FixedItem = BaseFixedItem;

export type FixedExpenseTableItem = {
  amountAvailable: number;
  totalFixedExpense: number;
  id: number;
  userId: string;
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

export interface AmountSummary {
  budget: number;
  totalFixed: number;
  totalVariable: number;
  amountAvailable: number;
}

export interface AddExpenseResult extends AmountSummary {
  expenseId: number;
}
