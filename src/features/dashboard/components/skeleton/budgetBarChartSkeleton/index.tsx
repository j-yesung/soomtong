import { Column, Skeleton } from "@/components/ui";

export default function BudgetBarChartSkeleton() {
  return (
    <Column gap={12} pvh={[0, 16]}>
      <Skeleton height={16} />
      <Column gap={8}>
        <Skeleton height={21} />
        <Skeleton height={21} />
      </Column>
    </Column>
  );
}
