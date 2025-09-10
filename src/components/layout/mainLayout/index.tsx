import { Box } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      minHeight="100vh"
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
