"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogService, BlogPost } from "@/lib/firestore";
import SiteHeader from "@/components/SiteHeader";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await blogService.getAllPosts();
        setBlogPosts(posts);
      } catch (err) {
        setError("블로그 포스트를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black/70 mx-auto mb-4"></div>
          <p className="text-black/70">블로그 포스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6">
              ブログ
            </h1>
            <p className="text-lg md:text-xl text-black/70 mb-6 md:mb-8 px-4">
              技術的な学びや経験を共有するブログ記事
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm p-4 md:p-8 hover:shadow-md transition-shadow blog-card"
              >
                {/* Blog Image */}
                {post.image && (
                  <div className="mb-4 md:mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 md:h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
                  <span className="text-xs md:text-sm font-medium text-black bg-gray-200 px-2 md:px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1 md:space-x-2 text-black/60 text-xs md:text-sm">
                    <span>📅</span>
                    <span>
                      {post.createdAt
                        ? new Date(post.createdAt.toDate()).toLocaleDateString(
                            "ja-JP"
                          )
                        : "날짜 없음"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 text-black/60 text-xs md:text-sm">
                    <span>⏱️</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-lg md:text-2xl font-bold text-black mb-3 md:mb-4">
                  {post.title}
                </h2>

                <p className="text-sm md:text-base text-black/70 mb-4 md:mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-black/70 px-2 py-1 rounded flex items-center space-x-1"
                      >
                        <span>🏷️</span>
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.id}`}
                    className="text-black underline underline-offset-2 hover:opacity-70 font-medium text-sm md:text-base"
                  >
                    続きを読む →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 md:mb-4">
              最新の記事を受け取る
            </h2>
            <p className="text-base md:text-lg text-black/70 mb-6 md:mb-8 px-4">
              新しい記事が公開されたら、メールでお知らせします
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base"
              />
              <button className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm md:text-base">
                購読する
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
