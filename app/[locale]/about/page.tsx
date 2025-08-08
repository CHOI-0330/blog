import { getProfile } from "@/lib/content";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const profile = await getProfile();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">About</h1>
      <p>
        {profile.name} - {profile.title}
      </p>
      <p className="mt-2">{profile.location}</p>
    </div>
  );
}
