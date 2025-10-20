"use client";

import { useIsPresent } from "framer-motion";

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
  const isPresent = useIsPresent();

  return (
    <S.ItemSlot
      layout
      initial={{ opacity: 0, y: -8, scale: 0.99 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -8,
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
      $isPresent={isPresent}
    >
      <S.ActionLayer style={{ opacity }}>
        <S.ActionPop style={{ scale, originX: 0.5, originY: 0.5 }}>
          {rightAction ?? <DeleteIconButton onClick={onRemove} />}
        </S.ActionPop>
      </S.ActionLayer>

      <S.Card style={{ x }} layout="position" initial={false} aria-roledescription="swipe to delete" {...dragProps}>
        {children}
      </S.Card>
    </S.ItemSlot>
  );
}
