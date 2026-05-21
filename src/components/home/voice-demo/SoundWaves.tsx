"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { VoiceDemoPhase } from "@/lib/voice-demo";

const BAR_COUNT = 12;

type SoundWavesProps = {
  phase: VoiceDemoPhase;
  className?: string;
};

export function SoundWaves({ phase, className }: SoundWavesProps) {
  const reduceMotion = useReducedMotion();
  const active = phase === "listening";
  const subtle = phase === "processing";

  if (reduceMotion) {
    return (
      <div className={cn("voice-sound-waves flex items-center justify-center gap-1", className)}>
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "voice-sound-bar w-1 rounded-full bg-primary/40",
              active && "bg-primary/70"
            )}
            style={{ height: active ? 16 + (i % 3) * 8 : 8 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("voice-sound-waves flex items-center justify-center gap-1 sm:gap-1.5", className)}>
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          className="voice-sound-bar w-1 rounded-full bg-primary sm:w-1.5"
          animate={
            active
              ? {
                  height: [10, 28 + (i % 4) * 6, 12, 32 - (i % 3) * 4, 10],
                  opacity: [0.45, 1, 0.55, 0.95, 0.45],
                }
              : subtle
                ? {
                    height: [8, 14, 8],
                    opacity: [0.25, 0.5, 0.25],
                  }
                : {
                    height: 6 + (i % 2) * 2,
                    opacity: 0.2,
                  }
          }
          transition={{
            duration: active ? 0.9 + (i % 5) * 0.08 : 1.4,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
