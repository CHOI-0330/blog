import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { getProfile } from "@/lib/content";

async function saveProfile(formData: FormData) {
  "use server";
  const token = formData.get("token") as string;
  if (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN) {
    throw new Error("Unauthorized");
  }
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const profilePath = path.join(process.cwd(), "content/meta/profile.json");
  const current = JSON.parse(await fs.readFile(profilePath, "utf8"));
  const updated = { ...current, name, email };
  await fs.writeFile(profilePath, JSON.stringify(updated, null, 2));
  revalidatePath("/");
}

export default async function AdminPage() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  const profile = await getProfile();
  return (
    <form action={saveProfile} className="flex flex-col gap-2 p-4 max-w-md">
      <label className="flex flex-col">
        Token
        <input type="password" name="token" className="border p-1" />
      </label>
      <label className="flex flex-col">
        Name
        <input name="name" className="border p-1" defaultValue={profile.name} />
      </label>
      <label className="flex flex-col">
        Email
        <input name="email" className="border p-1" defaultValue={profile.email} />
      </label>
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        Save
      </button>
    </form>
  );
}
