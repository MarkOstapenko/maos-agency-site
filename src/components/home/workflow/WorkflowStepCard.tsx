"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { cn } from "@/lib/utils";
import { MotionItem } from "@/components/ui/motion";

export type WorkflowStepKey =
  | "analysis"
  | "design"
  | "mvp"
  | "integrations"
  | "testing"
  | "launch";

type WorkflowStepCardProps = {
  stepKey: WorkflowStepKey;
  index: number;
  icon: LucideIcon;
  layout?: "grid" | "timeline";
};

export function WorkflowStepCard({
  stepKey,
  index,
  icon: Icon,
  layout = "grid",
}: WorkflowStepCardProps) {
  const t = useTranslations("aiWorkflow");
  const [active, setActive] = useState(false);

  return (
    <MotionItem
      className={cn(layout === "timeline" && "relative pl-12 sm:pl-14")}
    >
      {layout === "timeline" && (
        <span className="workflow-step-node absolute left-0 top-8 flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 font-mono text-xs font-semibold text-primary shadow-[0_0_20px_rgb(227_42_57/0.2)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <PremiumCard
        as="article"
        className="h-full"
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
      >
        <div className="card-pad-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            {layout === "grid" && (
              <span className="workflow-step-badge font-mono text-xs font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <motion.div
              animate={active ? { rotate: 3, scale: 1.04 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "premium-card-icon h-10 w-10 sm:h-11 sm:w-11",
                layout === "timeline" && "ml-auto"
              )}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
          </div>
          <h3 className="text-base font-semibold tracking-tight text-off-white sm:text-lg">
            {t(`steps.${stepKey}.title`)}
          </h3>
          <p className="text-body mt-2 text-sm leading-relaxed">
            {t(`steps.${stepKey}.description`)}
          </p>
          <p className="text-caption mt-3 font-mono text-[10px] uppercase tracking-wider text-primary/70">
            {t(`steps.${stepKey}.tag`)}
          </p>
        </div>
      </PremiumCard>
    </MotionItem>
  );
}
