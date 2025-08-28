import * as S from "./style";
import * as T from "./type";

export default function Input({
  onChange,
  ref,
  id,
  value,
  inputSize = "m",
  variant = "base",
  inputStyle = "base",
  placeholder,
}: T.InputProps) {
  return (
    <S.Input
      type="text"
      ref={ref}
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
