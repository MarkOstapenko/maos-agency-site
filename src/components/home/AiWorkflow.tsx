"use client";

import {
  Search,
  PenTool,
  Rocket,
  Plug,
  FlaskConical,
  LifeBuoy,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Parallax, ParallaxSection, ParallaxScroll } from "@/components/ui/Parallax";
import { MotionStagger } from "@/components/ui/motion";
import { WorkflowConnector } from "./workflow/WorkflowConnector";
import { WorkflowDecor } from "./workflow/WorkflowDecor";
import {
  WorkflowStepCard,
  type WorkflowStepKey,
} from "./workflow/WorkflowStepCard";

const steps: { key: WorkflowStepKey; icon: typeof Search }[] = [
  { key: "analysis", icon: Search },
  { key: "design", icon: PenTool },
  { key: "mvp", icon: Rocket },
  { key: "integrations", icon: Plug },
  { key: "testing", icon: FlaskConical },
  { key: "launch", icon: LifeBuoy },
];

export function AiWorkflow() {
  const t = useTranslations("aiWorkflow");

  return (
    <ParallaxSection className="section-band section-y section-defer relative overflow-hidden">
      <ParallaxScroll speed="slow" className="pointer-events-none absolute inset-0">
        <div className="workflow-section-glow absolute inset-0" />
      </ParallaxScroll>

      <WorkflowDecor />

      <Container className="relative">
        <Parallax speed="subtle" className="mb-12 sm:mb-16">
          <SectionHeading
            badge={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Parallax>

        {/* Desktop / tablet grid */}
        <div className="relative hidden md:block">
          <WorkflowConnector variant="desktop" />
          <MotionStagger className="relative grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
            {steps.map(({ key, icon }, i) => (
              <WorkflowStepCard
                key={key}
                stepKey={key}
                index={i}
                icon={icon}
                layout="grid"
              />
            ))}
          </MotionStagger>
        </div>

        {/* Mobile timeline */}
        <div className="relative md:hidden">
          <WorkflowConnector variant="mobile" />
          <MotionStagger className="relative flex flex-col gap-5 sm:gap-6">
            {steps.map(({ key, icon }, i) => (
              <WorkflowStepCard
                key={key}
                stepKey={key}
                index={i}
                icon={icon}
                layout="timeline"
              />
            ))}
          </MotionStagger>
        </div>
      </Container>
    </ParallaxSection>
  );
}
