"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, BrainCircuit, Sparkles, Zap } from "lucide-react";
import type { VisualAnchorPosition, VisualAnchorType } from "@/lib/section-atmosphere";
import { cn } from "@/lib/utils";

const POSITION_CLASS: Record<VisualAnchorPosition, string> = {
  "top-right": "section-anchor--tr",
  "top-left": "section-anchor--tl",
  "center-right": "section-anchor--cr",
  "bottom-left": "section-anchor--bl",
  "bottom-right": "section-anchor--br",
};

const SPARK = [38, 62, 48, 74, 52];

type VisualAnchorProps = {
  type: VisualAnchorType;
  position: VisualAnchorPosition;
  delay?: number;
};

export function VisualAnchor({ type, position, delay = 0 }: VisualAnchorProps) {
  const reduceMotion = useReducedMotion();

  const floatAnim = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: [0, -6, 0] };

  const floatTransition = reduceMotion
    ? { opacity: { duration: 0.5, delay } }
    : {
        opacity: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        y: {
          duration: 7 + delay,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay,
        },
      };

  return (
    <motion.div
      className={cn("section-anchor", POSITION_CLASS[position])}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <motion.div animate={floatAnim} transition={floatTransition}>
        {type === "holo-metric" && <HoloMetric />}
        {type === "holo-live" && <HoloLive />}
        {type === "holo-spark" && <HoloSpark />}
        {type === "float-chip" && <FloatChip />}
      </motion.div>
    </motion.div>
  );
}

function HoloMetric() {
  return (
    <div className="holo-ui-chip holo-ui-chip--metric">
      <div className="holo-ui-chip-shine" />
      <div className="holo-ui-chip-inner flex items-center gap-2.5">
        <span className="holo-ui-icon flex h-8 w-8 items-center justify-center">
          <Activity className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <span className="holo-ui-label block">Throughput</span>
          <span className="holo-ui-value font-mono tabular-nums">98.4%</span>
        </div>
      </div>
    </div>
  );
}

function HoloLive() {
  return (
    <div className="holo-ui-chip holo-ui-chip--live">
      <div className="holo-ui-chip-shine" />
      <div className="holo-ui-chip-inner">
        <div className="flex items-center gap-2">
          <span className="holo-ui-live-dot" />
          <span className="holo-ui-label">Neural link</span>
        </div>
        <div className="holo-ui-bars mt-2.5 flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="holo-ui-bar" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HoloSpark() {
  return (
    <div className="holo-ui-chip holo-ui-chip--spark">
      <div className="holo-ui-chip-shine" />
      <div className="holo-ui-chip-inner">
        <div className="flex items-center justify-between gap-3">
          <span className="holo-ui-icon flex h-7 w-7 items-center justify-center">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
          <span className="holo-ui-label">Signal</span>
        </div>
        <div className="holo-ui-spark mt-2.5 flex h-6 items-end gap-[2px]">
          {SPARK.map((h, i) => (
            <span
              key={i}
              className="holo-ui-spark-bar flex-1 rounded-[2px]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatChip() {
  return (
    <div className="floating-ai-card floating-ai-card-featured section-anchor-float-card">
      <div className="floating-ai-card-glow" />
      <div className="floating-ai-card-edge" />
      <div className="floating-ai-card-inner py-3">
        <div className="flex items-center gap-2.5">
          <div className="floating-ai-card-icon floating-ai-card-icon-accent flex h-8 w-8 items-center justify-center">
            <BrainCircuit className="h-3.5 w-3.5" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="floating-ai-card-label">AI Core</p>
            <p className="floating-ai-card-status mt-0.5">
              <span className="floating-ai-card-live" />
              <Zap className="h-2.5 w-2.5 shrink-0 text-primary/80" strokeWidth={2} />
              <span>Active</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
