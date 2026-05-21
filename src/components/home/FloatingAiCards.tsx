"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Database,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type CardConfig = {
  id: string;
  icon: LucideIcon;
  className: string;
  delay: number;
  duration: number;
  yRange: number[];
  xRange?: number[];
};

const cards: CardConfig[] = [
  {
    id: "crm",
    icon: Database,
    className: "left-[2%] top-[22%] hidden min-[480px]:block sm:left-[4%] lg:left-[6%]",
    delay: 0,
    duration: 6,
    yRange: [0, -14, 0],
  },
  {
    id: "aiReply",
    icon: Bot,
    className: "left-[8%] bottom-[28%] hidden sm:block lg:left-[10%]",
    delay: 0.8,
    duration: 7,
    yRange: [0, 12, 0],
    xRange: [0, 6, 0],
  },
  {
    id: "leads",
    icon: Sparkles,
    className: "right-[42%] top-[18%] hidden md:block",
    delay: 0.4,
    duration: 5.5,
    yRange: [0, -10, 0],
    xRange: [0, -5, 0],
  },
  {
    id: "analytics",
    icon: BarChart3,
    className: "right-[2%] top-[12%] hidden min-[480px]:block sm:right-[4%]",
    delay: 1.2,
    duration: 6.5,
    yRange: [0, -16, 0],
    xRange: [0, 8, 0],
  },
  {
    id: "neural",
    icon: BrainCircuit,
    className: "right-[6%] bottom-[32%] hidden sm:block lg:right-[8%]",
    delay: 0.6,
    duration: 8,
    yRange: [0, 14, 0],
    xRange: [0, -6, 0],
  },
];

function FloatingCard({
  id,
  icon: Icon,
  className,
  delay,
  duration,
  yRange,
  xRange = [0, 0, 0],
}: CardConfig) {
  const t = useTranslations("hero.floatingCards");

  return (
    <motion.div
      className={cn("absolute z-[5] w-[120px] min-[480px]:w-[140px] sm:w-[160px]", className)}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: yRange,
        x: xRange,
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: duration * 1.1, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div className="floating-ai-card group">
        <div className="floating-ai-card-glow" />
        <div className="relative flex items-start gap-3 p-3.5 sm:p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 shadow-[0_0_20px_rgb(227_42_57/0.25)] transition-all group-hover:border-primary/50 group-hover:shadow-[0_0_28px_rgb(227_42_57/0.4)]">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="truncate text-xs font-semibold text-off-white">
              {t(`${id}.title`)}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-primary/90">
              {t(`${id}.subtitle`)}
            </p>
          </div>
        </div>
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-dark bg-primary/90">
          <span className="h-1.5 w-1.5 rounded-full bg-off-white" />
        </div>
      </div>
    </motion.div>
  );
}

export function FloatingAiCards() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {cards.map((card) => (
        <FloatingCard key={card.id} {...card} />
      ))}
    </div>
  );
}
