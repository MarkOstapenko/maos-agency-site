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
  featured?: boolean;
};

const SPARK_BARS = [36, 58, 44, 72, 52, 88, 64];

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
    featured: true,
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

function AnalyticsSparkline() {
  return (
    <div
      className="floating-ai-card-spark mt-3 flex h-7 items-end gap-[3px]"
      aria-hidden
    >
      {SPARK_BARS.map((h, i) => (
        <span
          key={i}
          className="floating-ai-card-spark-bar flex-1 rounded-[2px]"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function FloatingCard({
  id,
  icon: Icon,
  className,
  delay,
  duration,
  yRange,
  xRange = [0, 0, 0],
  featured = false,
}: CardConfig) {
  const t = useTranslations("hero.floatingCards");
  const isAnalytics = id === "analytics";

  return (
    <motion.div
      className={cn(
        "absolute z-[5]",
        featured ? "w-[148px] min-[480px]:w-[172px] sm:w-[188px]" : "w-[132px] min-[480px]:w-[152px] sm:w-[168px]",
        className
      )}
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: yRange,
        x: xRange,
      }}
      transition={{
        opacity: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: duration * 1.1, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div
        className={cn(
          "floating-ai-card group",
          featured && "floating-ai-card-featured"
        )}
      >
        <div className="floating-ai-card-glow" aria-hidden />
        <div className="floating-ai-card-edge" aria-hidden />

        <div className="floating-ai-card-inner relative">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "floating-ai-card-icon flex shrink-0 items-center justify-center",
                isAnalytics && "floating-ai-card-icon-accent"
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </div>

            <div className="min-w-0 flex-1">
              <p className="floating-ai-card-label">{t(`${id}.title`)}</p>
              <p className="floating-ai-card-status mt-1">
                <span
                  className="floating-ai-card-live"
                  aria-hidden
                />
                <span>{t(`${id}.subtitle`)}</span>
              </p>
            </div>
          </div>

          {isAnalytics && <AnalyticsSparkline />}
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
