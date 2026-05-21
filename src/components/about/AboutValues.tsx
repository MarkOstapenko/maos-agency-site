"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cardHover } from "@/lib/motion";

const valueKeys = ["quality", "speed", "partnership"] as const;
const valueIcons = [Code2, Zap, Handshake];

export function AboutValues() {
  const t = useTranslations("aboutPage.values");

  return (
    <section className="section-band section-y relative">
      <div className="red-glow-spot pointer-events-none absolute inset-0" />
      <Container className="relative">
        <SectionHeading title={t("title")} className="mb-14 sm:mb-16" />

        <MotionStagger className="grid gap-6 md:grid-cols-3">
          {valueKeys.map((key, i) => {
            const Icon = valueIcons[i];
            return (
              <MotionItem key={key}>
                <motion.div
                  whileHover={cardHover}
                  className="premium-card premium-card-hover h-full p-6 sm:p-8"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.05 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <span className="font-mono text-xs text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-off-white">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-body mt-4">
                    {t(`items.${key}.description`)}
                  </p>
                </motion.div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </Container>
    </section>
  );
}
