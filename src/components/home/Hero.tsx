"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { HeroBackground } from "./HeroBackground";
import { FloatingAiCards } from "./FloatingAiCards";
import { DashboardPreview } from "./DashboardPreview";
import { fadeUp } from "@/lib/motion";

const trustKeys = ["uptime", "speed", "custom"] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <HeroBackground />
      <FloatingAiCards />

      <Container className="relative z-10 flex min-h-[100dvh] flex-col pt-24 pb-6 sm:pt-32 sm:pb-8 lg:pb-12">
        <div className="grid min-w-0 flex-1 items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* Copy */}
          <div className="relative z-10">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="premium-badge premium-eyebrow gap-2.5">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <Sparkles className="h-3 w-3 shrink-0" />
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 font-bold leading-[1] tracking-[-0.03em] text-off-white sm:mt-8 sm:leading-[0.95]"
            >
              <span className="block text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                {t("headlineLine1")}
              </span>
              <span className="mt-1 block text-[2rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                <span className="text-gradient-hero text-glow-red break-words">
                  {t("headlineHighlight")}
                </span>
              </span>
              <span className="mt-1 block text-3xl text-off-white/85 sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                {t("headlineLine2")}
              </span>
            </motion.h1>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="premium-accent-line mt-6 max-w-xl sm:mt-8"
            >
              <p className="text-sm leading-[1.7] text-muted sm:text-base md:text-lg">
                {t("subheadline")}
              </p>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            >
              <TelegramButton size="lg" className="w-full sm:w-auto">
                {t("cta")}
              </TelegramButton>
              <Link
                href="/services"
                className="btn-ghost-premium group w-full px-6 py-3.5 text-sm sm:w-auto sm:px-8 sm:py-4"
              >
                {t("secondary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-4 md:gap-6"
            >
              {trustKeys.map((key) => (
                <div key={key} className="premium-stat min-w-0 sm:px-4 md:px-5">
                  <p className="font-mono text-base font-semibold tracking-tight text-primary sm:text-lg md:text-xl">
                    {t(`trust.${key}.value`)}
                  </p>
                  <p className="mt-1 break-words text-[9px] leading-tight text-subtle sm:text-[10px] md:text-xs">
                    {t(`trust.${key}.label`)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-w-0 lg:pl-4"
          >
            <div className="absolute -inset-6 rounded-full bg-primary/25 blur-[80px] shadow-[0_0_120px_rgb(227_42_57/0.35)] sm:-inset-12 sm:blur-[100px]" />
            <div
              className="absolute inset-0 rounded-[2rem] border border-primary/20 opacity-60"
              style={{ animation: "hero-pulse-ring 4s ease-in-out infinite" }}
            />
            <DashboardPreview />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.a
          href="#stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mx-auto mt-8 flex flex-col items-center gap-2 text-off-white/30 transition-colors hover:text-primary/80 lg:mt-4"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
            {t("scroll")}
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}
