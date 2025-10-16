"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import Logo from "@/assets/images/soomtong.png";
import { Column, Heading, Row, Skeleton } from "@/components/ui";

const BudgetRatioCard = dynamic(() => import("@/features/dashboard/components/budgetRatioCard"), {
  ssr: false,
  loading: () => <Skeleton height={168} />,
});

export default function DashboardPage() {
  return (
    <Column gap={24}>
      <Row gap={4}>
        <Image src={Logo} alt="Soomtong Logo" width={40} height={40} priority />
        <Heading level={2} fontWeight="bold">
          Soomtong
        </Heading>
      </Row>
      <Column gap={12}>
        <BudgetRatioCard />
        <BudgetRatioCard />
      </Column>
    </Column>
  );
}
