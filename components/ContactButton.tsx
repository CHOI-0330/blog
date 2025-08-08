import Link from "next/link";

export default function ContactButton() {
  return (
    <Link
      href="/contact"
      className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
    >
      連絡する
    </Link>
  );
}
