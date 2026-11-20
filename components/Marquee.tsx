import { skillGroups } from "@/lib/data";

const words = ["React", "Next.js", "TypeScript", "Turborepo", "Tailwind CSS", "REST APIs", "CI/CD", "Micro-frontends", "Event-driven design"];

/** Slow, endless strip of tools between the hero and the content. */
export default function Marquee() {
  const list = words.length ? words : skillGroups.flatMap((g) => g.items);
  const row = (key: string) => (
    <ul key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {list.map((w, i) => (
        <li key={w} className="flex items-center">
          <span
            className={`px-8 text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold tracking-tight ${
              i % 2 ? "text-transparent [-webkit-text-stroke:1.2px_rgb(var(--ink))]" : "text-ink"
            }`}
          >
            {w}
          </span>
          <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group overflow-hidden border-b border-line py-7" aria-label="Tools I work with">
      <div className="marquee-track flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
