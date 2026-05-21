"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GlowOrb({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full bg-primary/20 blur-[100px] sm:blur-[120px] ${className}`}
      animate={
        reduceMotion
          ? { opacity: 0.35 }
          : { opacity: [0.28, 0.42, 0.28], scale: [1, 1.04, 1] }
      }
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
