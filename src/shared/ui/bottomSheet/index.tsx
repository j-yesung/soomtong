import { ReactNode, useEffect, useRef } from "react";

import { Drawer } from "vaul";

import Row from "../row";
import * as S from "./style";

type Props = {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  callback?: ReactNode;
};

export default function BottomSheet({ isOpen, title, children, onClose, callback }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    requestAnimationFrame(() => {
      contentRef.current?.focus();
    });
  }, [isOpen]);

  return (
    <Drawer.Root
      open={isOpen}
      autoFocus
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      dismissible
      shouldScaleBackground={false}
      scrollLockTimeout={0}
    >
      <Drawer.Portal>
        <S.DrawerOverlay />
        <S.DrawerContent ref={contentRef} tabIndex={-1}>
          <S.DragArea>
            <S.HandleBar />
            <Row pvh={[16, 0, 0, 0]} gap={8} align="center" justify="space-between">
              <Drawer.Title>{title ?? ""}</Drawer.Title>
              {callback && callback}
            </Row>

            <Drawer.Description />
          </S.DragArea>

          <S.SheetContent>{children}</S.SheetContent>
        </S.DrawerContent>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
