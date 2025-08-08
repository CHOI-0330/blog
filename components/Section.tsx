import React from "react";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-8">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="prose max-w-none">{children}</div>
    </section>
  );
}
