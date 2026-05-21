"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type QuizStepPanelProps = {
  stepId: string;
  title: string;
  subtitle?: string;
  options: readonly string[];
  selected: string | undefined;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function QuizStepPanel({
  stepId,
  title,
  subtitle,
  options,
  selected,
  onSelect,
  onNext,
  onBack,
  isFirst,
  isLast,
}: QuizStepPanelProps) {
  const t = useTranslations("aiAuditQuiz");
  const groupLabel = `${title}${subtitle ? ` — ${subtitle}` : ""}`;

  return (
    <motion.div
      key={stepId}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <h3 className="text-xl font-semibold tracking-tight text-off-white sm:text-2xl">
        {title}
      </h3>
      {subtitle && <p className="text-body mt-2 text-sm sm:text-base">{subtitle}</p>}

      <div
        role="radiogroup"
        aria-label={groupLabel}
        className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3"
      >
        {options.map((option) => {
          const isSelected = selected === option;
          const optionId = `quiz-${stepId}-${option}`;
          return (
            <button
              key={option}
              id={optionId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option)}
              className={cn(
                "quiz-option group text-left",
                isSelected && "quiz-option-selected"
              )}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium text-off-white sm:text-[15px]">
                  {t(`options.${stepId}.${option}`)}
                </span>
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    isSelected
                      ? "border-primary bg-primary text-off-white"
                      : "border-white/15 bg-transparent text-transparent"
                  )}
                  aria-hidden
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {!isFirst && onBack ? (
          <button type="button" onClick={onBack} className="btn-ghost-premium px-5 py-2.5 text-sm">
            {t("actions.back")}
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        <motion.button
          type="button"
          disabled={!selected}
          onClick={onNext}
          whileHover={selected ? { scale: 1.02, y: -1 } : undefined}
          whileTap={selected ? { scale: 0.98 } : undefined}
          className="btn-premium btn-shine w-full px-8 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45 sm:ml-auto sm:w-auto"
        >
          {isLast ? t("actions.finish") : t("actions.next")}
        </motion.button>
      </div>
    </motion.div>
  );
}
