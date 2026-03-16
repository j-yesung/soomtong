"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import { PWAIOSInstallPromptScreen } from "@/features/pwa/components";
import MainLayout from "@/shared/layout/mainLayout";
import StyledComponentsRegistry from "@/shared/lib/styled-components-registry";
import { GlobalStyle } from "@/shared/styles/global";
import { theme } from "@/shared/styles/theme";
import { Toast } from "@/shared/ui";

export default function Providers({ children }: { children: React.ReactNode }) {
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
