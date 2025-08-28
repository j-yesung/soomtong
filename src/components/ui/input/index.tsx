import * as S from "./style";
import { InputProps } from "./type";

export default function Input({
  onChange,
  ref,
  id,
  value,
  inputSize = "m",
  variant = "base",
  inputStyle = "base",
  placeholder,
}: InputProps) {
  return (
    <S.Input
      type="text"
      onChange={onChange}
      id={id}
      value={value}
      placeholder={placeholder}
      $inputSize={inputSize}
      $variant={variant}
      $inputStyle={inputStyle}
    />
  );
}
