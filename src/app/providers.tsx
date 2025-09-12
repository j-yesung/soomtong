"use client";

import { ThemeProvider } from "styled-components";

import MainLayout from "@/components/layout/mainLayout";
import RouteTransition from "@/components/layout/routeTransition";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { GlobalStyle } from "@/styles/global";
import { theme } from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainLayout>
          <RouteTransition>{children}</RouteTransition>
        </MainLayout>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
