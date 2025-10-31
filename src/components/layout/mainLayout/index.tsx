import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { Box } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const setVh = () => {
      const h = typeof window !== "undefined" ? (window.visualViewport?.height ?? window.innerHeight) : 0;
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    window.visualViewport?.addEventListener("resize", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
      window.visualViewport?.removeEventListener("resize", setVh);
    };
  }, []);

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
    >
      {children}
    </Box>
  );
}
