import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  ignoreDuringBuilds: true,
};

export default nextConfig;
