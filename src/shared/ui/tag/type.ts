type Variant = "chip" | "badge";
type Size = "sm" | "md";

export interface TagProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  selected?: boolean;
}

export interface TagStylesProps {
  variant: Variant;
  size: Size;
  selected?: boolean;
  clickable?: boolean;
}
