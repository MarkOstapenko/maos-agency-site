"use client";

import { motion } from "framer-motion";
import { Check, Clock, Cpu, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import { ContactForm } from "@/components/contact";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { PremiumCard } from "@/components/ui/PremiumCard";

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

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <ContactForm source="about" />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-2">
            <motion.a
              href={BRAND.telegram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="premium-card premium-card-interactive premium-card-featured group relative flex-1"
            >
              <div className="premium-card-glow pointer-events-none" aria-hidden />
              <div className="card-pad relative min-w-0">
                <p className="premium-eyebrow text-primary">{t("telegram")}</p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="premium-card-icon premium-card-icon-featured h-12 w-12 sm:h-14 sm:w-14">
                    <Send className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="min-w-0">
                    <p className="break-all text-xl font-bold text-off-white sm:text-2xl">
                      {t("telegramHandle")}
                    </p>
                    <p className="text-caption mt-1">{t("telegramHint")}</p>
                  </div>
                </div>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <PremiumCard interactive className="h-full">
                <div className="card-pad-sm">
                  <Cpu className="mb-3 h-6 w-6 text-primary" />
                  <p className="premium-label">{t("service")}</p>
                  <p className="mt-2 text-base font-medium leading-snug text-off-white">
                    {t("serviceValue")}
                  </p>
                </div>
              </PremiumCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <PremiumCard interactive className="h-full">
                <div className="card-pad-sm">
                  <Clock className="mb-3 h-6 w-6 text-primary" />
                  <p className="premium-label">{t("response")}</p>
                  <p className="mt-2 font-mono text-xl font-semibold text-primary">
                    {t("responseValue")}
                  </p>
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-6 sm:mt-8"
        >
          <PremiumCard interactive={false}>
            <div className="card-pad">
              <h3 className="text-lg font-semibold text-off-white">{t("checklistTitle")}</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {checklistKeys.map((key) => (
                  <li key={key} className="text-body flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/20">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    {t(`checklist.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </PremiumCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22 }}
          className="mt-6 sm:mt-8"
        >
          <h3 className="premium-label mb-6 sm:mb-7">{t("socialTitle")}</h3>
          <SocialLinks variant="cards" />
        </motion.div>
      </Container>
    </section>
  );
}
