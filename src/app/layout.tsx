// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ポートフォリオブログ",
  description: "취업활동을 위한 포트폴리오 블로그입니다.",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#3B82F6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ポートフォリオブログ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${noto.className} antialiased`}>
        <Providers>
          <div className="relative min-h-screen">
            <div className="fixed inset-0 -z-10 bg-[#f5f5f5]" />
            <div className="min-h-screen">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
