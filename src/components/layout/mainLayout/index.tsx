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
      minHeight="100%"
      boxSizing="border-box"
      position="relative"
      // backgroundColor={theme.colors.bg.primary}
    >
      {children}
    </Box>
  );
}
