import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <nav className="flex gap-4 text-sm">
        <Link href="/">ホーム</Link>
        <Link href="/works">実績</Link>
        <Link href="/about">プロフィール</Link>
        <Link href="/resume">履歴書</Link>
        <Link href="/contact">連絡先</Link>
      </nav>
      <LocaleSwitcher />
    </header>
  );
}
