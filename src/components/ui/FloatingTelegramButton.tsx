"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import { tapScale } from "@/lib/motion";

export function FloatingTelegramButton() {
  const t = useTranslations("nav");
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={BRAND.telegram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta")}
      title={t("cta")}
      data-cursor="pointer"
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={tapScale}
      className="floating-telegram group"
    >
      {!reduceMotion && (
        <span className="floating-telegram-pulse" aria-hidden />
      )}
      <span className="floating-telegram-icon">
        <Send className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className="floating-telegram-label">{t("cta")}</span>
    </motion.a>
  );
}
