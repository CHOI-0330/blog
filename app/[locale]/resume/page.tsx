import { getProfile } from "@/lib/content";

export const metadata = { title: "Resume" };

export default async function ResumePage() {
  const profile = await getProfile();
  return (
    <article className="prose">
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
      <p>{profile.email}</p>
      <p>{profile.location}</p>
    </article>
  );
}
