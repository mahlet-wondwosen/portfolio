"use client";

import { education, profile } from "@/lib/data";
import Head from "./Head";
import { motion } from "framer-motion";
import { CountUp, Reveal, SplitWords } from "./motion";
import { MailIcon } from "./icons";

const tools = ["React", "Next.js", "TypeScript", "Turborepo"];

/** A bento grid of rounded tiles instead of the editorial rail used elsewhere. */
export default function About() {
  return (
    <section id="about" className="scroll-mt-16 px-5 py-20 sm:py-28">
      <div className="mx-auto w-[min(1240px,100%)]">
        <Head title="About me" note={`${profile.location}, UTC+3`} />

        <div className="mt-10 grid gap-5 md:grid-cols-12">
          <Reveal x={-60} y={0} lift className="flex flex-col justify-between gap-10 rounded-[28px] bg-[#3c3380] p-8 text-white sm:p-10 md:col-span-7">
            <p className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium leading-snug">
              <SplitWords text="I make financial software feel simple, fast and safe to use." delay={0.2} />
            </p>
            <p className="max-w-[60ch] text-[0.98rem] leading-relaxed text-[#d9d2f5]">
              Senior frontend developer at EagleLion Systems Technology since March 2025, building
              six banking products in one shared Turborepo monorepo with backend, QA and platform
              teams. Earlier I worked at Binget Group, Charis Technologies and CREAVERS Service PLC
              on web and mobile applications and a hospital management system.
            </p>
          </Reveal>

          <Reveal x={60} y={0} delay={0.1} lift className="flex flex-col justify-between gap-10 rounded-[28px] bg-[#cfc6f2] p-8 text-[#2b2560] sm:p-9 md:col-span-5">
            <p className="text-[0.95rem] font-medium text-[#4b3f8c]">My research</p>
            <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] font-semibold leading-snug">
              MSc thesis on keeping distributed Scrum teams in sync with event-driven middleware,
              with retries and delivery guarantees built in.
            </p>
          </Reveal>

          <Reveal delay={0.1} lift className="flex flex-col justify-between gap-8 rounded-[28px] bg-surface p-8 md:col-span-4">
            <p className="text-[0.95rem] font-medium text-muted">Daily tools</p>
            <ul className="flex flex-wrap gap-2.5">
              {tools.map((t, i) => (
                <motion.li
                  key={t}
                  className="rounded-full bg-bg px-4 py-2 text-[0.88rem] font-medium"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.5 + i * 0.1 }}
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} lift className="flex flex-col justify-between gap-8 rounded-[28px] bg-surface p-8 md:col-span-4">
            <p className="text-[0.95rem] font-medium text-muted">Education</p>
            <div>
              <p className="text-[1.25rem] font-semibold leading-snug">MSc, {education[0].school}</p>
              <p className="mt-1.5 text-[0.9rem] text-muted">BSc, {education[1].school}</p>
            </div>
          </Reveal>

          <Reveal delay={0.3} lift className="flex flex-col justify-between gap-8 rounded-[28px] bg-[#6a4fa3] p-8 text-white md:col-span-4">
            <p className="flex items-center gap-2 text-[0.95rem] font-medium text-[#e0d8fa]"><MailIcon width={18} height={18} /> Say hello</p>
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-[1.2rem] font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                {profile.email}
              </a>
              <p className="mt-1.5 text-[0.9rem] text-[#e0d8fa]">Open to fully remote roles</p>
            </div>
          </Reveal>
        </div>

        <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-10 text-center sm:text-left">
          {[
            { n: 4, l: "Years in production" },
            { n: 6, l: "Banking products shipped" },
            { n: 4, l: "Roles in Addis Ababa" },
          ].map((x) => (
            <motion.div
              key={x.l}
              className="flex flex-col-reverse"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <dt className="mt-2 text-[0.9rem] text-muted">{x.l}</dt>
              <dd className="text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-none tracking-tight text-accent">
                <CountUp to={x.n} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
