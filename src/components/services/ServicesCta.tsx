"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container, GlowOrb, TelegramButton } from "@/components/ui";

export function ServicesCta() {
  const t = useTranslations("servicesPage.cta");

  return (
    <section className="relative overflow-hidden pb-24 sm:pb-32">
      <GlowOrb className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2" />
      <div className="red-glow-bg pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="premium-card border-glow glow-red px-6 py-12 text-center sm:px-14 sm:py-16"
        >
          <h2 className="text-2xl font-bold tracking-tight text-off-white sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-off-white/55">{t("subtitle")}</p>
          <div className="mt-8 flex justify-center">
            <TelegramButton size="lg" className="btn-shine">
              {t("button")}
            </TelegramButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
