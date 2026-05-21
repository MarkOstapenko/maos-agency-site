"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function AboutStory() {
  const t = useTranslations("aboutPage.story");

  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.2fr] lg:gap-14 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="premium-card border-glow relative overflow-hidden border-primary/15 p-6 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-[60px]" />
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-2xl font-bold text-primary">
                M
              </div>
              <p className="text-xl font-bold text-off-white">{BRAND.name}</p>
              <p className="mt-2 font-mono text-sm text-primary">{BRAND.telegramHandle}</p>
              <div className="mt-8 flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgb(227_42_57/0.8)]" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-off-white sm:text-3xl">{t("title")}</h2>

            <blockquote className="mt-6 flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/[0.06] p-4 sm:flex-row sm:gap-4 sm:p-5">
              <Quote className="h-7 w-7 shrink-0 text-primary/60 sm:h-8 sm:w-8" />
              <p className="text-sm italic leading-relaxed text-off-white/70 sm:text-base md:text-lg">
                {t("quote")}
              </p>
            </blockquote>

            <div className="mt-8 space-y-4 text-base leading-relaxed text-off-white/55">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
