"use client";

import { Layers, Link2, Rocket, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const featureKeys = ["turnkey", "integration", "scale", "support"] as const;
const icons = [Layers, Link2, Rocket, Headphones];
const cardSpeeds = ["medium", "fast", "fast", "medium"] as const;

export function Features() {
  const t = useTranslations("features");

  return (
    <ParallaxSection className="section-y">
      <Container>
        <Parallax speed="subtle" className="mb-14 sm:mb-16">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <MotionStagger className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {featureKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <MotionItem key={key}>
                <Parallax speed={cardSpeeds[i]}>
                  <PremiumCard as="article" className="h-full">
                    <div className="card-pad flex h-full flex-col">
                      <div
                        className={cn(
                          "premium-card-icon mb-6 h-12 w-12",
                          "transition-transform duration-500 group-hover:rotate-3"
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-off-white sm:text-xl">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="text-body mt-4 flex-1">{t(`items.${key}.description`)}</p>
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
