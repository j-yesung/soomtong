import { Column, Skeleton } from "@/components/ui";

export default function BudgetReportSkeleton() {
  return (
    <Column gap={4} pvh={[0, 16]}>
      <Skeleton height={22.39} width={150} />
      <Skeleton height={33} />
    </Column>
  );
}
