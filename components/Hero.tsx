"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { waves } from "@/lib/waves";
import { profile } from "@/lib/data";
import { useClock } from "@/lib/hooks";
import { scrollToId } from "@/lib/utils";
import { EASE, Magnetic } from "./motion";

const START = 1.05; // wait for the opening curtain

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className="block"
        initial={{ y: "112%", rotate: 3 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: START + delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Fade({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: START + delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Portrait in an arch. Falls back to a monogram until public/images/mahlet.jpg exists. */
function Portrait() {
  const [missing, setMissing] = useState(false);
  const chips = [
    // left side
    { t: "React",        cls: "-left-4 top-10",    d: 0.0 },
    { t: "TypeScript",   cls: "-left-10 top-[38%]", d: 1.0 },
    { t: "Turborepo",    cls: "-left-6 bottom-16", d: 0.8 },
    // right side
    { t: "Next.js",      cls: "-right-6 top-[15%]", d: 0.5 },
    { t: "Tailwind CSS", cls: "-right-10 top-[50%]", d: 1.4 },
    { t: "REST APIs",    cls: "-right-4 bottom-10", d: 1.8 },
    // middle / center-ish
    { t: "Angular",      cls: "left-1/2 -translate-x-1/2 -top-6", d: 0.3 },
    { t: "Docker",       cls: "left-1/2 -translate-x-1/2 top-[28%]", d: 1.2 },
    { t: "CI/CD",        cls: "left-1/2 -translate-x-1/2 bottom-4", d: 1.6 },
  ];
  return (
    <motion.div
      className="relative mx-auto w-[min(320px,78vw)] lg:mx-0 lg:justify-self-end"
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, delay: START + 0.3, ease: EASE }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute -inset-6 rounded-t-[999px] rounded-b-[40px] border border-dashed border-white/30"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[32px] border border-white/30 bg-gradient-to-b from-[#8a72d6]/40 to-[#3c3380]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {missing ? (
          <div className="h-full w-full" />
        ) : (
          <Image
            src="/images/mahlet.jpg"
            alt="Portrait of Mahlet Wondwosen"
            fill
            priority
            sizes="(min-width: 1024px) 320px, 78vw"
            className="object-cover"
            onError={() => setMissing(true)}
          />
        )}
      </motion.div>
      {chips.map((c) => (
        <motion.span
          key={c.t}
          aria-hidden="true"
          className={`absolute ${c.cls} rounded-full border border-white/30 bg-[#3c3380]/80 px-4 py-2 text-[0.8rem] font-medium backdrop-blur`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: c.d }}
        >
          {c.t}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const time = useClock(profile.timezone);
  const reduce = useReducedMotion();

  // The waves lean slightly toward the pointer.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 18 });
  const sy = useSpring(py, { stiffness: 40, damping: 18 });
  const wx = useTransform(sx, [-1, 1], [-26, 26]);
  const wy = useTransform(sy, [-1, 1], [-18, 18]);

  return (
    <header
      id="hero"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-[#6a4fa3] via-[#4b3f8c] to-[#3c3380] px-5 pb-20 pt-28 text-white"
    >
      <motion.div
        className="hero-waves pointer-events-none absolute -inset-10"
        style={{ x: wx, y: wy }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: START - 0.2, ease: EASE }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 820"
          preserveAspectRatio="xMidYMid slice"
          className="block h-full w-full"
          dangerouslySetInnerHTML={{ __html: waves }}
        />
      </motion.div>

      <div className="relative mx-auto grid w-[min(1240px,100%)] items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
        <Fade delay={0} className="text-[0.85rem] font-medium uppercase tracking-[0.2em] text-[#d9cffa]">
          {profile.title}
        </Fade>

        <h1 className="mt-5 text-[clamp(3rem,7.4vw,6.4rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          <Line delay={0.1}>{profile.first}</Line>
          <Line delay={0.24}>{profile.last}</Line>
        </h1>

        <Fade delay={0.55}>
          <p className="mt-8 max-w-[48ch] text-[1.05rem] leading-[1.75] text-[#e6e0fa]">{profile.intro}</p>
        </Fade>

        <Fade delay={0.7} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button
              onClick={() => scrollToId("work")}
              className="rounded-full bg-white px-8 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-[#3c3380] transition-colors hover:bg-[#ebe8f7]"
            >
              View my work
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block rounded-full border-[1.5px] border-[#cfc6f2] px-8 py-3 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10"
            >
              Email me
            </a>
          </Magnetic>
        </Fade>

        <Fade delay={0.9}>
          <p className="mt-14 flex items-center gap-3 text-[0.9rem] text-[#d9cffa]">
            <span className="h-2 w-2 shrink-0 animate-ring rounded-full bg-white" aria-hidden="true" />
            <span>
              It is <span className="tabular-nums text-white">{time}</span> in Addis Ababa. Open to fully
              remote roles.
            </span>
          </p>
        </Fade>
        </div>
        <Portrait />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.72rem] uppercase tracking-[0.25em] text-[#d9cffa] sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: START + 1.2, duration: 1 }}
      >
        Scroll
        <motion.span
          className="block h-8 w-px origin-top bg-[#d9cffa]"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </header>
  );
}
