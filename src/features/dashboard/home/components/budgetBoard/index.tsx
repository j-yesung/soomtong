import { useUserStore } from "@/features/auth/store";
import { AmountInput, DatePicker } from "@/features/common/components";
import { useAmountSummaryQuery } from "@/features/common/queries";
import { FixedExpenseCategoryList } from "@/features/dashboard/fixed/components";
import { BudgetBarChart, BudgetReport } from "@/features/dashboard/home/components";
import { EXPENSE_CATEGORY_LIST } from "@/shared/config";
import { BottomSheet, Button, Card, Column, Heading, Row, Text } from "@/shared/ui";

import useBudgetSheetForm from "../../hooks/useBudgetSheetForm";
import useExpenseSheetForm from "../../hooks/useExpenseSheetForm";

export default function BudgetBoard() {
  const userId = useUserStore((state) => state.userId);

  const { data } = useAmountSummaryQuery(userId);

  const budgetForm = useBudgetSheetForm(userId);
  const expenseForm = useExpenseSheetForm({ userId });

  const hasBudget = !!data?.budget;
  const budgetBottomSheetTitle = hasBudget ? "월수입 변경" : "월수입 추가";
  const budgetSubmitLabel = hasBudget ? "변경하기" : "추가하기";

  return (
    <>
      <Card direction="column" gap={16}>
        {hasBudget ? (
          <>
            <BudgetReport data={data} />
            <BudgetBarChart data={data} />
            <Card.Footer>
              <button type="button" onClick={budgetForm.open}>
                <Text className="inner" size={14} color="inverseWhite">
                  월수입 변경
                </Text>
              </button>
              <button type="button" onClick={expenseForm.open}>
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
            <Button onClick={budgetForm.open}>추가하기</Button>
          </Column>
        )}
      </Card>

      <BottomSheet isOpen={budgetForm.isOpen} onClose={budgetForm.close} title={budgetBottomSheetTitle}>
        <Column gap={12}>
          <DatePicker selectedDay={budgetForm.budgetDay} onChange={budgetForm.setBudgetDay} />
          <AmountInput value={budgetForm.budget} onChange={budgetForm.setBudget} />

          <Button onClick={budgetForm.submit} disabled={!budgetForm.budget}>
            {budgetSubmitLabel}
          </Button>
        </Column>
      </BottomSheet>

      {hasBudget && (
        <BottomSheet isOpen={expenseForm.isOpen} onClose={expenseForm.close} title="지출 등록">
          <Column gap={12}>
            <Text size={16} weight={700}>
              항목
            </Text>
            <FixedExpenseCategoryList onClick={expenseForm.setCategory} categoryList={EXPENSE_CATEGORY_LIST} />
            <AmountInput value={expenseForm.amount} onChange={expenseForm.setAmount} />
            <Row gap={8}>
              <Button onClick={expenseForm.close} color="danger">
                닫기
              </Button>
              <Button onClick={expenseForm.submit} disabled={!expenseForm.amount || !expenseForm.category}>
                등록
              </Button>
            </Row>
          </Column>
        </BottomSheet>
      )}
    </>
  );
}
