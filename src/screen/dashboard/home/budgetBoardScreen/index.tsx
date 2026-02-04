import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { BottomSheet, Button, Card, Column, Heading, Row, Text } from "@/components/ui";
import { EXPENSE_CATEGORY_LIST } from "@/constants";
import { AmountInput, DatePicker } from "@/features/common/components";
import { useAddExpenseMutation, useAmountSummaryQuery, useUpdateBudgetMutation } from "@/features/common/queries";
import { useBudgetStore } from "@/features/common/store";
import { FixedExpenseCategoryList } from "@/features/dashboard/fixed/components";
import { BudgetBarChart, BudgetReport } from "@/features/dashboard/home/components";
import { parseNumericInput } from "@/utils/formatter";

export default function BudgetBoardScreen({ userId }: { userId: string }) {
  const { data } = useAmountSummaryQuery(userId);
  const { mutate: updateBudget } = useUpdateBudgetMutation();
  const { mutate: addExpense } = useAddExpenseMutation();

  const budgetItem = useBudgetStore((state) => state.budget);

  const [budget, setBudget] = useState("");
  const [budgetDay, setBudgetDay] = useState(new Date().getDate());
  const [budgetSheetOpen, setBudgetSheetOpen] = useState(false);

  // 지출 추가 상태
  const [expenseSheetOpen, setExpenseSheetOpen] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (budgetItem) {
      setBudget(budgetItem.amount?.toLocaleString());
      setBudgetDay(budgetItem.day);
    }
  }, [budgetItem]);

  const handleBudgetSubmit = () => {
    const numericSalary = parseNumericInput(budget);
    updateBudget({ budget: numericSalary, day: budgetDay });
    setBudgetSheetOpen(false);
  };

  const handleExpenseClose = () => {
    setExpenseAmount("");
    setExpenseCategory("");
    setExpenseSheetOpen(false);
  };

  const handleExpenseSubmit = () => {
    if (!userId || !expenseAmount) return;

    addExpense({
      userId,
      amount: parseNumericInput(expenseAmount),
      category: expenseCategory,
    });
    handleExpenseClose();
  };

  if (!data?.amountAvailable) {
    return (
      <Card direction="column">
        <Column gap={32} pvh={[0, 16]}>
          <Column as="header">
            <Heading level={2} fontWeight="bold">
              월수입을 입력해 주세요
            </Heading>
            <Heading level={5} fontWeight="normal" color="secondary">
              월수입을 기반으로 생활비를 계획해 보세요
            </Heading>
          </Column>
          <Button onClick={() => router.push("/salary")}>추가하기</Button>
        </Column>
      </Card>
    );
  }

  return (
    <Card direction="column" gap={16}>
      <BudgetReport data={data} />
      <BudgetBarChart data={data} />
      <Card.Footer>
        <button type="button" onClick={() => setBudgetSheetOpen(true)}>
          <Text className="inner" size={14} color="inverseWhite">
            월수입 변경
          </Text>
        </button>
        <button type="button" onClick={() => setExpenseSheetOpen(true)}>
          <Text size={14} color="inverseWhite">
            지출 추가
          </Text>
        </button>
        <Link href="/dashboard?tab=expense">
          <Text size={14} color="inverseWhite">
            지출내역 보기
          </Text>
        </Link>
      </Card.Footer>

      {/* 월수입 변경 BottomSheet */}
      <BottomSheet isOpen={budgetSheetOpen} onClose={() => setBudgetSheetOpen(false)} title="월수입 변경">
        <Column gap={12}>
          <DatePicker selectedDay={budgetDay} onChange={setBudgetDay} />
          <AmountInput value={budget} onChange={setBudget} />

          <Button onClick={handleBudgetSubmit} disabled={!budget}>
            변경하기
          </Button>
        </Column>
      </BottomSheet>

      {/* 지출 추가 BottomSheet */}
      <BottomSheet isOpen={expenseSheetOpen} onClose={handleExpenseClose} title="지출 등록">
        <Column gap={12}>
          <Text size={16} weight={700}>
            항목
          </Text>
          <FixedExpenseCategoryList
            onClick={(category) => setExpenseCategory(category)}
            categoryList={EXPENSE_CATEGORY_LIST}
          />
          <AmountInput value={expenseAmount} onChange={setExpenseAmount} />
          <Row gap={8}>
            <Button onClick={handleExpenseClose} color="danger">
              닫기
            </Button>
            <Button onClick={handleExpenseSubmit} disabled={!expenseAmount || !expenseCategory}>
              등록
            </Button>
          </Row>
        </Column>
      </BottomSheet>
    </Card>
  );
}
