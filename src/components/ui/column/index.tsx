"use client";

import Flex, { FlexProps } from "../flex";

export type ColumnProps = React.ComponentProps<typeof Column>;

export default function Column(props: Omit<FlexProps, "direction">) {
  return <Flex direction="column" {...props} />;
}
