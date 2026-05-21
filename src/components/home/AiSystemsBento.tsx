"use client";

import {
  BarChart3,
  Database,
  Headphones,
  MessageSquare,
  Plug,
  Sparkles,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Parallax, ParallaxSection, ParallaxScroll } from "@/components/ui/Parallax";
import { MotionStagger } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { BentoCard, type BentoCardKey } from "./bento/BentoCard";
import type { BentoPreviewVariant } from "./bento/BentoPreviews";

const cards: {
  key: BentoCardKey;
  icon: typeof TrendingUp;
  preview: BentoPreviewVariant;
  featured?: boolean;
  className: string;
}[] = [
  {
    key: "salesAutomation",
    icon: TrendingUp,
    preview: "sales",
    featured: true,
    className: "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  },
  {
    key: "crmIntegration",
    icon: Database,
    preview: "crm",
    className: "lg:col-span-5",
  },
  {
    key: "telegramBots",
    icon: MessageSquare,
    preview: "telegram",
    className: "sm:col-span-1 lg:col-span-4",
  },
  {
    key: "aiSupport",
    icon: Headphones,
    preview: "support",
    className: "sm:col-span-1 lg:col-span-4",
  },
  {
    key: "contentAutomation",
    icon: Sparkles,
    preview: "content",
    className: "sm:col-span-2 lg:col-span-4",
  },
  {
    key: "analyticsDashboards",
    icon: BarChart3,
    preview: "analytics",
    featured: true,
    className: "sm:col-span-2 lg:col-span-6",
  },
  {
    key: "apiIntegrations",
    icon: Plug,
    preview: "api",
    className: "lg:col-span-3",
  },
  {
    key: "leadProcessing",
    icon: UserPlus,
    preview: "leads",
    className: "lg:col-span-3",
  },
];

export function AiSystemsBento() {
  const t = useTranslations("aiSystemsBento");

  return (
    <ParallaxSection id="ai-systems" className="section-y section-defer relative overflow-hidden">
      <ParallaxScroll speed="slow" className="pointer-events-none absolute inset-0">
        <div className="bento-systems-glow absolute inset-0" aria-hidden />
      </ParallaxScroll>

      <Container className="relative">
        <Parallax speed="subtle" className="mb-12 sm:mb-14">
          <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <MotionStagger
          className={cn(
            "bento-systems-grid grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-5",
            "lg:auto-rows-[minmax(11rem,auto)]"
          )}
        >
          {cards.map((item) => (
            <Parallax key={item.key} speed="fast" className={item.className}>
              <BentoCard
                cardKey={item.key}
                icon={item.icon}
                preview={item.preview}
                featured={item.featured}
                className="h-full min-h-[11rem]"
              />
            </Parallax>
          ))}
        </MotionStagger>
      </Container>
    </ParallaxSection>
  );
}
