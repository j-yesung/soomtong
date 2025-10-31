import { useRouter } from "next/navigation";

import { ReadyButton } from "@/features/common/components";
import { useFixedExpenseStore } from "@/features/expense/store";

export default function FixedExpenseNextButton() {
  const router = useRouter();
  const items = useFixedExpenseStore((state) => state.items);

  return (
    <ReadyButton
      position="bottom"
      text="다음"
      condition={items?.length > 0}
      onClick={() => router.push("/dashboard")}
    />
  );
}
