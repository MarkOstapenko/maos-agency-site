"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ParallaxScroll } from "@/components/ui/Parallax";

export function HeroBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <ParallaxScroll speed="bg" className="absolute inset-0">
        <div className="red-glow-bg absolute inset-0 opacity-80" />
        <div className="red-glow-spot absolute inset-0" />
      </ParallaxScroll>

      <ParallaxScroll speed="slow" className="absolute inset-0">
        <div className="gradient-mesh absolute inset-0 opacity-70" />
      </ParallaxScroll>

      <div className="hero-vignette absolute inset-0" />

      <ParallaxScroll speed="medium" className="absolute inset-0">
        <div
          className="grid-pattern absolute inset-0 opacity-20"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 70%)",
          }}
        />
      </ParallaxScroll>

      <motion.div
        className="hero-beam absolute left-0 right-0 top-[38%] h-px"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <ParallaxScroll speed="subtle" className="absolute inset-0 flex justify-center">
        <div className="h-full w-px bg-gradient-to-b from-primary/20 via-primary/8 to-transparent" />
      </ParallaxScroll>

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute left-[8%] top-[20%] h-32 w-px bg-gradient-to-b from-primary/35 to-transparent sm:left-[12%]"
            animate={{ opacity: [0.15, 0.5, 0.15], scaleY: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-[8%] top-[35%] h-48 w-px bg-gradient-to-b from-primary/28 to-transparent sm:right-[12%]"
            animate={{ opacity: [0.2, 0.55, 0.2], scaleY: [1, 0.9, 1] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black via-black/95 to-transparent" />
    </div>
  );
}
