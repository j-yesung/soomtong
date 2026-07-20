import { Input } from "@/shared/ui";
import { formatAmountInput } from "@/shared/utils/formatter";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function AmountInput({ id, value, onChange, placeholder = "0" }: Props) {
  return (
    <Input
      id={id}
      name="amount"
      type="text"
      inputMode="numeric"
      enterKeyHint="done"
      pattern="[0-9,]*"
      value={value}
      onChange={(event) => onChange(formatAmountInput(event.target.value))}
      placeholder={placeholder}
      variant="outline"
      inputStyle="salary"
      unit="원"
      fullWidth
    />
  );
}
