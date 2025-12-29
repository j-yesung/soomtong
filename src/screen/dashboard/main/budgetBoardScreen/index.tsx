import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { BottomSheet, Button, Card, Column, Heading, Skeleton, Text } from "@/components/ui";
import { AmountInput, DatePicker } from "@/features/common/components";
import { useAmountSummaryQuery, useUpdateBudgetMutation } from "@/features/common/queries";
import { useBudgetStore } from "@/features/common/store";
import { BudgetBarChart, BudgetReport } from "@/features/dashboard/main/components";
import { parseNumericInput } from "@/utils/formatter";

export default function BudgetBoardScreen() {
  const { data, isFetched } = useAmountSummaryQuery();
  const { mutate } = useUpdateBudgetMutation();

  const budgetItem = useBudgetStore((state) => state.budget);

  const [budget, setBudget] = useState("");
  const [budgetDay, setBudgetDay] = useState(new Date().getDate());
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (budgetItem) {
      setBudget(budgetItem.amount?.toLocaleString());
      setBudgetDay(budgetItem.day);
    }
  }, [budgetItem]);

  const handleSubmit = () => {
    const numericSalary = parseNumericInput(budget);
    mutate({ budget: numericSalary, day: budgetDay });
    setBottomSheetOpen(false);
  };

  if (isFetched && !data?.amountAvailable) {
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
    <>
      {isFetched ? (
        <Card direction="column" gap={16}>
          <BudgetReport data={data} />
          <BudgetBarChart data={data} />
          <Card.Footer>
            <button type="button" onClick={() => setBottomSheetOpen(true)}>
              <Text className="inner" size={14} color="inverseWhite">
                월수입 변경
              </Text>
            </button>
            <button type="button" onClick={() => router.push("/dashboard/expense")}>
              <Text size={14} color="inverseWhite">
                지출내역 보기
              </Text>
            </button>
          </Card.Footer>

          <BottomSheet isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)} title="월수입 변경">
            <Column gap={12}>
              <DatePicker selectedDay={budgetDay} onChange={setBudgetDay} />
              <AmountInput value={budget} onChange={setBudget} />

              <Button onClick={handleSubmit} disabled={!budget}>
                변경하기
              </Button>
            </Column>
          </BottomSheet>
        </Card>
      ) : (
        <Skeleton height={237} />
      )}
    </>
  );
}
