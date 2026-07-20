import { usePathname } from "next/navigation";
import { styled } from "styled-components";

import { isDashboardFormPath } from "@/shared/lib/navigation/dashboard";
import { Box } from "@/shared/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isFormScreen = isDashboardFormPath(pathname);

  return (
    <LayoutWrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isHome ? "center" : "flex-start"}
        justifyContent={isHome ? "center" : "flex-start"}
        padding={isFormScreen ? "0" : "20px"}
        paddingBottom={isFormScreen ? "0" : "calc(100px + env(safe-area-inset-bottom))"}
        boxSizing="border-box"
        flex={1}
      >
        <Box width="100%" flex={1} position="relative">
          {children}
        </Box>
      </Box>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.main`
  max-width: 500px;
  margin: 0 auto;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
`;
