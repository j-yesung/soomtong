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

  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
