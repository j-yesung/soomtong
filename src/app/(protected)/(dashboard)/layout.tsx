"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { SingleArrowIcon } from "@/assets/svg/interface";
import BottomNavigation from "@/components/layout/bottomNavigation";
import { Column, Heading, Row } from "@/components/ui";

const TAB_TITLES: Record<string, string> = {
  home: "Soomtong",
  calendar: "달력",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDashboardRoot = pathname === "/dashboard";
  const currentTab = searchParams.get("tab") || "home";

  return (
    <>
      <Column gap={24}>
        <Row align="center" justify="space-between">
          {!isDashboardRoot && (
            <button type="button" onClick={() => router.back()}>
              <SingleArrowIcon size={40} />
            </button>
          )}
          {isDashboardRoot && (
            <Row gap={4} align="center">
              <Image src={Logo} width={40} height={40} alt="Soomtong Logo" priority />
              <Heading level={3} fontWeight="bold">
                {TAB_TITLES[currentTab] || "Soomtong"}
              </Heading>
            </Row>
          )}
        </Row>
        {children}
      </Column>
      <BottomNavigation />
    </>
  );
}
