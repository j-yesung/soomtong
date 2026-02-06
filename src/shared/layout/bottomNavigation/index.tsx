"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "styled-components";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import { CalendarIcon, FixedIcon, HistoryIcon, HomeIcon } from "@/shared/assets/svg/interface";

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
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveTab(tab);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tab);
    window.history.replaceState({}, "", newUrl.toString());
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
              as="div"
              $isActive={isActive}
              onClick={() => handleTabClick(item.tab as DashboardTab)}
              style={{ cursor: "pointer" }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 24,
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
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
