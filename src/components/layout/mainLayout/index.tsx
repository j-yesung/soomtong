import { usePathname } from "next/navigation";
import { styled } from "styled-components";

import { Box } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <LayoutWrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isHome ? "center" : "flex-start"}
        justifyContent={isHome ? "center" : "flex-start"}
        padding="20px"
        paddingBottom="calc(100px + env(safe-area-inset-bottom))"
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
