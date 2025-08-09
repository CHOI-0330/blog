"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteConfig } from "@/lib/firestore";

export default function Home() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteConfig();
  }, []);

  const fetchSiteConfig = async () => {
    try {
      const response = await fetch("/api/site-config");
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error("사이트 설정 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 기본값 설정
  const defaultConfig: SiteConfig = {
    siteTitle: "ポートフォリオブログ",
    heroTitle: "就職活動のための\nポートフォリオブログ",
    heroSubtitle: "技術と経験を共有し、未来への一歩を踏み出しましょう",
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
      github: "github.com/username",
      linkedin: "linkedin.com/in/username",
    },
  };

  const currentConfig = config || defaultConfig;

  // techStack이 undefined일 경우를 대비해 안전하게 처리
  const safeTechStack = currentConfig.techStack || defaultConfig.techStack;
  const safeContactInfo =
    currentConfig.contactInfo || defaultConfig.contactInfo;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                {currentConfig.siteTitle}
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-blue-600 font-semibold">
                ホーム
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                自己紹介
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                ブログ
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 whitespace-pre-line">
              {currentConfig.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {currentConfig.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                自己紹介を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentConfig.featuresTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {currentConfig.featuresDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <h3 className="text-xl font-semibold mb-2">
                {currentConfig.aboutCardTitle}
              </h3>
              <p className="text-gray-600">
                {currentConfig.aboutCardDescription}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <h3 className="text-xl font-semibold mb-2">
                {currentConfig.blogCardTitle}
              </h3>
              <p className="text-gray-600">
                {currentConfig.blogCardDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{currentConfig.ctaTitle}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {currentConfig.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            お問い合わせ
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentConfig.siteTitle}
              </h3>
              <p className="text-gray-300">{currentConfig.footerDescription}</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">ナビゲーション</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    自己紹介
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    ブログ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">技術スタック</h4>
              <ul className="space-y-2 text-gray-300">
                {safeTechStack.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">お問い合わせ</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Email: {safeContactInfo.email}</li>
                <li>GitHub: {safeContactInfo.github}</li>
                <li>LinkedIn: {safeContactInfo.linkedin}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 {currentConfig.siteTitle}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
