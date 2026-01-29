import { usePathname } from "next/navigation";
import { styled } from "styled-components";

import { Box } from "@/components/ui";

// import BottomNavigation from "../bottomNavigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <LayoutWrapper>
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        alignItems={isHome ? "center" : "flex-start"}
        justifyContent={isHome ? "center" : "flex-start"}
        padding="20px"
        boxSizing="border-box"
        position="relative"
        width="100%"
        flex={1}
      >
        {children}
      </Box>
      {/* <BottomNavigation /> */}
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  min-height: 100svh;
  position: relative;
  display: flex;
  flex-direction: column;
`;
