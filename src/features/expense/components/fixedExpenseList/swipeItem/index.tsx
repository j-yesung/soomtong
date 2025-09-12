"use client";

import { useActionDelete } from "@/features/expense/hooks/useActionDelete";
import { useSwipeToDelete } from "@/features/expense/hooks/useSwipeToDelete";

import DeleteIconButton from "../deleteIconButton";
import * as S from "./style";

type Props = {
  children: React.ReactNode;
  onRemove: () => void;
  rightAction?: React.ReactNode;
};

export default function SwipeItem({ children, onRemove, rightAction }: Props) {
  const { x, dragProps } = useSwipeToDelete(onRemove);
  const { scale, opacity } = useActionDelete(x);

  return (
    <S.ItemSlot>
      <S.ActionLayer style={{ opacity }}>
        <S.ActionPop style={{ scale, originX: 0.5, originY: 0.5 }}>
          {rightAction ?? <DeleteIconButton onClick={onRemove} />}
        </S.ActionPop>
      </S.ActionLayer>

      <S.Card
        style={{ x, backgroundColor: "rgba(255,0,0,0)" }}
        whileDrag={{ backgroundColor: "rgba(255,0,0,0.08)" }}
        layout="position"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.16 } }}
        exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeInOut" } }}
        aria-roledescription="swipe to delete"
        {...dragProps}
      >
        {children}
      </S.Card>
    </S.ItemSlot>
  );
}
