import Flex from "../../flex";
import * as S from "./style";
import * as T from "./type";

export default function Input({
  onChange,
  onBlur,
  onEnter,
  onFocus,
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
  flex,
  readOnly,
}: T.InputProps) {
  return (
    <Flex position="relative" align="center" flex={flex} className={className}>
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
        onFocus={onFocus}
        readOnly={readOnly}
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
    </Flex>
  );
}
