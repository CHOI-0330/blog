import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface WorkFrontMatter {
  title: string;
  slug: string;
  role: string;
  period: string;
  teamSize?: number;
  metrics?: { label: string; value: string }[];
  summary30s: string;
  tags?: string[];
  confidential?: boolean;
}

const worksDir = path.join(process.cwd(), "content/works");

export async function getProfile() {
  const raw = await fs.readFile(
    path.join(process.cwd(), "content/meta/profile.json"),
    "utf-8"
  );
  return JSON.parse(raw);
}

export async function getWorks(): Promise<WorkFrontMatter[]> {
  const files = await fs.readdir(worksDir);
  const works = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(worksDir, file), "utf-8");
        const { data } = matter(raw);
        return data as WorkFrontMatter;
      })
  );
  return works;
}

export async function getWorkBySlug(slug: string) {
  const raw = await fs.readFile(path.join(worksDir, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { frontMatter: data as WorkFrontMatter, content };
}
