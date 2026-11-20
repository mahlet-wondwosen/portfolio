"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { nav, profile } from "@/lib/data";
import { copyText, scrollToId } from "@/lib/utils";

type Cmd = { label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const cmds: Cmd[] = useMemo(
    () => [
      ...nav.map((n) => ({
        label: `Go to ${n.label}`,
        hint: "section",
        run: () => scrollToId(n.id),
      })),
      {
        label: "Toggle light and dark theme",
        hint: "action",
        run: () => setTheme(resolvedTheme === "light" ? "dark" : "light"),
      },
      { label: "Copy email address", hint: "action", run: () => copyText(profile.email) },
      { label: "Copy phone number", hint: "action", run: () => copyText(profile.phone) },
      {
        label: "Open LinkedIn",
        hint: "link",
        run: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      },
    ],
    [resolvedTheme, setTheme]
  );

  const shown = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const run = (c?: Cmd) => {
    if (!c) return;
    close();
    setTimeout(c.run, 120);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-bg/60 px-4 pt-[14vh] backdrop-blur-md"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
        >
          <motion.div
            initial={{ y: -16, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSel((s) => Math.min(shown.length - 1, s + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSel((s) => Math.max(0, s - 1));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  run(shown[sel]);
                }
              }}
              placeholder="Jump to a section or run an action"
              aria-label="Search commands"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted"
            />
            <ul className="max-h-80 overflow-auto p-2">
              {shown.length === 0 && (
                <li className="px-3 py-3 text-sm text-muted">No match. Try another word.</li>
              )}
              {shown.map((c, i) => (
                <li key={c.label}>
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => run(c)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[0.95rem] ${
                      i === sel ? "bg-line/60" : ""
                    }`}
                  >
                    {c.label}
                    <span className="font-mono text-[0.7rem] text-muted">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
