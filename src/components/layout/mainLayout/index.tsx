import { Box } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      height="100vh"
      maxWidth="500px"
      margin="0 auto"
      boxSizing="border-box"
      overflow="hidden"
      position="relative"
      padding={30}
    >
      {children}
    </Box>
  );
}
