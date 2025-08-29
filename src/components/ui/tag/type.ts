type Variant = "select" | "default";

export interface TagProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  isSelected?: boolean;
}

export interface TagStylesProps {
  $variant: Variant;
  $isSelected?: boolean;
}
