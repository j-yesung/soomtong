import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { Button } from "@/components/ui";
import { useKeyboardInset } from "@/features/common/hooks/useKeyboardOffset";

type Props = {
  onClick?: () => void;
  text: string;
  condition: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Motion = styled(motion.div)<{ $offset: number }>`
  position: absolute;
  box-sizing: border-box;
  left: 0;
  right: 0;
  z-index: 10;
  bottom: calc(env(safe-area-inset-bottom, 0px) + ${({ $offset }) => $offset}px);
`;

export default function ReadyButton({ onClick, text, type = "button", condition }: Props) {
  const offset = useKeyboardInset();

  return (
    <AnimatePresence>
      {!!condition && (
        <Motion
          key="next-btn"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          $offset={offset}
        >
          <Button onClick={onClick} type={type} fullWidth>
            {text}
          </Button>
        </Motion>
      )}
    </AnimatePresence>
  );
}
