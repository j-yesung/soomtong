import * as S from "./style";
import { InputProps } from "./type";

export default function Input({
  onChange,
  id,
  inputSize = "m",
  variant = "outline",
  inputStyle = "base",
  placeholder,
}: InputProps) {
  return (
    <div>
      <S.Input
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        $inputSize={inputSize}
        $variant={variant}
        $inputStyle={inputStyle}
      />
      <span>원</span>
    </div>
  );
}
