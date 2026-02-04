"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { SingleArrowIcon } from "@/assets/svg/interface";
import { Heading, Row } from "@/components/ui";

// 뒤로가기 버튼이 필요한 탭
const SUB_TABS = ["expense-analysis"];

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDashboardRoot = pathname === "/dashboard";
  const currentTab = searchParams.get("tab") || "home";
  const isSubTab = SUB_TABS.includes(currentTab);

  return (
    <Row align="center" justify="space-between">
      {(!isDashboardRoot || isSubTab) && (
        <button type="button" onClick={() => router.back()}>
          <SingleArrowIcon size={40} />
        </button>
      )}
      {isDashboardRoot && !isSubTab && (
        <Row gap={4} align="center">
          <Image src={Logo} width={40} height={40} alt="Soomtong Logo" priority />
          <Heading level={3} fontWeight="bold">
            Soomtong
          </Heading>
        </Row>
      )}
    </Row>
  );
}
