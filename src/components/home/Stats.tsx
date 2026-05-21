"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { MotionStagger, MotionItem } from "@/components/ui/motion";

const statValues = [
  { value: "50+", key: "projects" as const },
  { value: "120+", key: "automations" as const },
  { value: "10k+", key: "hours" as const },
  { value: "100%", key: "satisfaction" as const },
];

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section id="stats" className="section-band section-y-sm">
      <Container>
        <MotionStagger className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {statValues.map(({ value, key }) => (
            <MotionItem key={key} className="text-center">
              <p className="font-mono text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-4xl lg:text-[2.75rem]">
                {value}
              </p>
              <p className="text-caption mt-3">{t(key)}</p>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
