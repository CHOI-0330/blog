import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "HR向けポートフォリオ",
  openGraph: {
    title: "Portfolio",
    description: "HR向けポートフォリオ",
    url: "https://example.com",
    siteName: "Portfolio",
  },
  twitter: { card: "summary_large_image" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className="antialiased">
        <Header />
        <main className="container mx-auto max-w-3xl p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
