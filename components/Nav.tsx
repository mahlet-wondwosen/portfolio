"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { nav } from "@/lib/data";
import { scrollToId } from "@/lib/utils";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./icons";

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const [sheet, setSheet] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const dark = mounted && resolvedTheme === "dark";
  const go = (id: string) => {
    setSheet(false);
    scrollToId(id);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 bg-[#4b3f8c]/90 text-white backdrop-blur-md"
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 w-[min(1240px,100%-40px)] items-center justify-between">
        <button onClick={() => go("hero")} className="text-xl font-semibold leading-none" aria-label="Back to the top">
          Mahlet Wondwosen
        </button>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.slice(1).map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              aria-current={active === n.id ? "true" : undefined}
              className="text-[0.82rem] font-medium uppercase tracking-wider text-white/70 underline decoration-transparent decoration-2 underline-offset-[10px] transition-colors hover:text-white aria-[current=true]:text-white aria-[current=true]:decoration-white"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="grid place-items-center"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={() => setSheet((s) => !s)}
            aria-label={sheet ? "Close menu" : "Open menu"}
            aria-expanded={sheet}
            className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            {sheet ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {sheet && (
          <motion.nav
            aria-label="Mobile"
            className="overflow-hidden border-t border-white/10 bg-[#3c3380] md:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mx-auto grid w-[min(1240px,100%-40px)] gap-1 py-4">
              {nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <button onClick={() => go(n.id)} className="w-full py-2.5 text-left text-lg font-medium">
                    {n.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
