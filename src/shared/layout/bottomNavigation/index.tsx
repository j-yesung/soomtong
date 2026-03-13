"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "styled-components";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import { CalendarIcon, FixedIcon, HistoryIcon, HomeIcon } from "@/shared/assets/svg/interface";
import { navigateToDashboardTab } from "@/shared/lib/navigation/dashboard";

import * as S from "./style";

const NAV_ITEMS = [
  { tab: "home", label: "홈", icon: HomeIcon },
  { tab: "calendar", label: "달력", icon: CalendarIcon },
  { tab: "fixed", label: "고정지출", icon: FixedIcon },
  { tab: "expense", label: "지출내역", icon: HistoryIcon },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const theme = useTheme();

  const { activeTab, setActiveTab } = useDashboardTabStore();

  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (!isDashboard) return null;

  const handleTabClick = (tab: DashboardTab) => {
    setActiveTab(tab);
    navigateToDashboardTab(tab);
  };

  return (
    <S.NavContainer>
      <S.NavInner>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.tab;
          const Icon = item.icon;

          return (
            <S.NavItem
              key={item.tab}
              $isActive={isActive}
              onClick={() => handleTabClick(item.tab as DashboardTab)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              type="button"
            >
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  style={{ position: "absolute", inset: 0 }}
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
