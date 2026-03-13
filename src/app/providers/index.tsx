"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "styled-components";

import AuthSessionSync from "@/features/auth/components/authSessionSync";
import { PWAIOSInstallPromptScreen } from "@/features/pwa/components";
import MainLayout from "@/shared/layout/mainLayout";
import StyledComponentsRegistry from "@/shared/lib/styled-components-registry";
import { GlobalStyle } from "@/shared/styles/global";
import { theme } from "@/shared/styles/theme";
import { Toast } from "@/shared/ui";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldSyncAuth = pathname.startsWith("/dashboard");

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {shouldSyncAuth ? <AuthSessionSync /> : null}
          <GlobalStyle />
          <Toast />
          <MainLayout>
            {children}
            <PWAIOSInstallPromptScreen />
          </MainLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}
