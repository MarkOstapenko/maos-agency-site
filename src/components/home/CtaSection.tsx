"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { scaleIn } from "@/lib/motion";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="section-y relative overflow-hidden">
      <GlowOrb className="left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80" />

      <Container className="relative max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={scaleIn}
          className="cta-panel glow-red"
        >
          <h2 className="text-display-sm">{t("title")}</h2>
          <div className="premium-divider mx-auto mt-6 max-w-[8rem]" />
          <p className="text-body-lg mx-auto mt-6 max-w-md">{t("subtitle")}</p>
          <div className="mt-9 flex justify-center sm:mt-10">
            <TelegramButton size="lg" className="btn-shine">
              {t("button")}
            </TelegramButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
