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
          <Magnetic>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#cfc6f2] text-white transition-colors hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#cfc6f2] text-white transition-colors hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
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
