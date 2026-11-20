"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener("toast", on);
    return () => {
      window.removeEventListener("toast", on);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4"
    >
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-sm bg-ink px-5 py-3 text-sm font-medium text-bg shadow-lg"
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
