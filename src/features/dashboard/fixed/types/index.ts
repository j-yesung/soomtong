import { FixedItem } from "@/features/expense/types";

export type FixedExpenseFormMode = "add" | "edit";

export type FixedExpenseFormValues = Omit<FixedItem, "createdAt">;
