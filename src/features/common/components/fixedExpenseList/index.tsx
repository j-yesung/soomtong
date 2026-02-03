import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { ExpenseItem, SlotCounter } from "@/features/common/components/";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseBottomSheet } from "@/features/dashboard/fixed/components";
import { FixedItem } from "@/features/expense/types";
import FixedExpenseListScreenSkeleton from "@/screen/common/fixedExpenseListScreen/skeleton";

import * as S from "./style";

type Props = {
  renderType: "expense" | "dashboard";
};

export default function FixedExpenseList({ renderType }: Props) {
  const [sheetType, setSheetType] = useState<"add" | "edit">("add");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FixedItem>({} as FixedItem);

  const router = useRouter();

  const userId = useUserStore((state) => state.userInfo).id;

  const { data, isFetched } = useFixedExpenseTableQuery(userId);

  const hasItems = (data?.items?.length ?? 0) > 0;
  const isExpenseRender = renderType === "expense";

  const handleItemClick = (item: FixedItem) => {
    setSelectedItem(item);
    setSheetType("edit");
    setSheetOpen(true);
  };

  const handleAddClick = () => {
    setSelectedItem({} as FixedItem);
    setSheetType("add");
    setSheetOpen(true);
  };

  const handleSheetClose = () => setSheetOpen(false);

  if (!isFetched) {
    return <FixedExpenseListScreenSkeleton />;
  }

  return (
    <S.ListScreenContainer $renderType={renderType}>
      <Row justify="space-between" align="center" fullWidth>
        <SlotCounter value={data?.totalFixedExpense ?? 0} suffix="원" />
        <Button onClick={handleAddClick} width={42} height={42}>
          +
        </Button>
      </Row>

      <S.ListBox $hasItems={hasItems && isExpenseRender}>
        {data?.items?.map((item) => (
          <ExpenseItem key={item.createdAt} items={item} onClick={() => handleItemClick(item)} />
        ))}
      </S.ListBox>

      <FixedExpenseBottomSheet onClose={handleSheetClose} open={sheetOpen} sheetType={sheetType} item={selectedItem} />

      {isExpenseRender && hasItems && (
        <Button fullWidth className="next-btn" onClick={() => router.push("/dashboard")}>
          다음
        </Button>
      )}
    </S.ListScreenContainer>
  );
}
