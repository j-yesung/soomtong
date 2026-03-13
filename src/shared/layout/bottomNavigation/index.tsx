"use client";

import { useRef, useState } from "react";

import { motion, type PanInfo } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "styled-components";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import { CalendarIcon, FixedIcon, HistoryIcon, HomeIcon } from "@/shared/assets/svg/interface";
import { navigateToDashboardTab } from "@/shared/lib/navigation/dashboard";

import * as S from "./style";

const NAV_ITEMS: { tab: DashboardTab; label: string; icon: typeof HomeIcon }[] = [
  { tab: "home", label: "홈", icon: HomeIcon },
  { tab: "calendar", label: "달력", icon: CalendarIcon },
  { tab: "fixed", label: "고정지출", icon: FixedIcon },
  { tab: "expense", label: "지출내역", icon: HistoryIcon },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const theme = useTheme();
  const navInnerRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [previewTab, setPreviewTab] = useState<DashboardTab | null>(null);

  const { activeTab, setActiveTab } = useDashboardTabStore();

  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (!isDashboard) return null;

  const handleTabClick = (tab: DashboardTab) => {
    if (tab === activeTab) return;
    setPreviewTab(null);
    setActiveTab(tab);
    navigateToDashboardTab(tab);
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
      .filter((item): item is { tab: DashboardTab; distance: number } => item !== null)
      .sort((a, b) => a.distance - b.distance)[0];
    return nearest?.tab ?? null;
  };

  const handleActivePillDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const nearestTab = getNearestTabFromX(info.point.x);
    setPreviewTab(null);

    if (!nearestTab || nearestTab === activeTab) return;

    setActiveTab(nearestTab);
    navigateToDashboardTab(nearestTab);
  };

  const visualActiveTab = previewTab ?? activeTab;

  return (
    <S.NavContainer>
      <S.NavInner ref={navInnerRef}>
        {NAV_ITEMS.map((item, index) => {
          const isActive = visualActiveTab === item.tab;
          const isPillHost = activeTab === item.tab;
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
                  onDragStart={() => setPreviewTab(activeTab)}
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
                <Icon size={22} color={isActive ? theme.colors.bg.primary : "#8e8e93"} />
                <S.NavLabel $isActive={isActive}>{item.label}</S.NavLabel>
              </S.NavContent>
            </S.NavItem>
          );
        })}
      </S.NavInner>
    </S.NavContainer>
  );
}
