"use client";

import { usePathname, useRouter, useParams } from "next/navigation";

const locales = ["ja", "en", "ko"] as const;

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = (params?.locale as string) || "ja";

  const switchLocale = (next: string) => {
    if (current === next) return;
    let target = pathname;
    if (current === "ja") {
      target = `/${next}${pathname === "/" ? "" : pathname}`;
    } else {
      target = pathname.replace(`/${current}`, next === "ja" ? "" : `/${next}`);
    }
    router.push(target || "/");
  };

  return (
    <select
      className="border p-1 text-sm"
      value={current}
      onChange={(e) => switchLocale(e.target.value)}
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}
