import type { Metadata, Viewport } from "next";
// 디자인 토큰의 글꼴 Noto Sans KR (Regular 400, Medium 500, Bold 700)
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/700.css";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: "메모",
  description: "메모 앱",
  applicationName: "메모",
  // iOS: 홈 화면에 추가하면 주소창 없이 열리고 아이콘 이름이 "메모"로 보인다.
  appleWebApp: { capable: true, title: "메모", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

// 휴대폰 상단 바 색: surface/page (라이트 / 다크)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#101014" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme는 첫 화면 전에 스크립트가 붙이므로 서버 HTML과 달라도 경고하지 않는다.
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
