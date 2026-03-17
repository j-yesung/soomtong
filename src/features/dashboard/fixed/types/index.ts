import { FixedItem } from "@/features/common/types";

export type FixedExpenseFormMode = "add" | "edit";

export type FixedExpenseFormValues = Omit<FixedItem, "createdAt">;
