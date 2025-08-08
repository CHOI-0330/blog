import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "포트폴리오 블로그",
  description: "취업을 위한 포트폴리오 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <header className="max-w-2xl mx-auto p-6">
          <Link href="/" className="text-2xl font-bold">
            포트폴리오 블로그
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
