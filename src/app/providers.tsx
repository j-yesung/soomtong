"use client";

import { ThemeProvider } from "styled-components";

import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { GlobalStyle } from "@/styles/global";
import { theme } from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
