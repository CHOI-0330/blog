"use client";

export default function EmailCopyButton({ email }: { email: string }) {
  const copy = () => navigator.clipboard.writeText(email);
  return (
    <button
      onClick={copy}
      className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
    >
      Copy
    </button>
  );
}
