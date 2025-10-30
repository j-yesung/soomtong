"use client";

import React, { useState } from "react";

import { MotionConfig, motion } from "framer-motion";

import { Highlight, Label, PanelItem, PanelTrack, PanelViewport, TabButton, TabList } from "./style";

type Props = {
  tabList: string[];
  children: React.ReactNode[];
};

export default function SmoothPillTabsSingle({ tabList, children }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);

  const count = tabList.length;
  const panes = React.Children.toArray(children);
  const tabW = 100 / count;

  const rightMargin = activeIdx === count - 1 ? -2 : 0;
  const leftMargin = activeIdx === 0 ? 2 : 0;

  const handleSelect = (i: number) => {
    if (i === activeIdx) return;
    setPrevIdx(activeIdx);
    setActiveIdx(i);
  };

  return (
    <MotionConfig transition={{ type: "tween", ease: [0.2, 0, 0, 1], duration: 0.5 }}>
      <TabList role="tablist" aria-label="Pill tabs (single highlight)" $tabCount={count}>
        <Highlight
          as={motion.div}
          animate={{ left: `${activeIdx * tabW + leftMargin}%`, width: `${tabW + rightMargin}%` }}
        />

        {tabList.map((t, i) => {
          const isActive = i === activeIdx;
          return (
            <TabButton
              key={t}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              onClick={() => handleSelect(i)}
            >
              <Label $active={isActive}>{t}</Label>
            </TabButton>
          );
        })}
      </TabList>

      <PanelViewport>
        <PanelTrack
          as={motion.div}
          animate={{ x: `-${activeIdx * 100}%` }}
          $tabCount={count}
          onAnimationComplete={() => setPrevIdx(null)}
        >
          {Array.from({ length: count }).map((_, i) => (
            <PanelItem
              as={motion.div}
              key={`panel-${i}`}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              aria-hidden={i !== activeIdx}
              animate={{ filter: i === prevIdx ? "blur(6px)" : "blur(0px)", opacity: 1 }}
            >
              {panes[i]}
            </PanelItem>
          ))}
        </PanelTrack>
      </PanelViewport>
    </MotionConfig>
  );
}
