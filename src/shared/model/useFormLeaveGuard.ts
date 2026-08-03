import { useEffect, useRef } from "react";

const LEAVE_MESSAGE = "작성 중인 내용이 사라져요.\n화면을 나갈까요?";

export default function useFormLeaveGuard(isDirty: boolean, onLeave: () => void) {
  const isRestoringHistoryRef = useRef(false);

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handlePopState = () => {
      if (isRestoringHistoryRef.current) {
        isRestoringHistoryRef.current = false;
        return;
      }

      if (window.confirm(LEAVE_MESSAGE)) return;

      isRestoringHistoryRef.current = true;
      window.history.forward();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty]);

  const handleRequestLeave = () => {
    if (!isDirty || window.confirm(LEAVE_MESSAGE)) onLeave();
  };

  return { handleRequestLeave };
}
