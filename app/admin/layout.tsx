import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = { title: "Admin" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="p-4">{children}</body>
    </html>
  );
}
