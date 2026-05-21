"use client";

import {
  TrendingUp,
  Inbox,
  MessageSquare,
  Workflow,
  Code2,
  LineChart,
  ArrowUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const serviceKeys = [
  "sales",
  "leads",
  "communication",
  "crm",
  "custom",
  "consulting",
] as const;

const icons = [TrendingUp, Inbox, MessageSquare, Workflow, Code2, LineChart];

export function ServicesGrid() {
  const t = useTranslations("servicesPage.items");
  const heading = useTranslations("servicesPage");

  return (
    <div>
      <SectionHeading
        title={heading("gridTitle")}
        subtitle={heading("gridSubtitle")}
        align="left"
        className="section-head"
      />

      <MotionStagger className="section-grid sm:grid-cols-2 lg:grid-cols-3">
        {serviceKeys.map((key, i) => {
          const Icon = icons[i];
          const tags = t.raw(`${key}.tags`) as string[];
          const isFeatured = i === 0;

          return (
            <MotionItem key={key} className={isFeatured ? "md:col-span-2 lg:col-span-1" : undefined}>
              <PremiumCard as="article" featured={isFeatured} className="h-full">
                <div className="card-pad relative flex h-full flex-col">
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "premium-card-icon h-14 w-14 transition-transform duration-500 group-hover:rotate-3",
                        isFeatured && "premium-card-icon-featured"
                      )}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-mono text-xs text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-off-white sm:text-xl">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-body mt-4 flex-1">{t(`${key}.description`)}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isFeatured && (
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <TelegramButton size="sm" className="w-full sm:w-auto">
                        {heading("cta.button")}
                      </TelegramButton>
                    </div>
                  )}

                  <ArrowUpRight className="absolute bottom-5 right-5 h-5 w-5 text-primary/0 transition-all duration-500 group-hover:text-primary/50 sm:bottom-6 sm:right-6" />
                </div>
              </PremiumCard>
            </MotionItem>
          );
        })}
      </MotionStagger>
    </div>
  );
}
