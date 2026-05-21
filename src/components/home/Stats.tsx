"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { ParallaxSection } from "@/components/ui/Parallax";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const statValues = [
  { value: "50+", key: "projects" as const },
  { value: "120+", key: "automations" as const },
  { value: "10k+", key: "hours" as const },
  { value: "100%", key: "satisfaction" as const },
] as const;

type StatCardProps = {
  index: number;
  value: string;
  label: string;
  featured?: boolean;
};

function StatCard({ index, value, label, featured }: StatCardProps) {
  return (
    <article
      className={cn(
        "stats-card group relative h-full",
        featured && "stats-card-featured"
      )}
    >
      <div className="stats-card-sheen pointer-events-none" aria-hidden />
      <div className="stats-card-edge pointer-events-none" aria-hidden />
      <div className="stats-card-noise pointer-events-none" aria-hidden />

      <dl className="stats-card-inner relative">
        <dt className="sr-only">{label}</dt>
        <span className="stats-card-index font-mono" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <dd className="stats-card-value m-0 font-mono tabular-nums">{value}</dd>
        <dd className="stats-card-label m-0">{label}</dd>
      </dl>
    </article>
  );
}

export function Stats() {
  const t = useTranslations("stats");

  return (
    <ParallaxSection
      id="stats"
      className="stats-section section-band section-y-sm relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      <SectionAtmosphere variant="default" />
      <div className="stats-section-ambient pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative">
        <div className="stats-section-header section-head mx-auto max-w-lg text-center">
          <p className="premium-eyebrow text-primary/75">{t("sectionTitle")}</p>
          <h2 id="stats-heading" className="sr-only">
            {t("sectionTitle")}
          </h2>
        </div>

        <MotionStagger className="stats-grid">
          {statValues.map(({ value, key }, i) => (
            <MotionItem key={key} className="h-full">
              <StatCard
                index={i}
                value={value}
                label={t(key)}
                featured={i === 0}
              />
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </ParallaxSection>
  );
}
