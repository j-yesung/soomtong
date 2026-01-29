"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "styled-components";

import { CalendarIcon, HomeIcon } from "@/assets/svg/interface";

import * as S from "./style";

const NAV_ITEMS = [
  { path: "/dashboard", label: "홈", icon: HomeIcon },
  { path: "/calendar", label: "달력", icon: CalendarIcon },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  // 네비게이션을 보여줄 페이지 확인
  const shouldShowNav = NAV_ITEMS.some((item) => pathname === item.path || pathname.startsWith(item.path + "/"));

  if (!shouldShowNav) return null;

  const activeIndex = NAV_ITEMS.findIndex((item) => pathname === item.path || pathname.startsWith(item.path + "/"));

  return (
    <S.NavContainer>
      <S.NavInner>
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeIndex === index;
          const Icon = item.icon;

          return (
            <S.NavItem key={item.path} $isActive={isActive} onClick={() => router.push(item.path)}>
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
