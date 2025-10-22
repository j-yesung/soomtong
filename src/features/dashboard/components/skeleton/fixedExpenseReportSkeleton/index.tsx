import { Column, Skeleton } from "@/components/ui";

export default function FixedExpenseReportSkeleton() {
  return (
    <Column gap={12} flex={1}>
      <Skeleton height={21} width={120} />
      <Skeleton height={21} />
    </Column>
  );
}
