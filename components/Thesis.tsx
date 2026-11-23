"use client";

import { motion } from "framer-motion";
import { CountUp, EASE, Reveal, SplitWords } from "./motion";

const results = [
  { to: 29.5, prefix: "+", suffix: "%", label: "Sprint goal completion" },
  { to: 56.0, prefix: "−", suffix: "%", label: "Blocker resolution time" },
  { to: 30.0, prefix: "+", suffix: "%", label: "Team satisfaction" },
  { to: 22.5, prefix: "+", suffix: "%", label: "Ceremony attendance" },
  { to: 57.6, prefix: "−", suffix: "%", label: "Async response time" },
];

const pipeline = [
  { t: "Source tools", d: "Jira, Slack, Zoom and Confluence send events by webhook, stream or polling." },
  { t: "Protocol adapters", d: "Each payload is normalized into one Scrum event format, the CSEM." },
  { t: "Durable log", d: "Events are written to NATS JetStream first, so nothing is lost mid-flight." },
  { t: "Routing engine", d: "Ceremony-aware rules enrich, filter and route within a fixed time budget." },
  { t: "Channel adapters", d: "Events reach the right tool in its own format, with SLOs enforced." },
  { t: "The team", d: "A blocker raised in stand-up reaches the people who can fix it in seconds." },
];

const support = [
  "CSEM schema registry",
  "OpenTelemetry observability",
  "Retry at 10, 20, 40 and 80 seconds, then dead-letter queue",
  "Topology-as-Code in Git",
];

const metrics = [
  { name: "Goal completion", unit: "%", base: 61, post: 74 },
  { name: "Blocker resolution", unit: " h", base: 18.4, post: 8.1 },
  { name: "Satisfaction (1 to 5)", unit: "", base: 2.9, post: 3.77 },
  { name: "Async response", unit: " h", base: 6.2, post: 2.63 },
  { name: "Attendance", unit: "%", base: 71, post: 87 },
];

const ceremonies = [
  { n: "Sprint planning", mode: "Synchronous", tools: "Video + tracker", slo: "30 s" },
  { n: "Daily Scrum", mode: "Sync and async", tools: "Chat + tracker", slo: "30 s / 5 min" },
  { n: "Sprint review", mode: "Synchronous", tools: "Video + docs", slo: "30 s" },
  { n: "Sprint retrospective", mode: "Synchronous", tools: "Video + docs", slo: "30 s" },
  { n: "Backlog refinement", mode: "Asynchronous", tools: "Tracker + chat", slo: "5 min" },
  { n: "Inter-sprint coordination", mode: "Asynchronous", tools: "Chat + tracker", slo: "5 min" },
];

/** Team A goal completion by sprint, with Team B's flat range as a band. */
function Trajectory() {
  const pts = [
    { x: 60, y: 156, v: 61, s: "S0" },
    { x: 160, y: 128, v: 68, s: "S1" },
    { x: 260, y: 104, v: 74, s: "S2" },
    { x: 360, y: 84, v: 79, s: "S3" },
  ];
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 420 250" className="block h-auto w-full" role="img" aria-label="Team A goal completion rose from 61 percent to 79 percent over four sprints while Team B stayed between 63 and 66 percent">
      {[60, 70, 80, 90].map((g, i) => (
        <g key={g}>
          <line x1="40" x2="400" y1={160 - i * 40} y2={160 - i * 40} className="stroke-line" strokeWidth="1" strokeDasharray="3 5" />
          <text x="30" y={164 - i * 40} textAnchor="end" className="fill-muted text-[10px]">{g}%</text>
        </g>
      ))}
      <motion.rect
        x="60" y="136" width="300" height="12" rx="6" className="fill-line"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{ transformOrigin: "60px 142px" }}
      />
      <text x="364" y="132" textAnchor="end" className="fill-muted text-[10px]">Team B, control: 63 to 66%</text>
      <motion.path
        d={d} fill="none" className="stroke-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 } as any}
        whileInView={{ pathLength: 1 } as any}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
      />
      {pts.map((p, i) => (
        <g key={p.s}>
          <motion.circle
            cx={p.x} cy={p.y} r="6" className="fill-bg stroke-accent" strokeWidth="3"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.4, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[12px] font-semibold">{p.v}%</text>
          <text x={p.x} y="190" textAnchor="middle" className="fill-muted text-[11px]">{p.s}</text>
        </g>
      ))}
      <text x="60" y="222" className="fill-accent text-[11px] font-medium">Team A, with COIF</text>
    </svg>
  );
}

