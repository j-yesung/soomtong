import { theme } from "@/styles/theme";

import Row from "../../row";
import Input from "../base";

export default function ChipInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Row
      align="center"
      height={42}
      padding="0 8px"
      border="1px solid #ccc"
      borderRadius={16}
      borderColor={theme.colors.border}
      backgroundColor={theme.bg.secondary}
    >
      <Input {...props} inputSize="l" />
    </Row>
  );
}
