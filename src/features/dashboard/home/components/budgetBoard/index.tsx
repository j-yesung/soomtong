import { useEffect, useState } from "react";

import { AmountInput, DatePicker } from "@/features/common/components";
import { useAddExpenseMutation, useAmountSummaryQuery, useUpdateBudgetMutation } from "@/features/common/queries";
import { useBudgetStore } from "@/features/common/store";
import { FixedExpenseCategoryList } from "@/features/dashboard/fixed/components";
import { BudgetBarChart, BudgetReport } from "@/features/dashboard/home/components";
import { useUserStore } from "@/features/auth/store";
import { EXPENSE_CATEGORY_LIST } from "@/shared/config";
import { BottomSheet, Button, Card, Column, Heading, Row, Text } from "@/shared/ui";
import { parseNumericInput } from "@/shared/utils/formatter";

export default function BudgetBoard() {
  const userId = useUserStore((state) => state.userId);
  const { data, isLoading, isFetched } = useAmountSummaryQuery(userId);
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

  useEffect(() => {
    if (budgetItem) {
      setBudget(budgetItem.amount ? budgetItem.amount.toLocaleString() : "");
      setBudgetDay(budgetItem.day);
    }
  }, [budgetItem]);

  const hasBudget = !!data?.budget;
  const budgetBottomSheetTitle = hasBudget ? "월수입 변경" : "월수입 추가";
  const budgetSubmitLabel = hasBudget ? "변경하기" : "추가하기";

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

  if (!userId || isLoading || !isFetched) {
    return null;
  }

  return (
    <>
      <Card direction="column" gap={16}>
        {hasBudget ? (
          <>
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
            </Card.Footer>
          </>
        ) : (
          <Column gap={32} pvh={[0, 16]}>
            <Column as="header">
              <Heading level={2} fontWeight="bold">
                월수입을 입력해 주세요
              </Heading>
              <Heading level={5} fontWeight="normal" color="secondary">
                월수입을 기반으로 생활비를 계획해 보세요
              </Heading>
            </Column>
            <Button onClick={() => setBudgetSheetOpen(true)}>추가하기</Button>
          </Column>
        )}
      </Card>

      <BottomSheet isOpen={budgetSheetOpen} onClose={() => setBudgetSheetOpen(false)} title={budgetBottomSheetTitle}>
        <Column gap={12}>
          <DatePicker selectedDay={budgetDay} onChange={setBudgetDay} />
          <AmountInput value={budget} onChange={setBudget} />

          <Button onClick={handleBudgetSubmit} disabled={!budget}>
            {budgetSubmitLabel}
          </Button>
        </Column>
      </BottomSheet>

      {hasBudget && (
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
      )}
    </>
  );
}
