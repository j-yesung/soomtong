"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { SingleArrowIcon } from "@/assets/svg/interface";
import BottomNavigation from "@/components/layout/bottomNavigation";
import { Column, Heading, Row } from "@/components/ui";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";

  return (
    <>
      <Column gap={24}>
        <Row align="center" justify="space-between">
          {!isDashboard && (
            <button type="button" onClick={() => router.back()}>
              <SingleArrowIcon size={40} />
            </button>
          )}
          {isDashboard && (
            <Row gap={4} align="center">
              <Image src={Logo} width={40} height={40} alt="Soomtong Logo" priority />
              <Heading level={3} fontWeight="bold">
                Soomtong
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
