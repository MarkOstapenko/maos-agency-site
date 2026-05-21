"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Database, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { cn } from "@/lib/utils";

type FloatChipProps = {
  className: string;
  delay: number;
  duration: number;
  children: React.ReactNode;
};

function FloatChip({ className, delay, duration, children }: FloatChipProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("about-brand-float pointer-events-none absolute z-20", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={
        reduceMotion
          ? undefined
          : {
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }
      }
    >
      <span
        className={cn(!reduceMotion && "about-brand-float-motion")}
        style={
          reduceMotion
            ? undefined
            : {
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }
        }
      >
        {children}
      </span>
    </motion.div>
  );
}

export function AboutBrandCard() {
  const t = useTranslations("aboutPage.story.card");

  return (
    <PremiumCard featured className="about-brand-card h-full overflow-hidden">
      <div className="about-brand-card-ambient pointer-events-none" aria-hidden />
      <div className="about-brand-card-mesh pointer-events-none" aria-hidden />
      <div className="about-brand-card-grid pointer-events-none" aria-hidden />

      <FloatChip className="right-4 top-4 sm:right-5 sm:top-5" delay={0.2} duration={5.5}>
        <span className="about-brand-chip about-brand-chip-status">
          <span className="about-brand-status-dot" aria-hidden />
          {t("status")}
        </span>
      </FloatChip>

      <FloatChip className="left-3 top-[38%] sm:left-4" delay={0.5} duration={6.2}>
        <span className="about-brand-chip">
          <Database className="h-3.5 w-3.5 text-primary/90" strokeWidth={1.75} aria-hidden />
          {t("chipCrm")}
        </span>
      </FloatChip>

      <FloatChip className="right-3 bottom-[32%] sm:right-4" delay={0.35} duration={5}>
        <span className="about-brand-chip about-brand-chip-featured">
          <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} aria-hidden />
          {t("chipLeads")}
        </span>
      </FloatChip>

      <FloatChip className="left-4 bottom-16 sm:left-5 sm:bottom-[4.5rem]" delay={0.65} duration={6.8}>
        <span className="about-brand-chip">
          <Bot className="h-3.5 w-3.5 text-primary/90" strokeWidth={1.75} aria-hidden />
          {t("chipAi")}
        </span>
      </FloatChip>

      <div className="about-brand-card-body card-pad-lg relative z-10 flex min-h-[17.5rem] flex-col justify-between sm:min-h-[20rem]">
        <div>
          <div className="brand-logo-mark-wrap about-brand-logo-wrap">
            <BrandLogo size={52} className="h-[3.25rem] w-[3.25rem]" />
          </div>
          <p className="about-brand-name mt-6">{BRAND.name}</p>
          <a
            href={BRAND.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="about-brand-handle mt-2 inline-flex items-center gap-1.5"
          >
            <Zap className="h-3.5 w-3.5 text-primary" strokeWidth={2} aria-hidden />
            {BRAND.telegramHandle}
          </a>
          <p className="about-brand-tagline mt-4">{t("tagline")}</p>
        </div>

        <div className="about-brand-metrics mt-8 grid grid-cols-3 gap-2 sm:gap-3">
          {(
            [
              { value: t("metricUptime"), label: t("metricUptimeLabel") },
              { value: t("metricProjects"), label: t("metricProjectsLabel") },
              { value: t("metricResponse"), label: t("metricResponseLabel") },
            ] as const
          ).map((item) => (
            <div key={item.label} className="about-brand-metric">
              <p className="about-brand-metric-value">{item.value}</p>
              <p className="about-brand-metric-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </PremiumCard>
  );
}
