"use client";

import { useEffect } from "react";

import { Box, Column } from "@/components/ui";
import { LazyTab } from "@/features/common/components";
import { type DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import CalendarScreen from "@/screen/calendar/calendarScreen";
import FixedExpenseListScreen from "@/screen/common/fixedExpenseListScreen";
import { BudgetBoardScreen, DashboardExpenseScreen, FixedExpenseBoardScreen } from "@/screen/dashboard";
import ExpenseAnalysisResultScreen from "@/screen/dashboard/expense/analysisResultScreen";

interface DashboardContentProps {
  initialTab: DashboardTab;
  userId: string;
}

export default function DashboardContent({ initialTab, userId }: DashboardContentProps) {
  const { activeTab, setActiveTab } = useDashboardTabStore();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, setActiveTab]);

  return (
    <Box position="relative">
      <LazyTab isVisible={activeTab === "home"}>
        <Column gap={12}>
          <BudgetBoardScreen userId={userId} />
          <FixedExpenseBoardScreen userId={userId} />
        </Column>
      </LazyTab>

      <LazyTab isVisible={activeTab === "calendar"}>
        <CalendarScreen />
      </LazyTab>

      <LazyTab isVisible={activeTab === "expense"}>
        <DashboardExpenseScreen />
      </LazyTab>

      <LazyTab isVisible={activeTab === "expense-analysis"}>
        <ExpenseAnalysisResultScreen />
      </LazyTab>

      <LazyTab isVisible={activeTab === "fixed"}>
        <FixedExpenseListScreen renderType="dashboard" />
      </LazyTab>
    </Box>
  );
}
