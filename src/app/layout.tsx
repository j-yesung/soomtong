import type { Metadata } from "next";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "soomtong",
  description: "숨통 - 월 수입 기반 생활비 관리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
