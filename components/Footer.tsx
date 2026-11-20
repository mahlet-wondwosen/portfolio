"use client";

import { profile } from "@/lib/data";
import { ArrowUpIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-6">
      <div className="mx-auto flex w-[min(1240px,100%)] flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowUpIcon /> Back to top
        </button>
      </div>
    </footer>
  );
}
