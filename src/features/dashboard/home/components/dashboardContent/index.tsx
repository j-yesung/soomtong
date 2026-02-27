import { useEffect } from "react";

import { motion } from "framer-motion";

import { FixedExpenseList, LazyTab } from "@/features/common/components";
import { ExpenseAnalysisBoard } from "@/features/dashboard/expense/components";
import { type DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import { Grid } from "@/shared/ui";
import CalendarScreen from "@/widgets/calendarScreen";
import ExpenseScreen from "@/widgets/expenseScreen";
import HomeScreen from "@/widgets/homeScreen";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
      <LazyTab activeValue="home">
        <HomeScreen userId={userId} />
      </LazyTab>

      <LazyTab activeValue="calendar">
        <CalendarScreen />
      </LazyTab>

      <LazyTab activeValue="expense">
        <ExpenseScreen />
      </LazyTab>

      <LazyTab activeValue="expense-analysis">
        <ExpenseAnalysisBoard />
      </LazyTab>

      <LazyTab activeValue="fixed">
        <FixedExpenseList renderType="dashboard" />
      </LazyTab>
      </motion.div>
    </Grid>
  );
}
