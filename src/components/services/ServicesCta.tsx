"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container, GlowOrb, TelegramButton } from "@/components/ui";

export function ServicesCta() {
  const t = useTranslations("servicesPage.cta");

  return (
    <section className="section-y relative overflow-hidden pb-28 sm:pb-36">
      <GlowOrb className="left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80" />
      <div className="red-glow-bg pointer-events-none absolute inset-0 opacity-40" />

      <Container className="relative max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="cta-panel glow-red"
        >
          <h2 className="text-display-sm">{t("title")}</h2>
          <p className="text-body-lg mx-auto mt-5 max-w-lg">{t("subtitle")}</p>
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
