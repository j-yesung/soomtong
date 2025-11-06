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
    const threshold = 200;
    const velocityThreshold = 800;

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
            aria-modal="true"
            initial={{ y: "100%" }} // 처음엔 화면 아래
            animate={{ y: 0 }} // 열리면 0으로
            exit={{ y: "100%" }} // 닫힐 때 다시 아래로
            transition={{
              type: "tween",
              ease: [0.22, 1, 0.36, 1],
              duration: 0.25,
            }}
            drag="y"
            dragControls={dragControls}
            dragListener={true}
            dragElastic={{ top: 0, bottom: 0.35 }}
            dragMomentum={false}
            dragConstraints={{ top: 0 }} // 위로는 못 올라가게
            dragSnapToOrigin
            dragTransition={{
              bounceStiffness: 1200,
              bounceDamping: 60,
            }} // 드래그 후 스냅백 시
            onDragEnd={handleDragEnd}
          >
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
