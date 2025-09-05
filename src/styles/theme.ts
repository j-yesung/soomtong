export const theme = {
  colors: {
    bg: "var(--color-bg)",
    text: "var(--color-text)",
    primary: "var(--color-primary)",
    secondary: "var(--color-text-secondary)",
    muted: "var(--color-muted)",
    border: "var(--color-border)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
    default: "var(--color-default)",
    white: "var(--color-text-white)",
  },
  bg: {
    secondary: "var(--color-bg-secondary)",
    white: "var(--color-text-white)",
  },
  border: {
    default: "var(--color-default)",
  },
  radius: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    pill: "9999px",
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

export type ColorsKeys = keyof AppTheme["colors"];
