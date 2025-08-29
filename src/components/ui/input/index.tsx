import Box from "../box/style";
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
  fullWidth,
  unit,
}: T.InputProps) {
  return (
    <Box position="relative" display="flex" alignItems="center">
      <S.Input
        type="text"
        autoComplete="off"
        ref={ref}
        onChange={onChange}
        id={id}
        value={value}
        placeholder={placeholder}
        $inputSize={inputSize}
        $variant={variant}
        $inputStyle={inputStyle}
        $fullWidth={fullWidth}
      />
      {unit && <S.Unit>{unit}</S.Unit>}
    </Box>
  );
}
