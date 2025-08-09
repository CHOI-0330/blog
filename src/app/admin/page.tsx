"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  blogService,
  BlogPost,
  contactService,
  ContactForm,
} from "@/lib/firestore";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any).role !== "admin") {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [posts, contacts] = await Promise.all([
          blogService.getAllPosts(),
          contactService.getAllContactForms(),
        ]);
        // 최근 발행된 글 5개만 표시
        setBlogPosts(posts.slice(0, 5));
        setContactForms(contacts);
      } catch (err) {
        console.error("데이터 가져오기 오류:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
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
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">管理者パネル</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                ようこそ、{session.user.name}さん
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            管理メニュー
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/admin/blog"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ブログ管理
              </h3>
              <p className="text-gray-600">
                ブログ記事の作成、編集、削除を行います
              </p>
            </Link>

            <Link
              href="/admin/profile"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                プロフィール管理
              </h3>
              <p className="text-gray-600">自己紹介やスキル情報を編集します</p>
            </Link>

            <Link
              href="/admin/firebase"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Firebase 설정
              </h3>
              <p className="text-gray-600">Firebase 프로젝트設定を管理します</p>
            </Link>

            <Link
              href="/admin/site-config"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                サイト設定
              </h3>
              <p className="text-gray-600">メインページの内容を管理します</p>
            </Link>
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              最近のブログ記事
            </h3>
            <Link
              href="/admin/blog"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              すべて見る →
            </Link>
          </div>

          {error ? (
            <div className="text-red-600 text-center py-4">{error}</div>
          ) : blogPosts.length > 0 ? (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
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
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      編集
                    </Link>
                    <Link
                      href={`/blog/${post.id}`}
                      target="_blank"
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      プレビュー
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">まだブログ記事がありません</p>
              <Link
                href="/admin/blog/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                最初の記事を作成
              </Link>
            </div>
          )}
        </div>

        {/* Recent Contact Forms */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              最近のお問い合わせ
            </h3>
            <span className="text-sm text-gray-500">
              総数: {contactForms.length}
            </span>
          </div>

          {contactForms.length > 0 ? (
            <div className="space-y-4">
              {contactForms.slice(0, 5).map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {contact.name}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {contact.email}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            contact.status === "new"
                              ? "bg-red-100 text-red-800"
                              : contact.status === "read"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {contact.status === "new"
                            ? "新規"
                            : contact.status === "read"
                            ? "既読"
                            : "返信済み"}
                        </span>
                      </div>
                      <h5 className="font-medium text-gray-800 mb-1">
                        {contact.subject}
                      </h5>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {contact.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {contactForms.length > 5 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    他 {contactForms.length - 5} 件のお問い合わせがあります
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">まだお問い合わせがありません</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-500">
              総ブログ記事数
            </h4>
            <p className="text-2xl font-bold text-gray-900">
              {blogPosts.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-500">今月の閲覧数</h4>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-500">お問い合わせ</h4>
            <p className="text-2xl font-bold text-gray-900">
              {contactForms.length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
