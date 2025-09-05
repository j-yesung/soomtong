import Flex, { FlexProps } from "../flex";

export type RowProps = React.ComponentProps<typeof Row>;

export default function Row(props: Omit<FlexProps, "direction">) {
  return <Flex direction="row" {...props} />;
}
