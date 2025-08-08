import EmailCopyButton from "@/components/EmailCopyButton";
import { getProfile } from "@/lib/content";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Contact</h1>
      <p className="flex items-center gap-2">
        <a className="text-blue-600 underline" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <EmailCopyButton email={profile.email} />
      </p>
      <p className="mt-4">
        <a href="#" className="text-blue-600 underline">
          Schedule a call
        </a>
      </p>
    </div>
  );
}
