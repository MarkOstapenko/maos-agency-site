"use client";

import { motion } from "framer-motion";
import { Compass, PenTool, Rocket, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cardHover } from "@/lib/motion";

const stepKeys = ["discover", "design", "build", "scale"] as const;
const stepIcons = [Compass, PenTool, Rocket, TrendingUp];

export function ServicesProcess() {
  const t = useTranslations("servicesPage.process");

  return (
    <section className="section-y relative overflow-hidden border-y border-white/[0.05] bg-black">
      <div className="red-glow-spot pointer-events-none absolute inset-0" />
      <Container className="relative">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} className="mb-14 sm:mb-16" />

        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />

          <MotionStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stepKeys.map((key, i) => {
              const Icon = stepIcons[i];
              return (
                <MotionItem key={key}>
                  <motion.div
                    whileHover={cardHover}
                    className="premium-card premium-card-hover p-6"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-sm text-primary">0{i + 1}</span>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-off-white">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="text-body mt-3">
                      {t(`steps.${key}.description`)}
                    </p>
                  </motion.div>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </div>
      </Container>
    </section>
  );
}
