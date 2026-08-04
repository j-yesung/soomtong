import { useEffect, useState } from "react";

export default function useFormLeaveGuard(isDirty: boolean, onLeave: () => void) {
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleRequestLeave = () => {
    if (isDirty) {
      setIsLeaveConfirmOpen(true);
      return;
    }

    onLeave();
  };

  const handleConfirmLeave = () => {
    setIsLeaveConfirmOpen(false);
    onLeave();
  };

  return {
    isLeaveConfirmOpen,
    handleRequestLeave,
    handleConfirmLeave,
    handleCancelLeave: () => setIsLeaveConfirmOpen(false),
  };
}
