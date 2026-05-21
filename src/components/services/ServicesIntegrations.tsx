"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/motion";
import { tapScale } from "@/lib/motion";

export function ServicesIntegrations() {
  const t = useTranslations("servicesPage.integrations");
  const items = t.raw("items") as string[];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-12"
        />

        <MotionStagger className="flex flex-wrap justify-center gap-3">
          {items.map((item) => (
            <MotionItem key={item}>
              <motion.span
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={tapScale}
                className="inline-block cursor-default rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-mono text-sm text-off-white/70 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-off-white"
              >
                {item}
              </motion.span>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
