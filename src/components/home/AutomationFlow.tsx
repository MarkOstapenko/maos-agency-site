"use client";

import { motion } from "framer-motion";
import { Database, Cpu, Send, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { cardHover } from "@/lib/motion";

const steps = [
  { key: "capture" as const, icon: Database },
  { key: "process" as const, icon: Cpu },
  { key: "action" as const, icon: Send },
  { key: "insight" as const, icon: BarChart3 },
];

export function AutomationFlow() {
  const t = useTranslations("flow");

  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-32">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(227_42_57/0.08),transparent_70%)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <Container className="relative">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-16"
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />

          <MotionStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ key, icon: Icon }, i) => (
              <MotionItem key={key}>
                <motion.div whileHover={cardHover} className="premium-card premium-card-hover p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-primary/80">
                      0{i + 1}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-semibold text-off-white">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-off-white/55">
                    {t(`steps.${key}.description`)}
                  </p>
                </motion.div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </Container>
    </section>
  );
}
