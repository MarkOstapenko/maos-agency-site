"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Red glow layers */}
      <div className="red-glow-bg absolute inset-0" />

      <motion.div
        className="absolute left-1/2 top-1/4 h-[min(90vw,700px)] w-[min(90vw,900px)] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute -left-32 bottom-1/4 h-[450px] w-[450px] rounded-full bg-primary/15 blur-[90px]"
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[300px] w-[80%] max-w-4xl -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="red-glow-spot absolute inset-0" />
      <div className="gradient-mesh absolute inset-0 opacity-90" />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-noise absolute inset-0 opacity-60 mix-blend-overlay" />

      <div
        className="grid-pattern absolute inset-0 opacity-25"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 70%)",
        }}
      />

      <motion.div
        className="hero-beam absolute left-0 right-0 top-[38%] h-px shadow-[0_0_40px_rgb(227_42_57/0.5)]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent shadow-[0_0_30px_rgb(227_42_57/0.3)]" />

      <motion.div
        className="absolute left-[8%] top-[20%] h-32 w-px bg-gradient-to-b from-primary/50 to-transparent sm:left-[12%]"
        animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[8%] top-[35%] h-48 w-px bg-gradient-to-b from-primary/40 to-transparent sm:right-[12%]"
        animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [1, 0.85, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent" />
    </div>
  );
}
