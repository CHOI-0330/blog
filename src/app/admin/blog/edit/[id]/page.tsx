"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  image?: string;
}

interface EditBlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "フロントエンド",
    tags: "",
    readTime: "5分",
    image: "",
  });

  // Next.js 15에서 params를 unwrap
  const resolvedParams = use(params);
  const postId = parseInt(resolvedParams.id);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/login");
      return;
    }

    // 실제로는 API에서 데이터를 가져와야 합니다
    const mockPosts: BlogPost[] = [
      {
        id: 1,
        title: "Next.js 14の新機能について",
        excerpt:
          "Next.js 14で導入された新機能と改善点について詳しく解説します。",
        content: "Next.js 14の内容...",
        date: "2024-01-15",
        readTime: "5分",
        tags: ["Next.js", "React", "JavaScript"],
        category: "フロントエンド",
      },
      {
        id: 2,
        title: "TypeScriptのベストプラクティス",
        excerpt:
          "TypeScriptを使用した開発で知っておくべきベストプラクティスとコーディング規約について紹介します。",
        content: "TypeScriptの内容...",
        date: "2024-01-10",
        readTime: "8分",
        tags: ["TypeScript", "JavaScript", "コーディング"],
        category: "プログラミング",
      },
    ];

    const post = mockPosts.find((p) => p.id === postId);

    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags.join(", "),
        readTime: post.readTime,
        image: post.image || "",
      });
    }

    setLoading(false);
  }, [session, status, router, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 실제로는 API 호출을 해야 합니다
      const postData = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        id: postId,
      };

      console.log("수정된 글 데이터:", postData);

      // 성공 후 블로그 관리 페이지로 이동
      router.push("/admin/blog");
    } catch (error) {
      console.error("글 수정 중 오류:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
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
              <Link
                href="/admin/blog"
                className="text-gray-600 hover:text-gray-900"
              >
                ← ブログ管理に戻る
              </Link>
              <h1 className="text-xl font-bold text-gray-900">記事を編集</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                タイトル *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="記事のタイトルを入力してください"
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              onImageUpload={handleImageUpload}
              currentImage={formData.image}
            />

            {/* Excerpt */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                要約 *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="記事の要約を入力してください"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                本文 *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={15}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="記事の本文を入力してください"
              />
            </div>

            {/* Category and Read Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  カテゴリー
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="フロントエンド">フロントエンド</option>
                  <option value="バックエンド">バックエンド</option>
                  <option value="プログラミング">プログラミング</option>
                  <option value="デザイン">デザイン</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="readTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  読了時間
                </label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5分"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                タグ
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="React, Next.js, TypeScript (カンマ区切り)"
              />
              <p className="mt-1 text-sm text-gray-500">
                タグはカンマで区切って入力してください
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/blog"
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
