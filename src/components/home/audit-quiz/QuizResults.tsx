"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import type { AuditResult } from "@/lib/ai-audit-quiz";
import { cn } from "@/lib/utils";

type QuizResultsProps = {
  result: AuditResult;
  onRestart: () => void;
};

export function QuizResults({ result, onRestart }: QuizResultsProps) {
  const t = useTranslations("aiAuditQuiz");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="premium-eyebrow text-primary/90">{t("results.badge")}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-off-white sm:text-2xl">
            {t("results.title")}
          </h3>
        </div>
        <div className="quiz-readiness-score rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-center">
          <p className="font-mono text-2xl font-semibold text-primary tabular-nums">
            {result.readinessScore}%
          </p>
          <p className="text-caption mt-0.5">{t("results.readiness")}</p>
        </div>
      </div>

      <div className="quiz-summary-panel mt-6 rounded-2xl border border-white/8 bg-black/35 p-5 sm:p-6">
        <p className="case-study-label">{t("results.summaryTitle")}</p>
        <ul className="mt-4 space-y-3">
          {result.summaryKeys.map((key, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
              className="flex gap-3 text-sm leading-relaxed text-off-white/90"
            >
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {t(`summary.${key}`)}
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="case-study-label mt-8">{t("results.recommendationsTitle")}</p>
      <div className="mt-4 grid gap-3 sm:gap-4">
        {result.recommendations.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.1, duration: 0.4 }}
            className={cn(
              "quiz-recommendation rounded-xl border border-white/8 bg-black/30 p-4 sm:p-5",
              i === 0 && "border-primary/25 bg-primary/5"
            )}
          >
            <p className="font-mono text-[10px] text-primary">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-1.5 text-base font-semibold text-off-white">
              {t(`recommendations.${id}.title`)}
            </h4>
            <p className="text-body mt-2 text-sm leading-relaxed">
              {t(`recommendations.${id}.description`)}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="quiz-cta-panel mt-8 rounded-2xl border border-primary/20 bg-primary/8 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div>
          <p className="text-sm font-medium text-off-white">{t("results.ctaTitle")}</p>
          <p className="text-body mt-1.5 text-sm">{t("results.ctaSubtitle")}</p>
        </div>
        <a
          href={BRAND.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium btn-shine mt-4 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold sm:mt-0 sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" />
          {t("results.ctaButton")}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <p className="text-caption mt-4 text-center sm:text-left">
        {t("results.ctaHandle", { handle: BRAND.telegramHandle })}
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="text-caption mx-auto mt-6 inline-flex items-center gap-2 underline-offset-4 hover:text-off-white hover:underline sm:mx-0"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {t("results.restart")}
      </button>
    </motion.div>
  );
}
