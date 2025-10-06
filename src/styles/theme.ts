export const theme = {
  colors: {
    bg: {
      primary: "var(--color-brand)",
      secondary: "var(--color-bg-secondary)",
      inverseWhite: "var(--color-inverseWhite)",
      danger: "var(--color-danger)",
    },
    text: {
      primary: "var(--color-brand)",
      secondary: "var(--color-text-secondary)",
      inverseWhite: "var(--color-inverseWhite)",
    },
    button: {
      primary: "var(--color-brand)",
      secondary: "var(--color-secondary)",
      danger: "var(--color-danger)",
    },
    border: {
      primary: "var(--color-brand)",
      secondary: "var(--color-border)",
      danger: "var(--color-danger)",
    },
    disabled: "var(--color-disabled)",
  },
  radius: {
    sm: "4px",
    md: "12px",
    lg: "16px",
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
} as const;

export type AppTheme = typeof theme;
