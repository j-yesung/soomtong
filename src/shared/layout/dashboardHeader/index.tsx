"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SingleArrowIcon } from "@/shared/assets/svg/interface";
import { Row } from "@/shared/ui";

const SUB_TABS = ["expense-analysis"];

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDashboardRoot = pathname === "/dashboard";
  const currentTab = searchParams.get("tab") || "home";
  const isSubTab = SUB_TABS.includes(currentTab);

  if (isDashboardRoot && !isSubTab) return null;

  return (
    <Row align="center" justify="space-between">
      <button type="button" onClick={() => router.back()} aria-label="뒤로가기">
        <SingleArrowIcon size={40} />
      </button>
    </Row>
  );
}
