type Variant = "fixed" | "select" | "default" | "list";

export interface TagProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  fontSize?: number;
  fontWeight?: number;
  isSelected?: boolean;
}

export interface TagStylesProps {
  variant: Variant;
  isSelected?: boolean;
  color?: string;
  fontWeight?: number;
  fontSize?: number;
}
