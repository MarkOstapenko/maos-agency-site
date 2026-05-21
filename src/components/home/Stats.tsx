"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { MotionStagger, MotionItem } from "@/components/ui/motion";

const statValues = [
  { value: "50+", key: "projects" as const },
  { value: "120+", key: "automations" as const },
  { value: "10k+", key: "hours" as const },
  { value: "100%", key: "satisfaction" as const },
];

const statSpeeds = ["fast", "medium", "medium", "fast"] as const;

export function Stats() {
  const t = useTranslations("stats");

  return (
    <ParallaxSection
      id="stats"
      className="section-band section-y-sm"
      aria-labelledby="stats-heading"
    >
      <Container>
        <h2 id="stats-heading" className="sr-only">
          {t("sectionTitle")}
        </h2>
        <MotionStagger className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {statValues.map(({ value, key }, i) => (
            <MotionItem key={key} className="text-center">
              <Parallax speed={statSpeeds[i]}>
                <dl>
                  <dt className="sr-only">{t(key)}</dt>
                  <dd className="font-mono text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-4xl lg:text-[2.75rem]">
                    {value}
                  </dd>
                  <dd className="text-caption mt-3 text-muted">{t(key)}</dd>
                </dl>
              </Parallax>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </ParallaxSection>
  );
}
