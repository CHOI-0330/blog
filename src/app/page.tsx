"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import MobileNav from "@/components/MobileNav";
import { SiteConfig } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site-config");
        if (res.ok) setConfig(await res.json());
      } catch (e) {
        console.error("사이트 설정 가져오기 오류:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const defaultConfig: SiteConfig = {
    siteTitle: "ポートフォリオブログ",
    heroTitle: "Front-End",
    heroSubtitle: "就職活動のためのポートフォリオブログ",
    heroDescription: "技術と経験を共有し、未来への一歩を踏み出しましょう",
    featuresTitle: "私の強み",
    featuresDescription:
      "技術力と創造性を組み合わせたソリューションを提供します",
    aboutCardTitle: "自己紹介",
    aboutCardDescription:
      "私の経歴、スキル、そして目標について詳しく紹介します。",
    blogCardTitle: "ブログ",
    blogCardDescription:
      "技術的な学びや経験を共有するブログ記事を書いています。",
    ctaTitle: "一緒に働きませんか？",
    ctaDescription: "新しい機会やプロジェクトについてお話ししましょう",
    footerDescription: "就職活動のためのポートフォリオサイトです。",
    techStack: ["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    contactInfo: {
      email: "example@email.com",
      github: "https://github.com/username",
      linkedin: "https://velog.io/@username",
    },
  };

  const current = useMemo(() => {
    const base = { ...defaultConfig, ...config };
    base.contactInfo = {
      ...defaultConfig.contactInfo,
      ...(config?.contactInfo || {}),
    };
    base.techStack = config?.techStack?.length
      ? config.techStack
      : defaultConfig.techStack;
    return base;
  }, [config]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 grid place-items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-black/70 mx-auto" />
          <p className="mt-4 text-black/70">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-50 overflow-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.h1
              className="text-2xl md:text-5xl font-bold text-black"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeInOut" },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {current.heroSubtitle}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        className="fixed top-0 left-0 right-0 z-40 bg-gray-50 border-b border-black/10"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: showIntro ? -80 : 0, opacity: showIntro ? 0 : 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link
                href={current.contactInfo.github || "#"}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-[6px] decoration-1 hover:opacity-70 transition text-sm md:text-base"
              >
                GitHub
              </Link>
              <Link
                href={current.contactInfo.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-[6px] decoration-1 hover:opacity-70 transition text-sm md:text-base"
              >
                Velog
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: "ホーム", href: "/" },
                { label: "自己紹介", href: "/about" },
                { label: "ブログ", href: "/blog" },
                { label: "お問い合わせ", href: "/contact" },
              ].map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`transition-colors border-b-2 pb-1 ${
                    pathname === n.href
                      ? "text-black font-semibold border-black"
                      : "text-black/80 hover:text-black border-transparent hover:border-black/60"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="md:hidden">
              <MobileNav siteTitle={current.siteTitle} currentPath={pathname} />
            </div>
          </div>
        </nav>
      </motion.header>

      <motion.section
        className="relative min-h-screen grid place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-medium text-black tracking-tight">
            프론트엔드 개발자 <strong className="font-extrabold">최지은</strong>{" "}
            입니다.
          </h1>
          <p className="mt-3 text-sm md:text-base text-black/70">
            사용자를 생각하는{" "}
            <strong className="font-semibold">역지사지</strong> 마인드,
            <br className="hidden md:block" />
            포기하지 않고 <strong className="font-semibold">책임감</strong> 있게
            일하는 개발자입니다.
          </p>
          <div className="mt-10">
            <div className="w-[220px] h-[280px] md:w-[280px] md:h-[340px] overflow-hidden rounded-[28px] grayscale contrast-110 shadow-xl ring-1 ring-black/5 bg-white mx-auto">
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={560}
                height={680}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="mt-8 animate-bounce text-black/60">⌄⌄</div>
        </div>
      </motion.section>
    </div>
  );
}
