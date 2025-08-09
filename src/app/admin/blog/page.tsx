"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { blogService, BlogPost } from "@/lib/firestore";

export default function BlogManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any).role !== "admin") {
      router.push("/login");
      return;
    }

    const fetchBlogPosts = async () => {
      try {
        const posts = await blogService.getAllPosts();
        setBlogPosts(posts);
      } catch (err) {
        console.error("블로그 포스트 가져오기 오류:", err);
        setError("블로그 포스트를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [session, status, router]);

  const handleDelete = async (id: string) => {
    if (confirm("この記事を削除しますか？")) {
      try {
        await blogService.deletePost(id);
        // 삭제 후 목록에서 제거
        setBlogPosts(blogPosts.filter((post) => post.id !== id));
      } catch (err) {
        console.error("블로그 포스트 삭제 오류:", err);
        alert("記事の削除に失敗しました。");
      }
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "날짜 없음";
    try {
      return new Date(date.toDate()).toLocaleDateString("ja-JP");
    } catch {
      return "날짜 없음";
    }
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
              <h1 className="text-xl font-bold text-gray-900">ブログ管理</h1>
            </div>
            <Link
              href="/admin/blog/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              新しい記事を作成
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                ブログ記事一覧
              </h2>
              <div className="text-sm text-gray-500">
                総記事数: {blogPosts.length}件
              </div>
            </div>
          </div>

          {error ? (
            <div className="px-6 py-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                再試行
              </button>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.readTime}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <div className="flex space-x-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        編集
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id!)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        削除
                      </button>
                      <Link
                        href={`/blog/${post.id}`}
                        target="_blank"
                        className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                      >
                        プレビュー
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 mb-4">ブログ記事がありません。</p>
              <Link
                href="/admin/blog/new"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                最初の記事を作成
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            クイックアクション
          </h3>
          <div className="flex space-x-4">
            <Link
              href="/admin/blog/new"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              ✨ 新しい記事を作成
            </Link>
            <Link
              href="/blog"
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              👁️ ブログをプレビュー
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔄 リストを更新
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
