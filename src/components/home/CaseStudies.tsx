"use client";

import { Database, Headphones, Sparkles, Tent } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Parallax, ParallaxSection, ParallaxScroll } from "@/components/ui/Parallax";
import { MotionStagger } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { CaseStudyCard } from "./case-study/CaseStudyCard";
import {
  AiContentPreview,
  AiSupportPreview,
  CampRegistrationPreview,
  CrmAutomationPreview,
} from "./case-study/CaseStudyPreviews";

const cases = [
  {
    key: "campBot" as const,
    icon: Tent,
    variant: "hero" as const,
    bentoClassName: "lg:col-span-8 lg:row-span-1",
    Preview: CampRegistrationPreview,
  },
  {
    key: "crmSales" as const,
    icon: Database,
    variant: "compact" as const,
    bentoClassName: "lg:col-span-4",
    Preview: CrmAutomationPreview,
  },
  {
    key: "aiSupport" as const,
    icon: Headphones,
    variant: "compact" as const,
    bentoClassName: "lg:col-span-4",
    Preview: AiSupportPreview,
  },
  {
    key: "aiContent" as const,
    icon: Sparkles,
    variant: "wide" as const,
    bentoClassName: "lg:col-span-8",
    Preview: AiContentPreview,
  },
];

export function CaseStudies() {
  const t = useTranslations("caseStudies");

  return (
    <ParallaxSection className="section-band section-y section-defer relative overflow-hidden">
      <ParallaxScroll speed="slow" className="pointer-events-none absolute inset-0">
        <div className="red-glow-spot absolute inset-0" />
        <div className="case-studies-glow pointer-events-none absolute inset-0" aria-hidden />
      </ParallaxScroll>

      <Container className="relative">
        <Parallax speed="subtle" className="mb-12 sm:mb-16">
          <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <MotionStagger className="case-bento-grid grid gap-5 sm:gap-6 lg:grid-cols-12">
          {cases.map((item, i) => (
            <Parallax
              key={item.key}
              speed={i === 0 ? "medium" : "fast"}
              className={cn("case-bento-item h-full", item.bentoClassName)}
            >
              <CaseStudyCard
                caseKey={item.key}
                icon={item.icon}
                index={i}
                variant={item.variant}
                Preview={item.Preview}
              />
            </Parallax>
          ))}
        </MotionStagger>
      </Container>
    </ParallaxSection>
  );
}
