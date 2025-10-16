"use client";

import { Column, Heading, Row } from "@/components/ui";
import BudgetRatioCard from "@/features/dashboard/components/budgetRatioCard";

export default function DashboardPage() {
  return (
    <Column gap={24}>
      <Row gap={4} align="center">
        <Heading level={3} fontWeight="bold">
          Soomtong
        </Heading>
      </Row>
      <Column gap={12}>
        <BudgetRatioCard />
      </Column>
    </Column>
  );
}
