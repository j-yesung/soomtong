import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { useSalaryStore } from "@/stores/salary/state";

export default function SalaryButton() {
  const router = useRouter();
  const salary = useSalaryStore((state) => state.salary);

  return (
    <AnimatePresence>
      {!!salary && (
        <motion.div
          key="next-btn"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Button onClick={() => router.push("/expenses")} fullWidth>
            다음
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
