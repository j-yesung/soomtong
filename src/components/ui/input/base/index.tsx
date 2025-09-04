import Box from "../../box/style";
import * as S from "./style";
import * as T from "./type";

export default function Input({
  onChange,
  onBlur,
  onEnter,
  ref,
  id,
  value,
  inputSize = "m",
  variant = "base",
  inputStyle = "base",
  placeholder,
  fullWidth,
  inputMode,
  unit,
  className,
}: T.InputProps) {
  return (
    <Box position="relative" display="flex" alignItems="center" className={className}>
      <S.Input
        autoComplete="off"
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (onEnter && e.key === "Enter" && !e.nativeEvent.isComposing) {
            onEnter();
          }
        }}
        id={id}
        inputMode={inputMode}
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
