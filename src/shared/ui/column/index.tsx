
import Flex, { FlexProps } from "../flex";

export type ColumnProps = React.ComponentProps<typeof Column>;

export default function Column(props: Omit<FlexProps, "direction" | "display">) {
  return <Flex direction="column" display="flex" {...props} />;
}
