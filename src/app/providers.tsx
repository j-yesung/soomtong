"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import MainLayout from "@/components/layout/mainLayout";
import RouteTransition from "@/components/layout/routeTransition";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { PWAIOSInstallPromptScreen } from "@/screen/pwa";
import { GlobalStyle } from "@/styles/global";
import { theme } from "@/styles/theme";

import AuthProvider from "./auth-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  });

  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainLayout>
              <RouteTransition>{children}</RouteTransition>
              <PWAIOSInstallPromptScreen />
            </MainLayout>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}
