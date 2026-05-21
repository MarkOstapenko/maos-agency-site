"use client";

import { motion } from "framer-motion";
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
import { TelegramButton } from "@/components/ui/TelegramButton";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cardHover } from "@/lib/motion";
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
        className="mb-14 sm:mb-16"
      />

      <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {serviceKeys.map((key, i) => {
          const Icon = icons[i];
          const tags = t.raw(`${key}.tags`) as string[];
          const isFeatured = i === 0;

          return (
            <MotionItem key={key}>
              <motion.article
                whileHover={cardHover}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-300",
                  isFeatured
                    ? "premium-card border-primary/25 bg-gradient-to-br from-primary/[0.08] to-transparent shadow-[0_0_48px_rgb(227_42_57/0.1)] md:col-span-2 lg:col-span-1"
                    : "premium-card premium-card-hover"
                )}
              >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative p-5 sm:p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl border text-primary",
                      isFeatured
                        ? "border-primary/40 bg-primary/20 shadow-[0_0_24px_rgb(227_42_57/0.25)]"
                        : "border-primary/25 bg-primary/10"
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
                <p className="text-body mt-4 flex-1">
                  {t(`${key}.description`)}
                </p>

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
              </div>

              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                initial={false}
                whileHover={{ x: 4, y: -4 }}
              >
                <ArrowUpRight className="h-5 w-5 text-primary/60" />
              </motion.div>
              </motion.article>
            </MotionItem>
          );
        })}
      </MotionStagger>
    </div>
  );
}
