import MetricBadge from "@/components/MetricBadge";
import ContactButton from "@/components/ContactButton";
import { getWorkBySlug, getWorks, getProfile } from "@/lib/content";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((w) => ({ slug: w.slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontMatter, content } = await getWorkBySlug(slug);
  const profile = await getProfile();
  const mdx = await compileMDX({ source: content });
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontMatter.title,
    author: profile.name,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Works",
        item: "https://example.com/works",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: frontMatter.title,
        item: `https://example.com/works/${frontMatter.slug}`,
      },
    ],
  };
  return (
    <article>
      <h1 className="text-3xl font-bold">{frontMatter.title}</h1>
      <p className="text-sm text-gray-500">
        {frontMatter.role} / {frontMatter.period}
      </p>
      <p className="mt-4">{frontMatter.summary30s}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {frontMatter.metrics?.map((m) => (
          <MetricBadge key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
      <div className="prose mt-8">{mdx.content}</div>
      <div className="mt-8">
        <ContactButton />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd),
        }}
      />
    </article>
  );
}
