"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "@/components/MobileNav";

export default function SiteHeader() {
  const pathname = usePathname();
  const links = [
    { label: "ホーム", href: "/" },
    { label: "自己紹介", href: "/about" },
    { label: "ブログ", href: "/blog" },
    { label: "お問い合わせ", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-gray-50 border-b border-black/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/username"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-[6px] decoration-1 hover:opacity-70 transition text-sm md:text-base"
            >
              GitHub
            </Link>
            <Link
              href="https://velog.io/@username"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-[6px] decoration-1 hover:opacity-70 transition text-sm md:text-base"
            >
              Velog
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {links.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`transition-colors border-b-2 pb-1 $
                  {pathname === n.href
                    ? "text-black font-semibold border-black"
                    : "text-black/80 hover:text-black border-transparent hover:border-black/60"}
                `}
              >
                {n.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <MobileNav siteTitle="ポートフォリオブログ" currentPath={pathname} />
          </div>
        </div>
      </nav>
    </header>
  );
}

