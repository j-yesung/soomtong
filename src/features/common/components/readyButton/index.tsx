import { AnimatePresence } from "framer-motion";

import { Button } from "@/shared/ui";
import { useKeyboardInset } from "@/features/common/hooks/useKeyboardOffset";

import { Motion } from "./style";

type Props = {
  onClick?: () => void;
  text: string;
  condition: boolean;
  position?: "bottom" | "top" | "none";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ReadyButton({ onClick, text, type, condition, position = "bottom" }: Props) {
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
          $position={position}
        >
          <Button onClick={onClick} type={type} fullWidth>
            {text}
          </Button>
        </Motion>
      )}
    </AnimatePresence>
  );
}
