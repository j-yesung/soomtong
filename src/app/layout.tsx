import type { Metadata } from "next";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "soomtong",
  description: "숨통 - 월수입 기반 생활비 관리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android/android-icon-192x192.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
