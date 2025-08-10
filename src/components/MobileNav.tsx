"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface MobileNavProps {
  siteTitle: string;
  currentPath: string;
}

export default function MobileNav({ siteTitle, currentPath }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "ホーム", href: "/" },
    { name: "自己紹介", href: "/about" },
    { name: "ブログ", href: "/blog" },
    { name: "お問い合わせ", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* 햄버거 메뉴 버튼 */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-foreground hover:text-accent hover:bg-card-bg transition-colors touch-feedback"
        aria-label="메뉴 열기"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* 모바일 메뉴 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMenu}
          />

          {/* 메뉴 패널 */}
          <div className="fixed top-0 right-0 h-full w-64 bg-card-bg border-l border-card-border shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-card-border">
                <h2 className="text-lg font-semibold text-foreground">
                  {siteTitle}
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-foreground hover:text-accent hover:bg-background transition-colors touch-feedback"
                  aria-label="메뉴 닫기"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* 네비게이션 링크 */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors touch-feedback ${
                          currentPath === item.href
                            ? "bg-accent/10 text-accent"
                            : "text-foreground hover:bg-background hover:text-accent"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* 푸터 */}
              <div className="p-4 border-t border-card-border">
                <p className="text-sm text-text-muted text-center">
                  © 2024 {siteTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
