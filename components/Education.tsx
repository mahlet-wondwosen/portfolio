"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { EASE, Reveal } from "./motion";
import { certs, education } from "@/lib/data";

/** Degrees slide in from opposite sides, certificates stack up one by one. */
export default function Education() {
  return (
    <Section id="education" title="Education" note="Two degrees in computing and a few focused courses.">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <motion.article
            key={e.degree}
            className="relative overflow-hidden rounded-[24px] bg-surface p-8"
            initial={{ opacity: 0, x: i === 0 ? -70 : 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -70px 0px" }}
            transition={{ duration: 1, ease: EASE }}
            whileHover={{ y: -6 }}
          >
            <span
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/10"
            />
            <p className="inline-block rounded-full bg-bg px-3.5 py-1.5 font-mono text-[0.78rem] text-muted">
              {e.period}
            </p>
            <h3 className="mt-5 text-[1.5rem] leading-tight">{e.degree}</h3>
            <p className="mt-1.5 font-semibold text-accent">{e.school}</p>
            <p className="mt-4 leading-relaxed text-muted">{e.detail}</p>
          </motion.article>
        ))}
      </div>

      <Reveal className="mt-10" y={20}>
        <h3 className="text-[1.3rem]">Certifications</h3>
      </Reveal>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {certs.map((c, i) => (
          <motion.li
            key={c.name}
            className="flex items-baseline justify-between gap-6 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-accent"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <span>{c.name}</span>
            <span className="shrink-0 font-mono text-[0.8rem] tabular-nums text-muted">{c.when}</span>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
