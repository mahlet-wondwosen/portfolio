"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import Head from "./Head";
import { EASE } from "./motion";
import { experience } from "@/lib/data";

type Job = (typeof experience)[number];

function JobItem({ job, current }: { job: Job; current: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });

  return (
    <div ref={ref} className="relative pb-14 last:pb-0">
      <motion.span
        aria-hidden="true"
        className={`absolute -left-10 top-[7px] h-4 w-4 rounded-full border-2 transition-colors duration-500 ${
          seen ? "border-accent bg-accent" : "border-line bg-bg"
        }`}
        animate={{ scale: seen ? 1 : 0.7 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -90px 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="font-mono text-[0.78rem] uppercase tracking-wide text-muted">
          {job.period}
          {current && (
            <span className="ml-3 inline-flex items-center gap-2 text-accent">
              <span className="h-1.5 w-1.5 animate-ring rounded-full bg-accent" aria-hidden="true" />
              Current
            </span>
          )}
        </p>
        <h3 className="mb-0.5 mt-1.5 text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight">{job.role}</h3>
        <p className="mb-3.5 font-semibold text-accent">
          {job.company}, {job.place}
        </p>
        <ul className="grid max-w-[75ch] list-disc gap-2 pl-[18px] text-[1.02rem] leading-relaxed text-muted marker:text-gold">
          {job.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });

  return (
    <section id="experience" className="scroll-mt-16 border-t border-line px-5 py-20 sm:py-28">
      <div className="mx-auto w-[min(1240px,100%)]">
        <Head title="Experience" note="Four roles, 2022 to present" />

        <div ref={ref} className="relative mt-12 pl-10">
          <span aria-hidden="true" className="absolute bottom-1.5 left-[7px] top-1.5 w-0.5 bg-line" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-1.5 left-[7px] top-1.5 w-0.5 origin-top bg-accent"
            style={{ scaleY }}
          />
          {experience.map((job, i) => (
            <JobItem key={job.role + job.company} job={job} current={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
