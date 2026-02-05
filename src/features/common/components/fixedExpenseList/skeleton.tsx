import { Column, Skeleton } from "@/shared/ui";

export default function FixedExpenseListScreenSkeleton() {
  return (
    <Column gap={12} fullWidth>
      <Skeleton width={300} height={40} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
      <Skeleton height={84.59} />
    </Column>
  );
}
