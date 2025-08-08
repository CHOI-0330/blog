import Link from "next/link";
import MetricBadge from "./MetricBadge";

export interface WorkFrontMatter {
  title: string;
  slug: string;
  role: string;
  period: string;
  metrics?: { label: string; value: string }[];
  tags?: string[];
}

export default function WorkCard({ work }: { work: WorkFrontMatter }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="rounded border p-4 hover:shadow"
    >
      <h3 className="text-lg font-bold">{work.title}</h3>
      <p className="text-sm text-gray-600">
        {work.role} / {work.period}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {work.metrics?.slice(0, 2).map((m) => (
          <MetricBadge key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-500">
        {work.tags?.map((t) => (
          <span key={t}>#{t}</span>
        ))}
      </div>
    </Link>
  );
}
