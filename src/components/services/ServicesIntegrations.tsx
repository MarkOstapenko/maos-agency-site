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
    <section className="section-y">
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
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={tapScale}
                className="pill-tag"
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
