import { CircleCheck } from "lucide-react";
import { Toaster as Sonner } from "sonner";

import { ToastGlobalStyle } from "./style";

export default function Toast({ ...props }: React.ComponentProps<typeof Sonner>) {
  return (
    <>
      <ToastGlobalStyle />
      <Sonner
        className="toaster group"
        position="top-right"
        duration={2500}
        offset={{
          top: "max(16px, env(safe-area-inset-top, 0px))",
          right: "max(16px, env(safe-area-inset-right, 0px))",
        }}
        mobileOffset={{
          top: "max(16px, env(safe-area-inset-top, 0px))",
          right: "max(16px, env(safe-area-inset-right, 0px))",
        }}
        icons={{ success: <CircleCheck size={16} strokeWidth={2.2} aria-hidden /> }}
        {...props}
      />
    </>
  );
}
