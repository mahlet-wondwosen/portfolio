"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin bar under the header that fills as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[3px] origin-left bg-white/80"
      style={{ scaleX }}
    />
  );
}
