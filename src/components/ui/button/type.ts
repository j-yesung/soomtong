type ButtonSize = "s" | "m" | "l";

type ButtonColor = "default" | "primary" | "secondary" | "danger" | "secondary";

type ButtonVariant = "fill" | "outline" | "dash";

type ButtonRadius = "sm" | "md" | "lg" | "pill" | "none";

export interface ButtonStyleProps {
  $size: ButtonSize;
  $color: ButtonColor;
  $fullWidth?: boolean;
  $disabled?: boolean;
  $variant?: ButtonVariant;
  $height?: number;
  $width?: number;
  $radius?: ButtonRadius;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
  height?: number;
  width?: number;
  radius?: ButtonRadius;
}
