"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { QUIZ_STEPS, type QuizStepId } from "@/lib/ai-audit-quiz";
import { cn } from "@/lib/utils";

type QuizProgressProps = {
  currentStep: number;
  totalSteps: number;
  activeStepId?: QuizStepId;
  complete?: boolean;
};

export function QuizProgress({
  currentStep,
  totalSteps,
  activeStepId,
  complete = false,
}: QuizProgressProps) {
  const t = useTranslations("aiAuditQuiz");
  const progress = complete ? 100 : ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="quiz-progress">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {complete ? t("progress.done") : t("progress.step", { current: currentStep + 1, total: totalSteps })}
        </p>
        <span className="font-mono text-xs text-primary tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="quiz-progress-track h-1.5 overflow-hidden rounded-full">
        <motion.div
          className="quiz-progress-fill h-full rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
      </div>
      {!complete && activeStepId && (
        <p className="text-caption mt-2 text-subtle">{t(`steps.${activeStepId}.title`)}</p>
      )}
      <div className="mt-4 hidden gap-1.5 sm:flex">
        {QUIZ_STEPS.map((step, i) => (
          <div
            key={step}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i < currentStep || complete
                ? "bg-primary/70"
                : i === currentStep
                  ? "bg-primary/35"
                  : "bg-white/10"
            )}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
