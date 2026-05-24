import { useState } from "react";

import { useAddExpenseMutation } from "@/features/common/queries";
import { parseNumericInput } from "@/shared/utils/formatter";

type Props = {
  userId: string;
};

export default function useExpenseSheetForm({ userId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const { mutate } = useAddExpenseMutation();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setAmount("");
    setCategory("");
    setIsOpen(false);
  };

  const submit = () => {
    if (!userId || !amount || !category) return;
    mutate({
      userId,
      amount: parseNumericInput(amount),
      category,
    });
    close();
  };

  return {
    isOpen,
    amount,
    category,
    setAmount,
    setCategory,
    open,
    close,
    submit,
  };
}
