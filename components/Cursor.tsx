"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

const INTERACTIVE = "a, button, summary, [role='button'], label, input[type='range']";

/** A small dot plus a ring that follows the pointer and grows over links and buttons. */
export default function Cursor() {
  const fine = useFinePointer();
  const [hover, setHover] = useState(false);
  const [shown, setShown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
      setHover(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const leave = () => setShown(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -ml-[3px] -mt-[3px] left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, opacity: shown ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -ml-[18px] -mt-[18px] left-0 top-0 z-[200] h-9 w-9 rounded-full border border-white mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.9 : 1, opacity: shown ? 1 : 0, backgroundColor: hover ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0)" }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
