import Image from "next/image";

import Logo from "@/assets/images/soomtong.png";
import { Column, Heading, Row } from "@/components/ui";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Column gap={24}>
      <Row gap={4} align="center">
        <Image src={Logo} width={30} height={30} alt="Soomtong Logo" priority />
        <Heading level={3} fontWeight="bold">
          Soomtong
        </Heading>
      </Row>
      {children}
    </Column>
  );
}
