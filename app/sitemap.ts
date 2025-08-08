import { getWorks } from "@/lib/content";

export default async function sitemap() {
  const base = "https://example.com";
  const works = await getWorks();
  const routes = ["", "/works", "/about", "/resume", "/contact"];
  const workRoutes = works.map((w) => `/works/${w.slug}`);
  return [...routes, ...workRoutes].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
  }));
}
