"use client";

import React from "react";

import * as S from "./style";
import type { GridItemProps, GridProps } from "./type";

function toSize(v?: string | number) {
  if (!v) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

function typeCheck(property?: number) {
  return property && typeof property === "number" && property > 0;
}

function computeTemplateColumns(minColWidth?: string | number, cols?: number) {
  if (minColWidth) {
    return `repeat(auto-fit, minmax(${toSize(minColWidth)}, 1fr))`;
  }
  if (typeCheck(cols)) {
    return `repeat(${cols}, minmax(0, 1fr))`;
  }
  return undefined;
}

function Grid({ cols, minColWidth, ...rest }: GridProps & { ref?: React.Ref<HTMLDivElement> }) {
  const gridTemplateColumns = computeTemplateColumns(minColWidth, cols);

  return <S.StyledGrid display="grid" gridTemplateColumns={gridTemplateColumns} {...rest} />;
}

function GridItem({ col, row, ...rest }: GridItemProps & { ref?: React.Ref<HTMLDivElement> }) {
  const gridColumn = typeof col === "number" && col > 0 ? `span ${col} / span ${col}` : undefined;
  const gridRow = typeof row === "number" && row > 0 ? `span ${row} / span ${row}` : undefined;

  return <S.StyledGridItem gridColumn={gridColumn} gridRow={gridRow} {...rest} />;
}

Grid.Item = GridItem;

export default Grid;
export { GridItem };