function MetricBars() {
  return (
    <ul className="grid gap-6">
      {metrics.map((m, i) => {
        const max = Math.max(m.base, m.post);
        return (
          <li key={m.name}>
            <p className="mb-2 flex items-baseline justify-between text-[0.92rem]">
              <span>{m.name}</span>
              <span className="tabular-nums text-muted">
                {m.base}
                {m.unit} to <b className="font-semibold text-ink">{m.post}{m.unit}</b>
              </span>
            </p>
            <div className="grid gap-1.5">
              <motion.div
                className="h-2 origin-left rounded-full bg-line"
                style={{ width: `${(m.base / max) * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
              />
              <motion.div
                className="h-2 origin-left rounded-full bg-accent"
                style={{ width: `${(m.post / max) * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.25 + i * 0.1, ease: EASE }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function Thesis() {
  return (
    <section id="lab" className="dark relative scroll-mt-16 overflow-hidden bg-bg px-5 py-24 text-ink sm:py-32">
      {/* slow drifting glows */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#6a4fa3]/30 blur-[120px]"
        animate={{ x: [0, 90, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[40%] h-[560px] w-[560px] rounded-full bg-[#4b3f8c]/40 blur-[130px]"
        animate={{ x: [0, -80, 0], y: [0, -70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-[min(1240px,100%)]">
        <Reveal y={16}>
          <p className="inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-[0.82rem] text-muted">
            <span className="h-2 w-2 animate-ring rounded-full bg-accent" aria-hidden="true" />
            MSc thesis, Addis Ababa University
          </p>
        </Reveal>

        {/* watermark behind heading */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-6 left-0 flex items-center gap-6 pointer-events-none"
          >
            {/* COIF letters */}
            <div className="flex">
              {["C","O","I","F"].map((l, i) => (
                <motion.span
                  key={l}
                  className="select-none text-[clamp(5rem,18vw,14rem)] font-black leading-none tracking-tighter text-white/60"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            {/* full words — same height as COIF, stacked equally */}
            <div className="flex flex-col justify-between" style={{ height: "calc(clamp(5rem,18vw,14rem) / 2)" }}>
              {[
                "Communication",
                "Optimization",
                "Integration",
                "Framework",
              ].map((word, i) => (
                <motion.span
                  key={word}
                  className="select-none text-[clamp(0.55rem,1.1vw,0.95rem)] font-bold uppercase tracking-[0.18em] text-white/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          <h2 className="relative mt-7 max-w-[16ch] text-[clamp(2.8rem,7.4vw,6.4rem)] font-bold leading-[1] tracking-[-0.03em]">
            <SplitWords text="Scrum teams that stay in sync." />
          </h2>
        </div>

        <Reveal delay={0.15} className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <p className="max-w-[58ch] text-[1.12rem] leading-relaxed text-muted">
            Distributed teams coordinate through tools that do not know a blocker in a Daily Scrum is more
            urgent than a documentation edit. My thesis, supervised by Ayalew Belay (PhD), built and tested
            COIF: an event-driven layer that routes each message by the urgency of the ceremony it belongs
            to, with time limits it must keep.
          </p>
          <p className="text-[0.95rem] leading-relaxed text-muted">
            <span className="font-semibold text-ink">A Framework to Optimize Communication in Distributed
            Scrum Teams: Design and Evaluation.</span>{" "}
            Tested over ten weeks with two Ethiopian teams: one used COIF for three sprints, the other
            kept its usual tools as a control.
          </p>
        </Reveal>

        {/* headline results */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {results.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.08} y={24}>
              <p className="text-[clamp(2.2rem,4.2vw,3.4rem)] font-semibold leading-none tracking-tight text-accent tabular-nums">
                <CountUp to={r.to} decimals={1} prefix={r.prefix} suffix={r.suffix} />
              </p>
              <p className="mt-3 text-[0.9rem] text-muted">{r.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal y={10}>
          <p className="mt-8 text-[0.85rem] text-muted">
            All five changes were statistically significant (p below 0.05), with large effect sizes
            (Cohen&apos;s d between 1.88 and 2.34).
          </p>
        </Reveal>

        {/* how it works */}
        <div className="mt-24">
          <Reveal y={20}>
            <h3 className="text-[clamp(1.6rem,3vw,2.2rem)]">How the framework moves a message</h3>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
            {pipeline.map((s, i) => (
              <div key={s.t} className="contents">
                <motion.div
                  className="flex-1 rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                  whileHover={{ y: -6 }}
                >
                  <p className="text-[0.95rem] font-semibold">{s.t}</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{s.d}</p>
                </motion.div>
                {i < pipeline.length - 1 && (
                  <div className="hidden w-8 shrink-0 self-center lg:block">
                    <div className="flow" style={{ ["--fd" as string]: `${i * 0.35}s` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-4 flex flex-wrap gap-2.5">
            {support.map((s) => (
              <span key={s} className="rounded-full border border-dashed border-line px-4 py-2 text-[0.82rem] text-muted">
                {s}
              </span>
            ))}
          </Reveal>
        </div>

        {/* evidence */}
        <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal y={20}>
              <h3 className="text-[clamp(1.6rem,3vw,2.2rem)]">Goal completion, sprint by sprint</h3>
              <p className="mt-3 max-w-[48ch] text-[0.95rem] text-muted">
                Team A improved every sprint. Team B, working as usual, stayed flat, which rules out a
                simple &ldquo;being observed&rdquo; effect.
              </p>
            </Reveal>
            <div className="mt-8 rounded-2xl border border-line bg-surface/60 p-5">
              <Trajectory />
            </div>
          </div>
          <div>
            <Reveal y={20}>
              <h3 className="text-[clamp(1.6rem,3vw,2.2rem)]">Before and after, Team A</h3>
              <p className="mt-3 max-w-[48ch] text-[0.95rem] text-muted">
                Grey is the baseline sprint, violet is the average after COIF. Each metric has its own scale.
              </p>
            </Reveal>
            <div className="mt-8">
              <MetricBars />
            </div>
          </div>
        </div>

        {/* ceremonies */}
        <div className="mt-24">
          <Reveal y={20}>
            <h3 className="text-[clamp(1.6rem,3vw,2.2rem)]">A time limit for every ceremony</h3>
          </Reveal>
          <ul className="mt-8 border-t border-line">
            {ceremonies.map((c, i) => (
              <motion.li
                key={c.n}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line px-2 py-5 transition-colors hover:bg-surface/70 sm:grid-cols-[1.2fr_1fr_1fr_auto] sm:px-4"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              >
                <span className="text-[1.15rem] font-semibold transition-transform duration-300 group-hover:translate-x-2">{c.n}</span>
                <span className="hidden text-muted sm:block">{c.mode}</span>
                <span className="hidden text-muted sm:block">{c.tools}</span>
                <span className="justify-self-end rounded-full bg-accent px-4 py-1.5 text-[0.85rem] font-semibold tabular-nums text-bg">
                  {c.slo}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* findings */}
        <div className="mt-24 grid gap-5 md:grid-cols-3">
          <Reveal className="rounded-3xl bg-[#cfc6f2] p-8 text-[#2b2560] md:col-span-2" y={34}>
            <p className="text-[0.9rem] font-medium text-[#4b3f8c]">An unexpected finding</p>
            <p className="mt-6 text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-snug">
              Four of the six control-team members used Telegram as their main messaging tool. All 27
              earlier studies I reviewed assumed Slack or Microsoft Teams.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-between gap-8 rounded-3xl border border-line bg-surface/60 p-8" y={34}>
            <p className="text-[0.9rem] font-medium text-muted">What it handled</p>
            <div className="grid gap-5">
              <div>
                <p className="text-[2.6rem] font-semibold leading-none tracking-tight text-accent">
                  <CountUp to={620} />
                </p>
                <p className="mt-1.5 text-[0.88rem] text-muted">events across the study</p>
              </div>
              <div>
                <p className="text-[2.6rem] font-semibold leading-none tracking-tight text-accent">
                  <CountUp to={11.2} decimals={1} suffix=" s" />
                </p>
                <p className="mt-1.5 text-[0.88rem] text-muted">mean live delivery time, against a 30 s limit</p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
