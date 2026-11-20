"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { EASE } from "./motion";
import { skillGroups } from "@/lib/data";

/** Each group draws its top line, slides its title in, then pops its tools in one by one. */
export default function Skills() {
  return (
    <Section id="skills" title="Toolkit" note="What I use day to day, grouped by the job it does.">
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((g, gi) => (
          <motion.div
            key={g.title}
            className="relative overflow-hidden rounded-[24px] border border-line bg-surface p-7"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -70px 0px" }}
            transition={{ duration: 0.8, delay: (gi % 2) * 0.1, ease: EASE }}
            whileHover={{ y: -4 }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2 + (gi % 2) * 0.1, ease: EASE }}
            />
            <h3 className="text-[1.4rem] leading-tight">{g.title}</h3>
            <p className="mt-1 text-[0.9rem] text-muted">{g.note}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {g.items.map((it, i) => (
                <motion.li
                  key={it}
                  className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-[0.9rem] transition-colors hover:border-accent hover:text-accent"
                  initial={{ opacity: 0, scale: 0.7, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.25 + i * 0.045 }}
                >
                  {it}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
