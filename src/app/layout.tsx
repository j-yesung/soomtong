import type { Metadata } from "next";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "soomtong",
  description: "숨통 - 월수입 기반 생활비 관리",
  themeColor: "#2D2D2D",
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
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
