import { SalaryForm, SalaryHeader } from "@/features/salary/components";
import { Column } from "@/shared/ui";

export default function SalaryPage() {
  return (
    <Column gap={40} fullWidth>
      <SalaryHeader />
      <SalaryForm />
    </Column>
  );
}
