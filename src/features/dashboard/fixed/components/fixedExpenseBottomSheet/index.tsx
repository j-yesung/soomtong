import { BottomSheet, Button } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import {
  useFixedExpenseAddMutation,
  useFixedExpenseRemoveMutation,
  useFixedExpenseUpdateMutation,
} from "@/features/common/queries";
import { FixedExpenseFormMode, FixedExpenseFormValues } from "@/features/dashboard/fixed/types";
import { FixedItem } from "@/features/expense/types";

import FixedExpenseForm from "../fixedExpenseForm";

type Props = {
  onClose: () => void;
  open: boolean;
  sheetType: FixedExpenseFormMode;
  item?: FixedItem;
};

export default function FixedExpenseBottomSheet({ onClose, open, sheetType, item }: Props) {
  const userId = useUserStore((state) => state.userInfo).id;

  const { mutate: addExpense } = useFixedExpenseAddMutation();
  const { mutate: updateExpense } = useFixedExpenseUpdateMutation();
  const { mutate: removeExpense } = useFixedExpenseRemoveMutation();

  const isEdit = sheetType === "edit";

  const handleSubmit = (values: FixedExpenseFormValues) => {
    if (isEdit && item) {
      updateExpense({
        userId,
        createdAt: item.createdAt,
        item: {
          ...item,
          tag: values.tag,
          amount: values.amount,
          day: values.day,
        },
      });
    } else {
      addExpense({
        userId,
        item: {
          tag: values.tag,
          amount: values.amount,
          day: values.day,
          createdAt: Date.now(),
        },
      });
    }
  };

  const handleRemove = () => {
    if (!item) return;
    removeExpense({ userId, tag: item.tag, createdAt: item.createdAt });
    onClose();
  };

  return (
    <BottomSheet
      onClose={onClose}
      isOpen={open}
      title={isEdit ? item?.tag : "고정지출 추가"}
      callback={
        isEdit && (
          <Button onClick={handleRemove} size="s" color="danger" width={50}>
            삭제
          </Button>
        )
      }
    >
      <FixedExpenseForm
        mode={sheetType}
        initialItem={isEdit ? item : undefined}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </BottomSheet>
  );
}
