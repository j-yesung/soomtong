import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui";

type Props = {
  onClick?: () => void;
  text: string;
  condition: boolean;
};

export default function ReadyButton({ onClick, text, condition }: Props) {
  return (
    <AnimatePresence>
      {!!condition && (
        <motion.div
          key="next-btn"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Button onClick={onClick} fullWidth>
            {text}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
