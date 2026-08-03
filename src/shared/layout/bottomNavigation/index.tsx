"use client";

import { Settings } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";
import { FixedIcon, HomeIcon } from "@/shared/assets/svg/interface";
import { DASHBOARD_PATH } from "@/shared/lib/navigation/dashboard";

import * as S from "./style";

type NavigationIcon = typeof HomeIcon | typeof Settings;

const NAV_ITEMS: { tab: DashboardTab; label: string; icon: NavigationIcon }[] = [
  { tab: "home", label: "홈", icon: HomeIcon },
  { tab: "fixed", label: "고정지출", icon: FixedIcon },
  { tab: "settings", label: "설정", icon: Settings },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  const { activeTab, setActiveTab } = useDashboardTabStore();

  if (pathname !== DASHBOARD_PATH) return null;

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleTabClick = (tab: DashboardTab) => {
    if (tab === activeTab) return;
    handleTabChange(tab);
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
              onClick={() => handleTabClick(item.tab)}
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
