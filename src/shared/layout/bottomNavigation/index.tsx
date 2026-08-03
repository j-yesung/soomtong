"use client";

import { useRef, useState } from "react";

import { Settings } from "lucide-react";
import { type PanInfo, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import { FixedIcon, HomeIcon } from "@/shared/assets/svg/interface";
import { DASHBOARD_PATH, DASHBOARD_SETTINGS_PATH, isDashboardSettingsPath } from "@/shared/lib/navigation/dashboard";

import * as S from "./style";

type NavigationTab = DashboardTab | "settings";
type NavigationIcon = typeof HomeIcon | typeof Settings;

const NAV_ITEMS: { tab: NavigationTab; label: string; icon: NavigationIcon }[] = [
  { tab: "home", label: "홈", icon: HomeIcon },
  { tab: "fixed", label: "고정지출", icon: FixedIcon },
  { tab: "settings", label: "설정", icon: Settings },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const navInnerRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [previewTab, setPreviewTab] = useState<NavigationTab | null>(null);

  const { activeTab, setActiveTab } = useDashboardTabStore();

  const isSettings = isDashboardSettingsPath(pathname);
  const isDashboard = pathname === DASHBOARD_PATH || isSettings;
  const visualTab = isSettings ? "settings" : activeTab;

  if (!isDashboard) return null;

  const handleTabChange = (tab: NavigationTab) => {
    if (tab === "settings") {
      router.replace(DASHBOARD_SETTINGS_PATH);
      return;
    }

    setActiveTab(tab);
    if (isSettings) router.replace(DASHBOARD_PATH);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleTabClick = (tab: NavigationTab) => {
    if (tab === visualTab) return;
    setPreviewTab(null);
    handleTabChange(tab);
  };

  const getNearestTabFromX = (targetX: number) => {
    const nearest = NAV_ITEMS.map((item, index) => {
      const rect = navItemRefs.current[index]?.getBoundingClientRect();
      if (!rect) return null;
      return {
        tab: item.tab,
        distance: Math.abs(rect.left + rect.width / 2 - targetX),
      };
    })
      .filter((item): item is { tab: NavigationTab; distance: number } => item !== null)
      .sort((a, b) => a.distance - b.distance)[0];
    return nearest?.tab ?? null;
  };

  const handleActivePillDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const nearestTab = getNearestTabFromX(info.point.x);
    setPreviewTab(null);

    if (!nearestTab || nearestTab === visualTab) return;

    handleTabChange(nearestTab);
  };

  const visualActiveTab = previewTab ?? visualTab;

  return (
    <S.NavContainer>
      <S.NavInner ref={navInnerRef}>
        {NAV_ITEMS.map((item, index) => {
          const isActive = visualActiveTab === item.tab;
          const isPillHost = visualTab === item.tab;
          const Icon = item.icon;

          return (
            <S.NavItem
              key={item.tab}
              ref={(element) => {
                navItemRefs.current[index] = element;
              }}
              $isActive={isActive}
              onClick={() => handleTabClick(item.tab)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              type="button"
            >
              {isPillHost && (
                <motion.div
                  layoutId="activeBackground"
                  drag="x"
                  dragConstraints={navInnerRef}
                  dragElastic={0.08}
                  dragMomentum={false}
                  onDragStart={() => setPreviewTab(visualTab)}
                  onDrag={(_, info) => {
                    const nearestTab = getNearestTabFromX(info.point.x);
                    if (!nearestTab) return;
                    setPreviewTab((prev) => (prev === nearestTab ? prev : nearestTab));
                  }}
                  onDragEnd={handleActivePillDragEnd}
                  whileDrag={{ scale: 1.04 }}
                  style={{ position: "absolute", inset: 0, cursor: "grab", touchAction: "pan-y" }}
                  transition={{
                    type: "spring",
                    stiffness: 430,
                    damping: 36,
                  }}
                >
                  <S.ActivePill />
                </motion.div>
              )}
              <S.NavContent>
                <Icon size={20} />
                {item.tab !== "settings" && <S.NavLabel $isActive={isActive}>{item.label}</S.NavLabel>}
              </S.NavContent>
            </S.NavItem>
          );
        })}
      </S.NavInner>
    </S.NavContainer>
  );
}
