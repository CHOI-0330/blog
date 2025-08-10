"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogService, BlogPost } from "@/lib/firestore";
import SiteHeader from "@/components/SiteHeader";

export default function BlogPostDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.id) return;

      try {
        const postData = await blogService.getPostById(params.id as string);
        if (postData) {
          setPost(postData);
          // 관련 포스트 가져오기 (같은 카테고리)
          const allPosts = await blogService.getAllPosts();
          const related = allPosts
            .filter(
              (p) => p.id !== params.id && p.category === postData.category
            )
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setError("블로그 포스트를 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("블로그 포스트를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const formatDate = (date: { toDate: () => Date } | null | undefined) => {
    if (!date) return "날짜 없음";
    try {
      return new Date(date.toDate()).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    } catch {
      return "날짜 없음";
    }
  };

  const formatReadingTime = (readTime: string) => {
    return readTime.includes("분") ? readTime : `${readTime}분`;
  };

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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "포스트를 찾을 수 없습니다"}
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            블로그 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-black/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-black/60 hover:text-black/70">
                  ホーム
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-black/40 mx-2">/</span>
                  <Link
                    href="/blog"
                    className="text-black/60 hover:text-black/70"
                  >
                    ブログ
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-black/40 mx-2">/</span>
                  <span className="text-black font-medium">
                    {post.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Hero Image */}
          {post.image && (
            <div className="w-full h-64 md:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Post Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium text-black bg-gray-200 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center space-x-2 text-black/60 text-sm">
                  <span>📅</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2 text-black/60 text-sm">
                  <span>⏱️</span>
                  <span>{formatReadingTime(post.readTime)}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {post.title}
              </h1>

              <p className="text-xl text-black/70 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-gray-100 text-black/70 px-3 py-1 rounded-full flex items-center space-x-1"
                  >
                    <span>🏷️</span>
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-black leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(
                      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                      ""
                    ) // script 태그 제거
                    .replace(/javascript:/gi, "") // javascript: 프로토콜 제거
                    .replace(/on\w+\s*=/gi, ""), // 이벤트 핸들러 제거
                }}
              />
            </div>

            {/* Post Footer */}
            <footer className="mt-12 pt-8 border-t border-black/10">
              <div className="flex items-center justify-between">
                <div className="text-sm text-black/60">
                  <span>📝 작성일: {formatDate(post.createdAt)}</span>
                  {post.updatedAt && post.updatedAt !== post.createdAt && (
                    <span className="ml-4">
                      ✏️ 수정일: {formatDate(post.updatedAt)}
                    </span>
                  )}
                </div>

                <Link
                  href="/blog"
                  className="text-black underline underline-offset-2 hover:opacity-70 font-medium flex items-center space-x-1"
                >
                  <span>←</span>
                  <span>블로그 목록으로</span>
                </Link>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              📚 관련 포스트
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  {relatedPost.image && (
                    <div className="mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <span className="text-xs font-medium text-black bg-gray-200 px-2 py-1 rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-black/70 text-sm mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.id}`}
                    className="text-black underline underline-offset-2 hover:opacity-70 text-sm font-medium"
                  >
                    続きを読む →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            <span>←</span>
            <span>모든 블로그 포스트 보기</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
