"use client";

import { motion } from "framer-motion";
import { Check, Clock, Cpu, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading, SocialLinks, TelegramButton } from "@/components/ui";

const checklistKeys = ["c1", "c2", "c3"] as const;

export function AboutContact() {
  const t = useTranslations("aboutPage.contact");

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <div className="red-glow-bg pointer-events-none absolute inset-0 opacity-35" />
      <Container className="relative">
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-14 sm:mb-16"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Telegram — primary card */}
          <motion.a
            href={BRAND.telegram}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="premium-card border-glow group relative overflow-hidden border-primary/25 bg-gradient-to-br from-primary/[0.1] to-transparent p-5 sm:p-10 lg:col-span-1"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-[80px] transition-opacity group-hover:opacity-100" />
            <div className="relative min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary sm:text-xs sm:tracking-[0.2em]">
                {t("telegram")}
              </p>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/20 shadow-[0_0_30px_rgb(227_42_57/0.3)] sm:h-14 sm:w-14">
                  <Send className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                </div>
                <div className="min-w-0">
                  <p className="break-all text-xl font-bold text-off-white sm:text-2xl md:text-3xl">
                    {t("telegramHandle")}
                  </p>
                  <p className="text-caption mt-1">{t("telegramHint")}</p>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Info cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="premium-card p-5 sm:p-6"
            >
              <Cpu className="mb-3 h-6 w-6 text-primary" />
              <p className="premium-label">
                {t("service")}
              </p>
              <p className="mt-2 text-base font-medium leading-snug text-off-white">
                {t("serviceValue")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="premium-card p-5 sm:p-6"
            >
              <Clock className="mb-3 h-6 w-6 text-primary" />
              <p className="premium-label">
                {t("response")}
              </p>
              <p className="mt-2 font-mono text-xl font-semibold text-primary">
                {t("responseValue")}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-8"
        >
          <h3 className="premium-label mb-5">
            {t("socialTitle")}
          </h3>
          <SocialLinks variant="cards" />
        </motion.div>

        {/* Checklist + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="premium-card mt-8 grid gap-6 p-5 sm:gap-8 sm:p-10 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-off-white">{t("checklistTitle")}</h3>
            <ul className="mt-5 space-y-3">
              {checklistKeys.map((key) => (
                <li key={key} className="text-body flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {t(`checklist.${key}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="text-body max-w-sm lg:text-right">
              {t("subtitle")}
            </p>
            <TelegramButton size="lg" className="btn-shine w-full sm:w-auto">
              {t("cta")}
            </TelegramButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
