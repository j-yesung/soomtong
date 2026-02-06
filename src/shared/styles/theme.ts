export const theme = {
  colors: {
    bg: {
      primary: "var(--color-brand)",
      secondary: "var(--color-secondary)",
      inverseWhite: "var(--color-inverseWhite)",
      danger: "var(--color-danger)",
      lightBlue: "var(--color-light-blue)",
      darkBlue: "#42A5F5",
    },
    text: {
      primary: "var(--color-brand)",
      secondary: "var(--color-text-secondary)",
      inverseWhite: "var(--color-inverseWhite)",
      blue: "var(--color-blue)",
      lightBlue: "#E3F2FD",
      darkBlue: "#42A5F5",
      gray: "#717171",
    },
    button: {
      primary: "var(--color-brand)",
      secondary: "var(--color-secondary)",
      danger: "var(--color-danger)",
      blue: "var(--color-blue)",
    },
    border: {
      primary: "var(--color-brand)",
      secondary: "var(--color-border)",
      light: "var(--color-border-light)",
      danger: "var(--color-danger)",
      blue: "var(--color-blue)",
      darkBlue: "#42A5F5",
    },
    disabled: "var(--color-disabled)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    pill: "9999px",
  },
  font: {
    sm: "12px",
    md: "16px",
    lg: "18px",
    xl: "22px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    bold: "700",
  },
  shadows: {
    card: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    modal: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    focusRing: "0 0 0 3px rgba(59, 130, 246, 0.45)",
  },
} as const;

export type AppTheme = typeof theme;
