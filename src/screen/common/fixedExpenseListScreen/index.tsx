"use client";

import { Column } from "@/components/ui";
import { FixedExpenseList } from "@/features/common/components";

type Props = {
  renderType: "expense" | "dashboard";
};

export default function FixedExpenseListScreen({ renderType }: Props) {
  return (
    <Column gap={8} fullWidth>
      <FixedExpenseList renderType={renderType} />
    </Column>
  );
}
