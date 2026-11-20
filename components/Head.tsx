import { Reveal, SplitWords } from "./motion";

/** Section heading with a small note on the right. */
export default function Head({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <h2 className="text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05]">
        <SplitWords text={title} />
      </h2>
      {note && (
        <Reveal y={14} delay={0.2}>
          <p className="font-mono text-[0.85rem] text-muted">{note}</p>
        </Reveal>
      )}
    </div>
  );
}
