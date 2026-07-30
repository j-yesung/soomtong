"use client";

import { useCallback, useState } from "react";

import { Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { SettingsBottomSheet } from "@/features/settings/components";
import { SingleArrowIcon } from "@/shared/assets/svg/interface";
import { Row } from "@/shared/ui";

import * as S from "./style";

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isDashboardRoot = pathname === "/dashboard";

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  if (isDashboardRoot) {
    return (
      <>
        <Row align="center" justify="flex-end" minHeight={44}>
          <S.SettingsButton type="button" onClick={handleOpenSettings} aria-label="설정 열기">
            <Settings size={21} strokeWidth={1.9} aria-hidden />
          </S.SettingsButton>
        </Row>
        <SettingsBottomSheet isOpen={isSettingsOpen} onClose={handleCloseSettings} />
      </>
    );
  }

  return (
    <Row align="center" justify="space-between">
      <button type="button" onClick={() => router.back()} aria-label="뒤로가기">
        <SingleArrowIcon size={40} />
      </button>
    </Row>
  );
}
