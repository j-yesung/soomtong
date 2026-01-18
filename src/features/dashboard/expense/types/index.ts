export type Expense = {
  id: number;
  amount: number;
  category: string | null;
  spent_at: string;
  created_at: string;
};

export type MonthlySummary = {
  month: string;
  totalExpense: number;

  topCategories: {
    category: string;
    amount: number;
    ratio: number;
    count: number;
  }[];

  increasedCategories?: {
    category: string;
    diffAmount: number;
    diffRatio: number;
  }[];

  weekdaySpending?: { weekday: string; amount: number }[];
  timeOfDaySpending?: { bucket: "morning" | "afternoon" | "evening" | "night"; amount: number }[];
};
