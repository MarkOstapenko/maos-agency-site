"use client";

import { motion, useReducedMotion } from "framer-motion";

const floatingOrbs = [
  {
    className:
      "ambient-orb ambient-orb-a left-[5%] top-[12%] h-[min(55vw,420px)] w-[min(55vw,420px)]",
    duration: 22,
    delay: 0,
    path: {
      x: [0, 48, -32, 0],
      y: [0, -36, 28, 0],
      scale: [1, 1.12, 0.94, 1],
      opacity: [0.22, 0.38, 0.26, 0.22],
    },
  },
  {
    className:
      "ambient-orb ambient-orb-b right-[-8%] top-[28%] h-[min(50vw,380px)] w-[min(50vw,380px)]",
    duration: 26,
    delay: 2,
    path: {
      x: [0, -56, 24, 0],
      y: [0, 32, -40, 0],
      scale: [1.05, 0.92, 1.08, 1.05],
      opacity: [0.18, 0.32, 0.2, 0.18],
    },
  },
  {
    className:
      "ambient-orb ambient-orb-c bottom-[8%] left-[28%] h-[min(65vw,480px)] w-[min(65vw,480px)]",
    duration: 20,
    delay: 4,
    path: {
      x: [0, 40, -48, 0],
      y: [0, -24, 20, 0],
      scale: [0.96, 1.1, 1, 0.96],
      opacity: [0.2, 0.34, 0.24, 0.2],
    },
  },
];

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="ambient-bg" aria-hidden>
      <div className="ambient-gradient-mesh" />
      <div className="ambient-gradient-veil" />

      {!reduceMotion && (
        <>
          <div className="ambient-glow-sweep" />
          <div className="ambient-glow-sweep ambient-glow-sweep-b" />

          {floatingOrbs.map(({ className, duration, delay, path }) => (
            <motion.div
              key={className}
              className={className}
              animate={path}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {reduceMotion && (
        <>
          <div className="ambient-orb ambient-orb-a left-[10%] top-[15%] h-80 w-80 opacity-25" />
          <div className="ambient-orb ambient-orb-b right-[5%] top-[35%] h-72 w-72 opacity-20" />
        </>
      )}

      <div className="ambient-edge-fade" />
    </div>
  );
}
