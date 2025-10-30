import { useState } from "react";

import { Input } from "@/components/ui";
import { Keypad } from "@/features/common/components";

export default function FixedExpenseListFormScreen() {
  const [expense, setExpense] = useState("");

  return (
    <>
      <Input
        value={expense}
        onFocus={(e) => e.currentTarget.blur()}
        id="fixed-expense"
        className="expense-add-input"
        variant="outline"
        inputMode="none"
        unit="원"
        fullWidth
        readOnly
      />
      <Keypad value={expense} onChange={setExpense} />
    </>
  );
}
