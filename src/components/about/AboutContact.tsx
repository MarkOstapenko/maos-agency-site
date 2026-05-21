"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { TelegramContactCard } from "./TelegramContactCard";

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
          className="section-head"
        />

        <div className="contact-layout-grid">
          <div className="contact-layout-form min-w-0">
            <ContactForm source="about" />
          </div>

          <div className="contact-layout-aside min-w-0">
            <TelegramContactCard />
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
