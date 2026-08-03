"use client";

import { House, ReceiptText, Settings } from "lucide-react";
import { motion } from "motion/react";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";

import * as S from "./style";

const NAV_ITEMS = [
  { tab: "home", icon: House },
  { tab: "fixed", icon: ReceiptText },
  { tab: "settings", icon: Settings },
] as const;

export default function BottomNavigation() {
  const { activeTab, setActiveTab } = useDashboardTabStore();

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
              aria-label={item.tab}
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
                <Icon size={20} strokeWidth={1.9} aria-hidden />
              </S.NavContent>
            </S.NavItem>
          );
        })}
      </S.NavInner>
    </S.NavContainer>
  );
}
