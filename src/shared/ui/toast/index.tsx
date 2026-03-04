import { Toaster as Sonner } from "sonner";

import { ToastGlobalStyle } from "./style";

export default function Toast({ ...props }: React.ComponentProps<typeof Sonner>) {
  return (
    <>
      <ToastGlobalStyle />
      <Sonner
        className="toaster group"
        position="bottom-center"
        duration={2500}
        offset={{ bottom: 120 }}
        mobileOffset={{ bottom: 120, left: 16, right: 16 }}
        {...props}
      />
    </>
  );
}
