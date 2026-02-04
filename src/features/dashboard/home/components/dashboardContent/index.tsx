"use client";

import { useEffect } from "react";

import { Column, Grid } from "@/components/ui";
import { LazyTab } from "@/features/common/components";
import { type DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import FixedExpenseListScreen from "@/screen/common/fixedExpenseListScreen";
import { BudgetBoardScreen, DashboardExpenseScreen, FixedExpenseBoardScreen } from "@/screen/dashboard";
import CalendarScreen from "@/screen/dashboard/calendar/calendarScreen";
import ExpenseAnalysisResultScreen from "@/screen/dashboard/expense/analysisResultScreen";

interface DashboardContentProps {
  initialTab: DashboardTab;
  userId: string;
}

export default function DashboardContent({ initialTab, userId }: DashboardContentProps) {
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, setActiveTab]);

  return (
    <Grid position="relative" fullWidth>
      <LazyTab activeValue="home">
        <Column gap={12}>
          <BudgetBoardScreen userId={userId} />
          <FixedExpenseBoardScreen userId={userId} />
        </Column>
      </LazyTab>

      <LazyTab activeValue="calendar">
        <CalendarScreen />
      </LazyTab>

      <LazyTab activeValue="expense">
        <DashboardExpenseScreen />
      </LazyTab>

      <LazyTab activeValue="expense-analysis">
        <ExpenseAnalysisResultScreen />
      </LazyTab>

      <LazyTab activeValue="fixed">
        <FixedExpenseListScreen renderType="dashboard" />
      </LazyTab>
    </Grid>
  );
}
