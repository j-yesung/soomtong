"use client";

import { usePathname, useRouter } from "next/navigation";

import { SingleArrowIcon } from "@/shared/assets/svg/interface";
import { Row } from "@/shared/ui";

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardRoot = pathname === "/dashboard";

  if (isDashboardRoot) return null;

  return (
    <Row align="center" justify="space-between">
      <button type="button" onClick={() => router.back()} aria-label="뒤로가기">
        <SingleArrowIcon size={40} />
      </button>
    </Row>
  );
}
