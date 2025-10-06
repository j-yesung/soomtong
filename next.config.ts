import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
