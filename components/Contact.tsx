"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { copyText, toast } from "@/lib/utils";
import { EASE, Magnetic, Reveal, SplitWords } from "./motion";
import { ArrowUpRightIcon, CopyIcon, LinkedinIcon, MailIcon, PhoneIcon, SendIcon } from "./icons";

const rows = [
  { icon: PhoneIcon, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, copy: profile.phone },
  { icon: LinkedinIcon, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, copy: profile.linkedinLabel },
];

const field =
  "peer w-full rounded-xl border border-white/20 bg-white/[0.07] px-4 pb-2.5 pt-6 text-[1rem] text-white outline-none transition-colors placeholder-transparent focus:border-white focus:bg-white/10";
const lab =
  "pointer-events-none absolute left-4 top-2 text-[0.72rem] text-[#d9cffa] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[1rem] peer-focus:top-2 peer-focus:text-[0.72rem]";

/** Round badge of text that turns slowly. */
function Badge() {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      className="h-32 w-32 text-[#d9cffa] sm:h-40 sm:w-40"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <defs>
        <path id="ring" d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" />
      </defs>
      <text className="fill-current text-[13px] font-semibold uppercase tracking-[0.22em]">
        <textPath href="#ring">Open to remote work * Open to remote work *</textPath>
      </text>
      <circle cx="80" cy="80" r="6" className="fill-white" />
    </motion.svg>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) {
      toast("Write a short message first");
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${msg}\n\n${name}${from ? `\n${from}` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast("Opening your email app");
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-[#4b3f8c] to-[#2b2560] px-5 py-24 text-white sm:py-32"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-[#8a72d6]/30 blur-[110px]"
        animate={{ x: [0, -70, 0], y: [0, 60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-[#6a4fa3]/40 blur-[110px]"
        animate={{ x: [0, 80, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-[min(1240px,100%)]">
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-[clamp(3.2rem,11vw,9rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            <SplitWords text="Let's work" />
            <br />
            <SplitWords text="together." delay={0.2} />
          </h2>
          <div className="hidden shrink-0 sm:block">
            <Badge />
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[46ch] text-[1.15rem] leading-relaxed text-[#e6e0fa]">
            I am looking for a fully remote, full-time frontend role. Tell me about the team and the
            product.
          </p>
        </Reveal>

        {/* the email, large */}
        <Reveal delay={0.1} y={30}>
          <a
            href={`mailto:${profile.email}`}
            className="group relative mt-14 inline-block max-w-full break-all text-[clamp(1.4rem,4.2vw,3.4rem)] font-semibold tracking-tight"
          >
            {profile.email}
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-[3px] w-full origin-left scale-x-[0.18] bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <span
              aria-hidden="true"
              className="ml-3 inline-block translate-y-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              <ArrowUpRightIcon className="inline h-[0.8em] w-[0.8em]" />
            </span>
          </a>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <ul className="grid gap-4">
              {[{ icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: profile.email }, ...rows].map(
                (r, i) => (
                  <motion.li
                    key={r.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-4 transition-colors hover:bg-white/10"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
                      <r.icon />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.8rem] text-[#d9cffa]">{r.label}</p>
                      <a
                        href={r.href}
                        target={r.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="block break-all text-[1.05rem] font-medium hover:underline"
                      >
                        {r.value}
                      </a>
                    </div>
                    <button
                      onClick={() => copyText(r.copy)}
                      aria-label={`Copy ${r.label.toLowerCase()}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#3c3380]"
                    >
                      <CopyIcon width={18} height={18} />
                    </button>
                  </motion.li>
                )
              )}
            </ul>
            <Reveal y={12} delay={0.2}>
              <p className="mt-6 text-[0.95rem] text-[#d9cffa]">
                Based in Addis Ababa. I reply within a day or two.
              </p>
            </Reveal>
          </div>

          <Reveal y={40}>
            <form
              onSubmit={submit}
              noValidate
              className="grid gap-4 rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8"
            >
              <h3 className="text-[1.5rem] leading-tight">Send a quick message</h3>
              <div className="relative">
                <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className={field} />
                <label htmlFor="c-name" className={lab}>Your name</label>
              </div>
              <div className="relative">
                <input id="c-email" type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your email" autoComplete="email" className={field} />
                <label htmlFor="c-email" className={lab}>Your email</label>
              </div>
              <div className="relative">
                <textarea id="c-msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message" rows={4} className={`${field} resize-none`} />
                <label htmlFor="c-msg" className={lab}>Tell me about the role or project</label>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-[#3c3380] transition-colors hover:bg-[#ebe8f7]"
                  >
                    Send by email <SendIcon width={18} height={18} />
                  </button>
                </Magnetic>
                <span className="text-sm text-[#d9cffa]">This opens your email app.</span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
