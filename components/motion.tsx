"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children once, when they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  x = 0,
  lift = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  lift?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      whileHover={lift ? { y: -8 } : undefined}
      viewport={{ once: true, margin: "0px 0px -90px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Headline whose words rise out of a mask one after another. */
export function SplitWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden="true" className="mr-[0.26em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Pulls its child a little toward the pointer. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Number that counts up when it scrolls into view. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}
