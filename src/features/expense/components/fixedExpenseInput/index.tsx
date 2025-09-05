import { Input } from "@/components/ui";
import { formatNumericInput } from "@/utils/formatter";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default function FixedExpenseInput({ onChange, value }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatNumericInput(event.target.value));
  };

  return (
    <Input
      id="expenses-input"
      onChange={handleChange}
      value={value}
      inputMode="numeric"
      variant="outline"
      unit="원"
      fullWidth
      inputSize="l"
      flex={1}
    />
  );
}
