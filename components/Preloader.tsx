"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";

/** Short opening curtain: a counter runs to 100, then the panel lifts away. */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const c = animate(0, 100, {
      duration: 1,
      ease: "easeInOut",
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        setShow(false);
        document.body.style.overflow = "";
      },
    });
    return () => {
      c.stop();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#3c3380] p-6 text-white sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="text-lg font-semibold">Mahlet Wondwosen</span>
          <span className="text-[clamp(5rem,22vw,16rem)] font-bold leading-none tabular-nums tracking-tight">
            {n}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
