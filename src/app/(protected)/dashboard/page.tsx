import Image from "next/image";

import Logo from "@/assets/images/soomtong.png";
import { Column, Heading, Row } from "@/components/ui";
import { BudgetBoardScreen, FixedExpenseBoardScreen } from "@/screen/dashboard";

export default function DashboardPage() {
  return (
    <Column gap={24}>
      <Row gap={4} align="center">
        <Image src={Logo} width={30} height={30} alt="Soomtong Logo" priority />
        <Heading level={3} fontWeight="bold">
          Soomtong
        </Heading>
      </Row>
      <Column gap={12}>
        <BudgetBoardScreen />
        <FixedExpenseBoardScreen />
      </Column>
    </Column>
  );
}
