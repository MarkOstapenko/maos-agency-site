"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { scaleIn } from "@/lib/motion";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <GlowOrb className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={scaleIn}
          className="premium-card border-glow glow-red px-5 py-12 text-center sm:px-14 sm:py-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("title")}
          </motion.h2>
          <div className="premium-divider mx-auto mt-5 max-w-xs" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-muted"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex justify-center"
          >
            <TelegramButton size="lg">{t("button")}</TelegramButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
