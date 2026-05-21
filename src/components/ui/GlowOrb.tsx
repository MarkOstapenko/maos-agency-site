"use client";

import { motion } from "framer-motion";

export function GlowOrb({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full bg-primary/30 blur-[120px] ${className}`}
      animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
