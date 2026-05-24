import { useState } from "react";

import { useUpdateBudgetMutation, useUserProfileQuery } from "@/features/common/queries";
import { parseNumericInput } from "@/shared/utils/formatter";

export default function useBudgetSheetForm(userId: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const [budgetDay, setBudgetDay] = useState(new Date().getDate());

  const { data } = useUserProfileQuery(userId);

  const { mutate } = useUpdateBudgetMutation();

  const reset = () => {
    const defaultBudget = data?.budget ? data.budget.toLocaleString() : "";
    const defaultDay = data?.day ?? new Date().getDate();
    setBudget(defaultBudget);
    setBudgetDay(defaultDay);
  };

  const open = () => {
    reset();
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const submit = () => {
    const numericSalary = parseNumericInput(budget);
    close();
    mutate({
      userId,
      budget: numericSalary,
      day: budgetDay,
    });
  };

  return {
    isOpen,
    budget,
    budgetDay,
    setBudget,
    setBudgetDay,
    open,
    close,
    submit,
  };
}
