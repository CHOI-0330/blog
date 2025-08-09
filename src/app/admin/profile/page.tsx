"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfileManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "田中太郎",
    title: "フルスタック開発者",
    email: "tanaka@example.com",
    location: "東京都渋谷区",
    about:
      "私は情熱的なフルスタック開発者で、最新の技術トレンドに常に注目しながら、ユーザー体験を重視したアプリケーションの開発に取り組んでいます。",
    experience: [
      {
        title: "フルスタック開発者",
        company: "○○株式会社",
        period: "2024 - 現在",
        description:
          "React、Next.js、Node.jsを使用したWebアプリケーションの開発に従事。",
      },
    ],
    education: [
      {
        degree: "コンピュータサイエンス学士",
        school: "○○大学",
        period: "2020 - 2024",
        description:
          "ソフトウェアエンジニアリング、データ構造、アルゴリズムを学びました。",
      },
    ],
    skills: {
      frontend: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript",
      ],
      backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
      other: ["Git", "Docker", "AWS", "CI/CD", "REST API"],
    },
    social: {
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      twitter: "https://twitter.com/username",
    },
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 실제로는 API 호출을 해야 합니다
      console.log("프로필 데이터:", formData);

      // 성공 메시지 표시
      alert("プロフィールが更新されました。");
    } catch (error) {
      console.error("프로필 업데이트 중 오류:", error);
      alert("エラーが発生しました。");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (
    category: string,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category as keyof typeof prev.skills].map(
          (skill, i) => (i === index ? value : skill)
        ),
      },
    }));
  };

  const addSkill = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category as keyof typeof prev.skills], ""],
      },
    }));
  };

  const removeSkill = (category: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category as keyof typeof prev.skills].filter(
          (_, i) => i !== index
        ),
      },
    }));
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

  if (!session || session.user.role !== "admin") {
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
              <h1 className="text-xl font-bold text-gray-900">
                プロフィール管理
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                基本情報
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    名前
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    職種
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    所在地
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                自己紹介
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                value={formData.about}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                スキル
              </h3>
              {Object.entries(formData.skills).map(([category, skills]) => (
                <div key={category} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {category}
                    </label>
                    <button
                      type="button"
                      onClick={() => addSkill(category)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + 追加
                    </button>
                  </div>
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) =>
                            handleSkillChange(category, index, e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeSkill(category, index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ソーシャルリンク
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    GitHub
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.social.github}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        social: { ...prev.social, github: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.social.linkedin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        social: { ...prev.social, linkedin: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={formData.social.twitter}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        social: { ...prev.social, twitter: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? "保存中..." : "変更を保存"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
