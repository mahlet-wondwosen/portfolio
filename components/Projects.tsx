"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Head from "./Head";
import { EASE, Reveal } from "./motion";
import { projects, type Project } from "@/lib/data";

/** Card that tilts toward the pointer and lights up under it. */
function Card({
  p,
  n,
  delay,
  wide,
}: {
  p: { title: string; blurb: string; tags: string[]; url?: string; image?: string };
  n: string;
  delay: number;
  wide?: boolean;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mx}% ${my}%, rgb(var(--accent) / 0.2), transparent 70%)`;

  return (
    <motion.article
      className={`group relative flex overflow-hidden rounded-[22px] border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent ${
        wide
          ? "min-h-0 flex-col items-start justify-between gap-6 sm:col-span-2 lg:col-span-3 lg:flex-row lg:items-center"
          : "min-h-[230px] flex-col justify-between gap-6"
      }`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        mx.set(x * 100);
        my.set(y * 100);
        ry.set((x - 0.5) * 8);
        rx.set((0.5 - y) * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative">
        {p.image && (
          <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-lg border border-line">
            <Image
              src={p.image}
              alt={`${p.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}
        <span className="font-mono text-[0.78rem] text-gold">{n}</span>
        <h3 className="mb-2.5 mt-2 text-[1.7rem] font-bold leading-tight">{p.title}</h3>
        <p className="max-w-[46ch] text-[0.97rem] leading-relaxed text-muted">{p.blurb}</p>
        {p.url && (
          <a
            className="link mt-4 inline-block text-[0.92rem]"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the site
          </a>
        )}
      </div>

      <ul className="relative flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted transition-colors group-hover:border-accent/50"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-16 border-t border-line px-5 py-20 sm:py-28">
      <div className="mx-auto w-[min(1240px,100%)]">
        <Head title="Selected work" note="Built at EagleLion Systems Technology, 2025 to now" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p: Project, i) => (
            <Card key={p.title} p={p} n={`0${i + 1} / 0${projects.length}`} delay={(i % 3) * 0.1} />
          ))}
          <Card
            wide
            n="Earlier"
            delay={0.1}
            p={{
              title: "Hospital management system",
              blurb:
                "Backend services and API integrations for an Angular-based system handling clinical data, built at CREAVERS Service PLC.",
              tags: ["Angular", "Backend", "APIs"],
            }}
          />
        </div>

        <Reveal y={14}>
          <p className="mt-6 max-w-[70ch] text-[0.9rem] text-muted">
            These products run as portals or as mini-apps inside the Dashen Super App, all in one shared
            multi-app Turborepo monorepo. They are internal bank products, so there are no public links.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
