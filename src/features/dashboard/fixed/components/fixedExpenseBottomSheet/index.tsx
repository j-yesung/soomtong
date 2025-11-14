import { BottomSheet, Button, Text } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { FixedExpenseForm } from "@/features/common/components";
import {
  useFixedExpenseAddMutation,
  useFixedExpenseRemoveMutation,
  useFixedExpenseUpdateMutation,
} from "@/features/common/queries";
import { FixedExpenseFormMode, FixedExpenseFormValues } from "@/features/dashboard/fixed/types";
import { FixedItem } from "@/features/expense/types";

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
      isOpen={open}
      onClose={onClose}
      callback={
        isEdit && (
          <Button onClick={handleRemove} size="s" color="danger" width={60} height={40}>
            <Text color="inverseWhite" size={16}>
              삭제
            </Text>
          </Button>
        )
      }
      title={isEdit ? item?.tag : "고정지출 추가"}
    >
      <FixedExpenseForm
        onClose={onClose}
        onSubmit={handleSubmit}
        initialItem={isEdit ? item : undefined}
        formType={sheetType}
      />
    </BottomSheet>
  );
}
