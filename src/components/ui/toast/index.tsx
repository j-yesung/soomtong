import { Toaster as Sonner } from "sonner";

import { Toaster } from "./style";

export default function Toast({ ...props }: React.ComponentProps<typeof Sonner>) {
  return <Toaster className="toaster group" position="bottom-center" {...props} />;
}
