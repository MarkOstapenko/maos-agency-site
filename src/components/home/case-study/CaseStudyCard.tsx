"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { cn } from "@/lib/utils";
import { MotionItem } from "@/components/ui/motion";

export type CaseKey = "campBot" | "crmSales" | "aiSupport" | "aiContent";

export type CaseBentoVariant = "hero" | "compact" | "wide";

type CaseStudyCardProps = {
  caseKey: CaseKey;
  icon: LucideIcon;
  index: number;
  variant: CaseBentoVariant;
  Preview: React.ComponentType<{ active?: boolean }>;
};

function CaseBlock({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("case-study-block", className)}>
      <p className="case-study-label">{label}</p>
      <p className="case-study-text">{children}</p>
    </div>
  );
}

export function CaseStudyCard({
  caseKey,
  icon: Icon,
  index,
  variant,
  Preview,
}: CaseStudyCardProps) {
  const t = useTranslations("caseStudies");
  const [hovered, setHovered] = useState(false);
  const technologies = t.raw(`items.${caseKey}.technologies`) as string[];
  const isHero = variant === "hero";

  return (
    <MotionItem className="h-full">
      <PremiumCard
        as="article"
        featured={isHero}
        className="case-study-card h-full"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div
          className={cn(
            "flex flex-1 flex-col",
            isHero && "xl:grid xl:grid-cols-[1fr_minmax(200px,38%)] xl:gap-0"
          )}
        >
          <div className="card-pad flex flex-1 flex-col">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={hovered ? { rotate: 4, scale: 1.05 } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "premium-card-icon h-11 w-11 sm:h-12 sm:w-12",
                    isHero && "premium-card-icon-featured"
                  )}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <div>
                  <p className="premium-eyebrow text-primary/90">
                    {t(`items.${caseKey}.category`)}
                  </p>
                  <span className="font-mono text-[10px] text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <motion.div
                animate={hovered ? { x: 4, y: -4, opacity: 1 } : { opacity: 0.4 }}
                transition={{ duration: 0.35 }}
                className="rounded-lg border border-primary/20 bg-primary/10 p-1.5 text-primary"
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            </div>

            <h3
              className={cn(
                "font-semibold tracking-tight text-off-white",
                isHero ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              )}
            >
              {t(`items.${caseKey}.title`)}
            </h3>

            <div
              className={cn(
                "mt-5 grid flex-1 gap-4",
                variant === "wide" ? "sm:grid-cols-2 sm:gap-5" : "gap-3.5"
              )}
            >
              <CaseBlock label={t("labels.problem")}>
                {t(`items.${caseKey}.problem`)}
              </CaseBlock>
              <CaseBlock label={t("labels.solution")}>
                {t(`items.${caseKey}.solution`)}
              </CaseBlock>
            </div>

            <motion.div
              className="case-study-result mt-5"
              animate={
                hovered
                  ? {
                      borderColor: "rgb(227 42 57 / 0.45)",
                      boxShadow: "0 0 32px rgb(227 42 57 / 0.12)",
                    }
                  : {
                      borderColor: "rgb(227 42 57 / 0.2)",
                      boxShadow: "0 0 0 transparent",
                    }
              }
              transition={{ duration: 0.4 }}
            >
              <p className="case-study-label text-primary/80">{t("labels.result")}</p>
              <p className="mt-1.5 text-sm font-medium leading-snug text-off-white sm:text-base">
                {t(`items.${caseKey}.result`)}
              </p>
            </motion.div>

            <div className="mt-5">
              <p className="case-study-label mb-2">{t("labels.technologies")}</p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tag) => (
                  <span key={tag} className="case-study-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="mt-6"
              animate={hovered ? { x: 0 } : { x: 0 }}
            >
              <Link
                href="#contact"
                className="case-study-cta group/cta inline-flex items-center gap-2"
              >
                <span>{t("viewCase")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          <div
            className={cn(
              "border-t border-white/6 bg-black/30 p-5 sm:p-6",
              isHero && "xl:border-l xl:border-t-0 xl:border-white/6"
            )}
          >
            <Preview active={hovered} />
          </div>
        </div>
      </PremiumCard>
    </MotionItem>
  );
}
