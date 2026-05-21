"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { AboutBrandCard } from "./AboutBrandCard";

export function AboutStory() {
  const t = useTranslations("aboutPage.story");

  return (
    <section className="about-story-section section-y-sm relative overflow-hidden">
      <SectionAtmosphere variant="story" />
      <div className="about-story-glow pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative">
        <div className="about-story-grid grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_1.15fr] lg:gap-14 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <AboutBrandCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="about-story-content min-w-0"
          >
            <p className="premium-eyebrow text-primary/80">{t("eyebrow")}</p>
            <h2 className="text-display-sm mt-4">{t("title")}</h2>

            <blockquote className="about-story-quote premium-card-inset mt-7 flex gap-4 p-5 sm:mt-8 sm:p-6">
              <Quote
                className="mt-0.5 h-7 w-7 shrink-0 text-primary/50 sm:h-8 sm:w-8"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="text-base leading-[1.65] text-off-white/88 sm:text-[1.0625rem] sm:leading-[1.6]">
                {t("quote")}
              </p>
            </blockquote>

            <div className="premium-divider mt-8 sm:mt-9" />

            <div className="mt-8 space-y-6 sm:mt-9">
              <p className="text-body-lg">{t("p1")}</p>
              <p className="text-body">{t("p2")}</p>
              <p className="text-body">{t("p3")}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
