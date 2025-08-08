import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/posts";

export function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline">
        ← 홈으로
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
