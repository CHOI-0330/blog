"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteConfig } from "@/lib/firestore";

export default function SiteConfigPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [config, setConfig] = useState<SiteConfig>({
    siteTitle: "",
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    featuresTitle: "",
    featuresDescription: "",
    aboutCardTitle: "",
    aboutCardDescription: "",
    blogCardTitle: "",
    blogCardDescription: "",
    ctaTitle: "",
    ctaDescription: "",
    footerDescription: "",
    techStack: [],
    contactInfo: {
      email: "",
      github: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any).role !== "admin") {
      router.push("/login");
      return;
    }

    fetchSiteConfig();
  }, [session, status, router]);

  const fetchSiteConfig = async () => {
    try {
      const response = await fetch("/api/site-config");
      if (response.ok) {
        const data = await response.json();
        // 데이터가 안전한지 확인하고 설정
        setConfig({
          ...data,
          techStack: data.techStack || [],
          contactInfo: {
            email: data.contactInfo?.email || "",
            github: data.contactInfo?.github || "",
            linkedin: data.contactInfo?.linkedin || "",
          },
        });
      } else {
        throw new Error("설정을 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("사이트 설정 가져오기 오류:", error);
      setMessage("설정을 가져오는데 실패했습니다.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/site-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setMessage("✅ 사이트 설정이 성공적으로 저장되었습니다!");
        setMessageType("success");
      } else {
        throw new Error("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("사이트 설정 저장 오류:", error);
      setMessage("❌ 설정 저장에 실패했습니다.");
      setMessageType("error");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleTechStackChange = (index: number, value: string) => {
    const newTechStack = [...config.techStack];
    newTechStack[index] = value;
    setConfig({ ...config, techStack: newTechStack });
  };

  const addTechStack = () => {
    setConfig({
      ...config,
      techStack: [...config.techStack, ""],
    });
  };

  const removeTechStack = (index: number) => {
    const newTechStack = config.techStack.filter((_, i) => i !== index);
    setConfig({ ...config, techStack: newTechStack });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                ← 管理者パネルに戻る
              </Link>
              <h1 className="text-xl font-bold text-gray-900">サイト設定</h1>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "💾 保存中..." : "💾 設定を保存"}
            </button>
          </div>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`p-4 rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Basic Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              🏠 基本設定
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  サイトタイトル
                </label>
                <input
                  type="text"
                  value={config.siteTitle}
                  onChange={(e) =>
                    setConfig({ ...config, siteTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              🎯 ヒーローセクション
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メインタイトル
                </label>
                <textarea
                  value={config.heroTitle}
                  onChange={(e) =>
                    setConfig({ ...config, heroTitle: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="改行は \n で表現"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  サブタイトル
                </label>
                <input
                  type="text"
                  value={config.heroSubtitle}
                  onChange={(e) =>
                    setConfig({ ...config, heroSubtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明文
                </label>
                <textarea
                  value={config.heroDescription}
                  onChange={(e) =>
                    setConfig({ ...config, heroDescription: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ⭐ 特徴セクション
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  セクションタイトル
                </label>
                <input
                  type="text"
                  value={config.featuresTitle}
                  onChange={(e) =>
                    setConfig({ ...config, featuresTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  セクション説明
                </label>
                <textarea
                  value={config.featuresDescription}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      featuresDescription: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    自己紹介カードタイトル
                  </label>
                  <input
                    type="text"
                    value={config.aboutCardTitle}
                    onChange={(e) =>
                      setConfig({ ...config, aboutCardTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ブログカードタイトル
                  </label>
                  <input
                    type="text"
                    value={config.blogCardTitle}
                    onChange={(e) =>
                      setConfig({ ...config, blogCardTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    自己紹介カード説明
                  </label>
                  <textarea
                    value={config.aboutCardDescription}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        aboutCardDescription: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ブログカード説明
                  </label>
                  <textarea
                    value={config.blogCardDescription}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        blogCardDescription: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              📞 CTAセクション
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={config.ctaTitle}
                  onChange={(e) =>
                    setConfig({ ...config, ctaTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明文
                </label>
                <textarea
                  value={config.ctaDescription}
                  onChange={(e) =>
                    setConfig({ ...config, ctaDescription: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Footer Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              🦶 フッター設定
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  サイト説明
                </label>
                <textarea
                  value={config.footerDescription}
                  onChange={(e) =>
                    setConfig({ ...config, footerDescription: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  技術スタック
                </label>
                <div className="space-y-2">
                  {config.techStack.map((tech, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) =>
                          handleTechStackChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeTechStack(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addTechStack}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    + 技術スタック追加
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={config.contactInfo.email}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        contactInfo: {
                          ...config.contactInfo,
                          email: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={config.contactInfo.github}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        contactInfo: {
                          ...config.contactInfo,
                          github: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={config.contactInfo.linkedin}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        contactInfo: {
                          ...config.contactInfo,
                          linkedin: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              👁️ プレビュー
            </h2>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                設定した内容でメインページが表示されます。
              </p>
              <Link
                href="/"
                target="_blank"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                メインページを確認
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
