type Variant = "fixed" | "select" | "default" | "list" | "status";

export interface TagProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  fontSize?: number;
  fontWeight?: number;
  isSelected?: boolean;
  color?: string;
}

export interface TagStylesProps {
  variant: Variant;
  isSelected?: boolean;
  color?: string;
  fontWeight?: number;
  fontSize?: number;
}
