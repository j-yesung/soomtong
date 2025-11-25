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
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-180x180.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
