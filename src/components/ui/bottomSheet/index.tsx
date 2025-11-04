import { ReactNode, useEffect } from "react";

import { AnimatePresence, type PanInfo, motion, useDragControls } from "framer-motion";

import Column from "../column";
import Heading from "../heading";
import Portal from "../portal";
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
  const dragControls = useDragControls();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }

    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [isOpen]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 300;
    const velocityThreshold = 600;

    const offsetY = info.offset.y;
    const velocityY = info.velocity.y;

    const shouldClose = offsetY > threshold || (offsetY > 0 && velocityY > velocityThreshold);

    if (shouldClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <S.Backdrop as={motion.div} aria-hidden="true" role="presentation" onClick={onClose} />

          <S.Sheet
            as={motion.div}
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
            }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragElastic={{ top: 0, bottom: 0.5 }}
            dragMomentum={false}
            dragConstraints={{ top: 0 }}
            dragSnapToOrigin
            onDragEnd={handleDragEnd}
          >
            {/* 드래그 핸들 */}
            <S.DragHandleArea
              onPointerDown={(e) => {
                e.preventDefault();
                dragControls.start(e);
              }}
            >
              <S.DragHandleBar />
            </S.DragHandleArea>

            {title && (
              <Row as="header" pvh={[16, 16, 0]} gap={8} align="center" justify="space-between">
                <Heading fontWeight="bold" level={2}>
                  {title}
                </Heading>
                {callback && callback}
              </Row>
            )}

            <Column overflow="auto" padding={16}>
              {children}
            </Column>
          </S.Sheet>
        </Portal>
      )}
    </AnimatePresence>
  );
}
