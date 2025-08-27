import * as S from "./style";
import { InputProps } from "./type";

export default function Input({
  onChange,
  id,
  inputSize = "m",
  variant = "base",
  inputStyle = "base",
  placeholder,
}: InputProps) {
  return (
    <S.Input
      onChange={onChange}
      id={id}
      placeholder={placeholder}
      $inputSize={inputSize}
      $variant={variant}
      $inputStyle={inputStyle}
    />
  );
}
