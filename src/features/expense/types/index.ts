export type BaseFixedItem = {
  tag: string;
  amount: number;
  day: number;
  createdAt: number;
};

export type FixedItem = BaseFixedItem;

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

export type FixedState = {
  userId: string;
  items: FixedItem[];
};

export interface AddExpenseParams {
  userId: string;
  amount: number;
  memo?: string;
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

export type FixedActions = {
  updateItems: (items: FixedItem[]) => void;
};
