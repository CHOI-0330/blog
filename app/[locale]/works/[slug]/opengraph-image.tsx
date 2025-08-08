import { ImageResponse } from "@vercel/og";
import { getWorkBySlug } from "@/lib/content";

export const runtime = "nodejs";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const { frontMatter } = await getWorkBySlug(params.slug);
  const metric = frontMatter.metrics?.[0];
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          background: "white",
          fontSize: 48,
        }}
      >
        <div>{frontMatter.title}</div>
        {metric && (
          <div style={{ fontSize: 32 }}>
            {metric.label}: {metric.value}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
