type InputSize = "s" | "m" | "l";

type InputVariant = "base" | "outline" | "filled" | "underline";

type inputStyle = "base" | "salary";

export interface InputStyleProps {
  $inputSize: InputSize;
  $variant: InputVariant;
  $inputStyle: inputStyle;
  $placeholder?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  inputSize: InputSize;
  inputStyle?: inputStyle;
  variant?: InputVariant;
  label?: string;
  placeholder?: string;
}
