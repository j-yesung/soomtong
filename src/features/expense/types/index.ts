export type BaseFixedItem = {
  userId: string;
  tag: string;
};

export type FixedItem = {
  tag: string;
  amount: number;
  createdAt: number;
};

export type FixedAddItem = BaseFixedItem & {
  amount: number;
};

export type FixedRemoveItem = BaseFixedItem & {
  createdAt: number;
};

export type FixedRow = {
  id: number;
  userId: string;
  items: FixedItem[];
  createdAt: string;
};

export type FixedState = {
  userId: string;
  items: FixedItem[];
};

export type FixedActions = {
  add: (p: FixedAddItem) => void;
  remove: (p: FixedRemoveItem) => void;
};
