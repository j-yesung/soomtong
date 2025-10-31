export type BaseFixedItem = {
  userId: string;
  tag: string;
};

export type FixedItem = {
  tag: string;
  amount: number;
  day: number;
  createdAt: number;
};

export type FixedAddItem = BaseFixedItem & {
  amount: number;
  day: number;
};

export type FixedRemoveItem = BaseFixedItem & {
  createdAt: number;
};

export type FixedRow = {
  id: number;
  userId: string;
  budget: number;
  items: FixedItem[];
  createdAt: string;
};

export type FixedState = {
  userId: string;
  items: FixedItem[];
};

export type FixedAddParams = {
  userId: string;
  item: FixedItem;
};

export type FixedActions = {
  remove: (p: FixedRemoveItem) => void;
  updateItems: (items: FixedItem[]) => void;
};
