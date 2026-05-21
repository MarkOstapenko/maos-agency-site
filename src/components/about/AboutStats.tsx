"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const statKeys = ["focus", "delivery", "support"] as const;

export function AboutStats() {
  const t = useTranslations("aboutPage.stats");

  return (
    <section className="relative -mt-4 pb-12 sm:pb-16">
      <Container>
        <MotionStagger className="stats-grid stats-grid--compact">
          {statKeys.map((key) => (
            <MotionItem key={key} className="h-full">
              <article
                className={cn(
                  "stats-card group relative h-full",
                  key === "focus" && "stats-card-featured"
                )}
              >
                <div className="stats-card-sheen pointer-events-none" aria-hidden />
                <div className="stats-card-edge pointer-events-none" aria-hidden />
                <dl className="stats-card-inner relative">
                  <dt className="sr-only">{t(`${key}.label`)}</dt>
                  <dd className="stats-card-value m-0 font-mono tabular-nums">
                    {t(`${key}.value`)}
                  </dd>
                  <dd className="stats-card-label mx-auto m-0">{t(`${key}.label`)}</dd>
                </dl>
              </article>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
