type ButtonSize = "s" | "m" | "l";

type ButtonColor = "default" | "primary" | "secondary" | "danger" | "warning";

export interface ButtonStyleProps {
  $size: ButtonSize;
  $color: ButtonColor;
  $fullWidth?: boolean;
  $disabled?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
}
