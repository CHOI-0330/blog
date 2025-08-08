import WorkCard from "@/components/WorkCard";
import { getWorks } from "@/lib/content";

export const metadata = {
  title: "Works",
};

export default async function WorksPage() {
  const works = await getWorks();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Works</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {works.map((w) => (
          <WorkCard key={w.slug} work={w} />
        ))}
      </div>
    </div>
  );
}
