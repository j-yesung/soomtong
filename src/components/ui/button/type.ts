export type ButtonSize = "s" | "m" | "l";

export type ButtonColor = "default" | "primary" | "secondary" | "danger" | "secondary";

export type ButtonVariant = "fill" | "outline" | "dash";

export type ButtonRadius = "sm" | "md" | "lg" | "pill" | "none";

export interface ButtonStyleProps {
  $size: ButtonSize;
  $color: ButtonColor;
  $fullWidth?: boolean;
  $disabled?: boolean;
  $variant?: ButtonVariant;
  $height?: number;
  $width?: number;
  $radius?: ButtonRadius;
  $isActive?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
  height?: number;
  width?: number;
  radius?: ButtonRadius;
  isActive?: boolean;
}
