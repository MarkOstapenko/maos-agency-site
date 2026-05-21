"use client";

import { motion, useReducedMotion } from "framer-motion";

const blocks = [
  { className: "left-[4%] top-[12%] hidden sm:block", delay: 0 },
  { className: "right-[6%] top-[18%] hidden md:block", delay: 0.6 },
  { className: "left-[10%] bottom-[14%] hidden lg:block", delay: 1.2 },
  { className: "right-[8%] bottom-[20%] hidden lg:block", delay: 0.3 },
];

export function WorkflowDecor() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {blocks.map(({ className, delay }, i) => (
        <motion.div
          key={i}
          className={`workflow-float-block absolute ${className}`}
          animate={{ y: [0, -10, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 7 + i, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <span className="workflow-float-dot" />
          <span className="workflow-float-line" />
        </motion.div>
      ))}
    </div>
  );
}
