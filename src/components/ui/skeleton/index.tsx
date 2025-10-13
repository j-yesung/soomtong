"use client";

import sspShouldForwardProp from "@styled-system/should-forward-prop";
import styled, { keyframes } from "styled-components";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
};

export default function Skeleton({ width = "100%", height = "100%", rounded = true }: SkeletonProps) {
  return <Container width={width} height={height} rounded={rounded} />;
}

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Container = styled("div").withConfig({
  shouldForwardProp: (prop, target) => (typeof target === "string" ? sspShouldForwardProp(prop) : true),
})<SkeletonProps>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === "number" ? `${height}px` : height)};
  border-radius: ${({ rounded }) => (rounded ? "8px" : "0")};
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;
