type Variant = "select" | "default" | "list";

export interface TagProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  isSelected?: boolean;
}

export interface TagStylesProps {
  $variant: Variant;
  $isSelected?: boolean;
  $color?: string;
}
