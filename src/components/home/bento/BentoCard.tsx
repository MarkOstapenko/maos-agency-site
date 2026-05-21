"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { cn } from "@/lib/utils";
import { MotionItem } from "@/components/ui/motion";
import { BentoPreview, type BentoPreviewVariant } from "./BentoPreviews";

export type BentoCardKey =
  | "salesAutomation"
  | "crmIntegration"
  | "telegramBots"
  | "aiSupport"
  | "contentAutomation"
  | "analyticsDashboards"
  | "apiIntegrations"
  | "leadProcessing";

type BentoCardProps = {
  cardKey: BentoCardKey;
  icon: LucideIcon;
  preview: BentoPreviewVariant;
  featured?: boolean;
  className?: string;
};

export function BentoCard({
  cardKey,
  icon: Icon,
  preview,
  featured = false,
  className,
}: BentoCardProps) {
  const t = useTranslations("aiSystemsBento");
  const [hovered, setHovered] = useState(false);

  return (
    <MotionItem className={cn("bento-card-item h-full", className)}>
      <PremiumCard
        as="article"
        featured={featured}
        className="bento-card h-full"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div className="flex h-full flex-col">
          <div className="card-pad flex flex-1 flex-col">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div
                className={cn(
                  "premium-card-icon h-10 w-10 sm:h-11 sm:w-11",
                  featured && "premium-card-icon-featured"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="bento-card-tag">{t(`items.${cardKey}.tag`)}</span>
            </div>
            <h3
              className={cn(
                "font-semibold tracking-tight text-off-white",
                featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
              )}
            >
              {t(`items.${cardKey}.title`)}
            </h3>
            <p className="text-body mt-2.5 flex-1">
              {t(`items.${cardKey}.description`)}
            </p>
          </div>
          <div className="border-t border-white/[0.05] bg-black/20 p-4 sm:p-5">
            <BentoPreview variant={preview} active={hovered} />
          </div>
        </div>
      </PremiumCard>
    </MotionItem>
  );
}
