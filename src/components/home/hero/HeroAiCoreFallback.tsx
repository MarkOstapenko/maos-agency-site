"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroAiCoreFallbackProps = {
  className?: string;
};

/** Lightweight CSS orb — mobile & no-WebGL fallback */
export function HeroAiCoreFallback({ className }: HeroAiCoreFallbackProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn("hero-ai-orb-fallback pointer-events-none select-none", className)}
      aria-hidden
    >
      <div className="hero-ai-orb-fallback-glow absolute inset-[8%] rounded-full" />
      <motion.div
        className="hero-ai-orb-fallback-core absolute inset-[22%] rounded-full"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.04, 1],
                opacity: [0.85, 1, 0.85],
              }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-ai-orb-fallback-ring absolute inset-[12%] rounded-full border border-primary/25"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <div className="hero-ai-orb-fallback-wire absolute inset-[14%] rounded-full opacity-40" />
    </div>
  );
}
