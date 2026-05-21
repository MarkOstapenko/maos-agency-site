"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { HeroBackground } from "./HeroBackground";
import { HeroAiCore } from "./hero/HeroAiCore";
import { FloatingAiCards } from "./FloatingAiCards";
import { fadeUp } from "@/lib/motion";

const DashboardPreview = dynamic(
  () =>
    import("./DashboardPreview").then((m) => ({
      default: m.DashboardPreview,
    })),
  {
    loading: () => (
      <div
        className="premium-card premium-card-featured min-h-[220px] w-full sm:min-h-[260px]"
        aria-hidden
      />
    ),
  }
);

const trustKeys = ["uptime", "speed", "custom"] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <ParallaxSection className="relative min-h-[100dvh] overflow-hidden">
      <HeroBackground />

      <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
        <Parallax speed="float" className="absolute inset-0" layer={false}>
          <FloatingAiCards />
        </Parallax>
      </div>

      <Container className="relative z-10 flex min-h-[100dvh] flex-col pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-8 sm:pt-32 sm:pb-8 lg:pb-12">
        <div className="grid min-w-0 flex-1 items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          <Parallax speed="slow" className="relative z-10">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="premium-badge premium-eyebrow gap-2.5">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute hidden h-full w-full animate-ping rounded-full bg-primary/80 opacity-75 sm:inline-flex" />
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
              className="text-display hero-headline mt-6 leading-[1.06] sm:mt-9 sm:leading-[0.98]"
            >
              <span className="block text-[clamp(1.65rem,6.5vw,1.875rem)] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                {t("headlineLine1")}
              </span>
              <span className="mt-1 block text-[clamp(1.5rem,7.5vw,1.85rem)] sm:mt-1.5 sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.75rem]">
                <span className="text-gradient-hero text-glow-red break-words hyphens-auto">
                  {t("headlineHighlight")}
                </span>
              </span>
              <span className="mt-1 block text-[clamp(1.65rem,6.5vw,1.875rem)] text-off-white/90 sm:mt-1.5 sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                {t("headlineLine2")}
              </span>
            </motion.h1>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="premium-accent-line mt-7 max-w-xl sm:mt-9"
            >
              <p className="text-body-lg max-w-lg">{t("subheadline")}</p>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-7 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            >
              <TelegramButton size="lg" className="btn-mobile-full w-full sm:w-auto">
                {t("cta")}
              </TelegramButton>
              <Link
                href="/services"
                className="btn-ghost-premium btn-mobile-full group w-full px-6 py-3.5 text-sm sm:w-auto sm:px-8 sm:py-4"
              >
                {t("secondary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.dl
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 grid grid-cols-3 gap-2 sm:mt-14 sm:gap-4 md:gap-5"
            >
              {trustKeys.map((key) => (
                <div key={key} className="premium-stat min-w-0 px-2.5 py-4 sm:px-5 sm:py-6">
                  <dt className="sr-only">{t(`trust.${key}.label`)}</dt>
                  <dd className="font-mono text-sm font-semibold tracking-[-0.02em] text-primary sm:text-lg md:text-xl">
                    {t(`trust.${key}.value`)}
                  </dd>
                  <dd className="text-caption mt-1.5 break-words text-muted">
                    {t(`trust.${key}.label`)}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </Parallax>

          <Parallax
            speed="lift"
            scale={[0.94, 1]}
            className="relative min-w-0 lg:pl-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[240px] items-center justify-center sm:min-h-[320px] lg:min-h-[380px]"
            >
              <HeroAiCore className="absolute inset-0 z-0 mx-auto aspect-square w-[min(100%,18rem)] sm:w-[min(100%,26rem)] lg:w-[min(115%,28rem)]" />
              <div className="absolute -inset-4 z-[1] rounded-full bg-primary/10 blur-[56px] sm:-inset-10 sm:bg-primary/12 sm:blur-[88px]" />
              <div
                className="hero-pulse-ring absolute inset-0 z-[1] rounded-[2rem] border border-primary/15 opacity-40 max-md:opacity-25"
              />
              <div className="relative z-10 w-full">
                <DashboardPreview />
              </div>
            </motion.div>
          </Parallax>
        </div>

        <motion.a
          href="#stats"
          aria-label={t("scrollToStats")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="touch-target mx-auto mt-8 flex flex-col items-center justify-center gap-2 pb-2 text-subtle transition-colors hover:text-primary/70 focus-visible:text-primary/70 sm:mt-10 lg:mt-6"
        >
          <span className="text-caption uppercase tracking-[0.25em]">
            {t("scroll")}
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5" aria-hidden />
          </motion.span>
        </motion.a>
      </Container>
    </ParallaxSection>
  );
}
