"use client";

import { motion } from "framer-motion";
import { Layers, Link2, Rocket, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cardHover } from "@/lib/motion";

const featureKeys = ["turnkey", "integration", "scale", "support"] as const;
const icons = [Layers, Link2, Rocket, Headphones];

export function Features() {
  const t = useTranslations("features");

  return (
    <section className="section-y">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} className="mb-14 sm:mb-16" />

        <MotionStagger className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {featureKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <MotionItem key={key}>
                <motion.article
                  whileHover={cardHover}
                  className="premium-card premium-card-hover group h-full p-5 sm:p-8"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.05 }}
                    transition={{ duration: 0.25 }}
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-lg font-semibold tracking-tight text-off-white sm:text-xl">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-body mt-4">
                    {t(`items.${key}.description`)}
                  </p>
                </motion.article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </Container>
    </section>
  );
}
