export const theme = {
  colors: {
    bg: "var(--color-bg)",
    text: "var(--color-text)",
    primary: "var(--color-primary)",
    primaryText: "var(--color-on-primary)",
    muted: "var(--color-muted)",
    border: "var(--color-border)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
  },
  radius: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    pill: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 12px rgba(0,0,0,0.10)",
    lg: "0 10px 24px rgba(0,0,0,0.14)",
  },
  font: {
    sm: "12px",
    base: "14px",
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
