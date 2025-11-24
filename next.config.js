/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  output: "standalone",

  compiler: {
    styledComponents: true,
  },

  images: {
    unoptimized: true,
  },

  ignoreDuringBuilds: true,
});

export default nextConfig;
