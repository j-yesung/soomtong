"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "styled-components";

import { CalendarIcon, HomeIcon } from "@/assets/svg/interface";

import * as S from "./style";

const NAV_ITEMS = [
  { tab: "home", label: "홈", icon: HomeIcon },
  { tab: "calendar", label: "달력", icon: CalendarIcon },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();

  // 대시보드 페이지에서만 네비게이션 표시
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  if (!isDashboard) return null;

  const currentTab = searchParams.get("tab") || "home";
  const activeIndex = NAV_ITEMS.findIndex((item) => item.tab === currentTab);

  return (
    <S.NavContainer>
      <S.NavInner>
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeIndex === index;
          const Icon = item.icon;

          return (
            <S.NavItem key={item.tab} as={Link} $isActive={isActive} href={`/dashboard?tab=${item.tab}`}>
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
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
