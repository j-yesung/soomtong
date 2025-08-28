import { Input } from "@/components/ui";
import { formatNumericInput } from "@/utils/formatter";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default function ExpensesInput({ onChange, value }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatNumericInput(event.target.value));
  };

  return <Input id="expenses-input" onChange={handleChange} value={value} variant="outline" unit="원" fullWidth />;
}
