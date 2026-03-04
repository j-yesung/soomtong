import { useEffect } from "react";

import { motion } from "framer-motion";

import { FixedExpenseList, LazyTab } from "@/features/common/components";
import { ExpenseAnalysisBoard } from "@/features/dashboard/expense/components";
import { type DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ position: "relative", width: "100%", display: "grid", height: "100%", minHeight: 0 }}
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
        <FixedExpenseList />
      </LazyTab>
    </motion.div>
  );
}
