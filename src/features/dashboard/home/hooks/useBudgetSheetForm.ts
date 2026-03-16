import { useState } from "react";

import { useUpdateBudgetMutation } from "@/features/common/queries";
import { Budget } from "@/features/common/types";
import { parseNumericInput } from "@/shared/utils/formatter";

type Props = {
  budgetItem: Budget;
};

export default function useBudgetSheetForm({ budgetItem }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const [budgetDay, setBudgetDay] = useState(new Date().getDate());

  const { mutate } = useUpdateBudgetMutation();

  const reset = () => {
    const defaultBudget = budgetItem?.amount ? budgetItem.amount.toLocaleString() : "";
    const defaultDay = budgetItem?.day ?? new Date().getDate();
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
