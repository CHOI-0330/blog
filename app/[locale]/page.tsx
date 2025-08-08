import ContactButton from "@/components/ContactButton";
import WorkCard from "@/components/WorkCard";
import Section from "@/components/Section";
import Link from "next/link";
import { getProfile, getWorks } from "@/lib/content";

export default async function Home() {
  const profile = await getProfile();
  const works = await getWorks();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    address: profile.location,
  };

  return (
    <div>
      <section className="mt-8 text-center">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="text-lg">{profile.title}</p>
        {works[0] && (
          <p className="mt-2 text-sm text-gray-600">{works[0].summary30s}</p>
        )}
        <div className="mt-4 flex justify-center gap-4">
          <Link
            href="/resume"
            className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
          >
            Resume
          </Link>
          <ContactButton />
        </div>
      </section>
      <Section title="Works">
        <div className="grid gap-4 md:grid-cols-2">
          {works.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
