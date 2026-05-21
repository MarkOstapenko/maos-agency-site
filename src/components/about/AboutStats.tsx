"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { MotionStagger, MotionItem } from "@/components/ui/motion";

const statKeys = ["focus", "delivery", "support"] as const;

export function AboutStats() {
  const t = useTranslations("aboutPage.stats");

  return (
    <section className="relative -mt-4 pb-12 sm:pb-16">
      <Container>
        <MotionStagger className="grid grid-cols-3 gap-3 sm:gap-6">
          {statKeys.map((key) => (
            <MotionItem
              key={key}
              className="premium-stat px-2 py-4 sm:px-6 sm:py-6"
            >
              <p className="font-mono text-xl font-bold text-primary sm:text-3xl">
                {t(`${key}.value`)}
              </p>
              <p className="mt-2 text-[10px] leading-tight text-muted sm:text-xs">
                {t(`${key}.label`)}
              </p>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
