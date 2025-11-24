"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import MainLayout from "@/components/layout/mainLayout";
import RouteTransition from "@/components/layout/routeTransition";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { GlobalStyle } from "@/styles/global";
import { theme } from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <MainLayout>
            <RouteTransition>{children}</RouteTransition>
          </MainLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}
