"use client";

import Head from "./Head";

/** Standard section: heading row on top, content below. Content animates itself. */
export default function Section({
  id,
  title,
  note,
  children,
  className,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-16 border-t border-line px-5 py-20 sm:py-28 ${className ?? ""}`}>
      <div className="mx-auto w-[min(1240px,100%)]">
        <Head title={title} note={note} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
