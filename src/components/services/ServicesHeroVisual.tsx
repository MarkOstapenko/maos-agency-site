"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Database,
  Workflow,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SPARK = [42, 68, 52, 78, 58, 84, 64];

type ServicesHeroVisualProps = {
  compact?: boolean;
};

export function ServicesHeroVisual({ compact = false }: ServicesHeroVisualProps) {
  const t = useTranslations("servicesPage.hero.visual");
  const reduceMotion = useReducedMotion();

  const floatTransition = (delay: number, duration: number) =>
    reduceMotion
      ? { opacity: { duration: 0.5, delay } }
      : {
          opacity: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
          y: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <div
      className={cn(
        "services-hero-visual relative mx-auto w-full",
        compact ? "max-w-md" : "max-w-[28rem] lg:max-w-none"
      )}
      aria-hidden
    >
      <div className="services-hero-visual-ambient" />
      <div className="services-hero-visual-orbit" />
      <div className="services-hero-visual-scan" />

      <motion.div
        className="services-hero-visual-float services-hero-visual-float--tl"
        initial={{ opacity: 0, y: 10 }}
        animate={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: [0, -8, 0] }
        }
        transition={floatTransition(0.15, 6.5)}
      >
        <div className="floating-ai-card">
          <div className="floating-ai-card-glow" />
          <div className="floating-ai-card-edge" />
          <div className="floating-ai-card-inner">
            <div className="flex items-center gap-2.5">
              <div className="floating-ai-card-icon flex h-8 w-8 items-center justify-center">
                <Bot className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="floating-ai-card-label">{t("floatAutomation")}</p>
                <p className="floating-ai-card-status mt-0.5">
                  <span className="floating-ai-card-live" />
                  <span>{t("floatAutomationStatus")}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="services-hero-visual-float services-hero-visual-float--br"
        initial={{ opacity: 0, y: 10 }}
        animate={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: [0, 10, 0], x: [0, 4, 0] }
        }
        transition={
          reduceMotion
            ? { opacity: { duration: 0.5, delay: 0.25 } }
            : {
                opacity: { duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              }
        }
      >
        <div className="floating-ai-card floating-ai-card-featured">
          <div className="floating-ai-card-glow" />
          <div className="floating-ai-card-edge" />
          <div className="floating-ai-card-inner py-3">
            <div className="flex items-center gap-2.5">
              <div className="floating-ai-card-icon floating-ai-card-icon-accent flex h-8 w-8 items-center justify-center">
                <Database className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="floating-ai-card-label">{t("floatSync")}</p>
                <p className="floating-ai-card-status mt-0.5">
                  <span className="floating-ai-card-live" />
                  <span>{t("floatSyncStatus")}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="services-hero-visual-hub"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -5, 0] }}
        transition={{
          opacity: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          y: reduceMotion
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
        }}
      >
        <div className="services-hero-visual-hub-glow" />
        <div className="services-hero-visual-hub-inner premium-card premium-card-featured relative overflow-hidden p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-2">
                <Workflow className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.75} />
                <p className="premium-eyebrow text-primary/90">{t("hubTitle")}</p>
              </div>
              <p className="text-caption text-subtle">{t("hubSubtitle")}</p>
            </div>
            <span className="services-hero-visual-status shrink-0">
              <span className="services-hero-visual-status-dot" />
              {t("status")}
            </span>
          </div>

          <div className="services-hero-visual-pipeline" role="presentation">
            {[0, 1, 2].map((i) => (
              <span key={i} className="services-hero-visual-pipeline-step">
                <span
                  className={cn(
                    "services-hero-visual-pipeline-node",
                    i === 1 && "services-hero-visual-pipeline-node--active"
                  )}
                />
                {i < 2 && (
                  <span className="services-hero-visual-pipeline-line">
                    <span className="services-hero-visual-pipeline-progress" />
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="services-hero-visual-metric">
              <p className="services-hero-visual-metric-label">{t("metric1")}</p>
              <p className="services-hero-visual-metric-value font-mono tabular-nums">
                {t("metric1Value")}
              </p>
            </div>
            <div className="services-hero-visual-metric services-hero-visual-metric--accent">
              <p className="services-hero-visual-metric-label">{t("metric2")}</p>
              <p className="services-hero-visual-metric-value font-mono tabular-nums">
                {t("metric2Value")}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/[0.05] pt-3">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-subtle">
              <Zap className="h-3 w-3 text-primary/80" strokeWidth={1.75} />
              <span>{t("processing")}</span>
            </div>
            <div className="services-hero-visual-spark flex h-6 flex-1 max-w-[7rem] items-end gap-[2px]">
              {SPARK.map((h, i) => (
                <span
                  key={i}
                  className="services-hero-visual-spark-bar flex-1 rounded-[2px]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
