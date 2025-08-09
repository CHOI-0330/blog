import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ポートフォリオブログ",
  description: "취업활동을 위한 포트폴리오 블로그입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
