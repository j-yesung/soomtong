import { usePathname } from "next/navigation";

import { Box } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems={isHome ? "center" : "flex-start"}
      justifyContent={isHome ? "center" : "flex-start"}
      width="100%"
      minHeight="100dvh"
      minWidth="320px"
      maxWidth="500px"
      margin="0 auto"
      boxSizing="border-box"
      overflowY="auto"
      overflowX="hidden"
      position="relative"
      padding={30}
    >
      {children}
    </Box>
  );
}
