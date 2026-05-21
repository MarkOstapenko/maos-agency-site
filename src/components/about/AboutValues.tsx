"use client";

import { Code2, Zap, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { MotionStagger, MotionItem } from "@/components/ui/motion";

const valueKeys = ["quality", "speed", "partnership"] as const;
const valueIcons = [Code2, Zap, Handshake];

export function AboutValues() {
  const t = useTranslations("aboutPage.values");

  return (
    <section className="section-band section-y relative">
      <div className="red-glow-spot pointer-events-none absolute inset-0" />
      <Container className="relative">
        <SectionHeading title={t("title")} className="section-head" />

        <MotionStagger className="section-grid md:grid-cols-3">
          {valueKeys.map((key, i) => {
            const Icon = valueIcons[i];
            return (
              <MotionItem key={key}>
                <PremiumCard as="article" className="h-full">
                  <div className="card-pad">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="premium-card-icon h-12 w-12 transition-transform duration-500 group-hover:rotate-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs text-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-off-white">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-body mt-4">{t(`items.${key}.description`)}</p>
                  </div>
                </PremiumCard>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </Container>
    </section>
  );
}
