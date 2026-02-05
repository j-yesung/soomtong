
import { theme } from "@/shared/styles/theme";

import Row from "../../row";
import Input from "../base";

export default function ChipInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Row align="center" width={110} height={30} borderRadius={8} border={`1px dashed ${theme.colors.border.primary}`}>
      <Input {...props} inputSize="l" />
    </Row>
  );
}
