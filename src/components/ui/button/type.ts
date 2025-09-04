type ButtonSize = "s" | "m" | "l";

type ButtonColor = "default" | "primary" | "secondary" | "danger" | "secondary";

type ButtonVariant = "fill" | "outline" | "dash";

export interface ButtonStyleProps {
  $size: ButtonSize;
  $color: ButtonColor;
  $fullWidth?: boolean;
  $disabled?: boolean;
  $variant?: ButtonVariant;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
}
