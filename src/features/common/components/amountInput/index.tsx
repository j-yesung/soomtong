import { Column, Input } from "@/components/ui";

import Keypad from "../keypad";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AmountInput({ value, onChange }: Props) {
  return (
    <Column gap={12}>
      <Input
        value={value}
        onFocus={(e) => e.currentTarget.blur()}
        id="fixed-expense"
        className="expense-add-input"
        variant="outline"
        inputMode="none"
        unit="원"
        fullWidth
        readOnly
      />
      <Keypad value={value} onChange={onChange} />
    </Column>
  );
}
