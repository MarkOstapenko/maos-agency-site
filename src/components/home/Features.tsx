"use client";

import { Layers, Link2, Rocket, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
const featureKeys = ["turnkey", "integration", "scale", "support"] as const;
const icons = [Layers, Link2, Rocket, Headphones];
const cardSpeeds = ["medium", "fast", "fast", "medium"] as const;

export function Features() {
  const t = useTranslations("features");

  return (
    <ParallaxSection className="section-y relative overflow-hidden">
      <SectionAtmosphere variant="features" />
      <Container className="relative">
        <Parallax speed="subtle" className="section-head">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <MotionStagger className="section-grid sm:grid-cols-2">
          {featureKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <MotionItem key={key}>
                <Parallax speed={cardSpeeds[i]}>
                  <PremiumCard as="article" className="h-full">
                    <div className="card-pad flex h-full flex-col">
                      <div className="premium-card-icon mb-5 h-11 w-11">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3>{t(`items.${key}.title`)}</h3>
                      <p className="text-body mt-3 flex-1">{t(`items.${key}.description`)}</p>
                    </div>
                  </PremiumCard>
                </Parallax>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </Container>
    </ParallaxSection>
  );
}
