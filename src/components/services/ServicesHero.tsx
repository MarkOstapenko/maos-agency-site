"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Parallax, ParallaxSection, ParallaxScroll } from "@/components/ui/Parallax";
import { ServicesHeroVisual } from "./ServicesHeroVisual";

export function ServicesHero() {
  const t = useTranslations("servicesPage.hero");

  return (
    <ParallaxSection className="services-hero relative overflow-hidden pt-[calc(6.5rem+env(safe-area-inset-top,0px))] pb-12 sm:pt-36 sm:pb-24">
      <ParallaxScroll speed="bg" className="pointer-events-none absolute inset-0">
        <div className="red-glow-bg absolute inset-0 opacity-80" />
      </ParallaxScroll>

      <ParallaxScroll speed="slow" className="pointer-events-none absolute left-1/2 top-0 w-full -translate-x-1/2">
        <motion.div
          className="services-hero-orb mx-auto h-[min(85vw,380px)] w-[min(90vw,480px)] rounded-full bg-primary/10 blur-[100px]"
          animate={{ opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </ParallaxScroll>

      <ParallaxScroll speed="medium" className="pointer-events-none absolute inset-0">
        <div className="gradient-mesh absolute inset-0 opacity-90" />
      </ParallaxScroll>

      <ParallaxScroll speed="fast" className="pointer-events-none absolute inset-0">
        <div
          className="grid-pattern absolute inset-0 opacity-20"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 70% at 55% 20%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 55% 20%, black, transparent 75%)",
          }}
        />
      </ParallaxScroll>

      <Container className="relative min-w-0">
        <div className="services-hero-grid">
          <Parallax speed="slow" className="services-hero-copy min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="premium-badge premium-eyebrow">{t("badge")}</span>
              <h1 className="text-display hero-headline mt-6 max-w-2xl leading-[1.08] sm:mt-9 sm:leading-[1.04]">
                <span className="block text-[clamp(1.75rem,6vw,1.875rem)] sm:text-[2.75rem] lg:text-[3.25rem]">
                  {t("title")}
                </span>
                <span className="mt-1.5 block break-words text-[clamp(1.65rem,6.5vw,1.875rem)] text-gradient-hero text-glow-red sm:mt-2 sm:text-[2.75rem] lg:text-[3.25rem]">
                  {t("titleHighlight")}
                </span>
              </h1>
              <p className="premium-accent-line text-body-lg mt-7 max-w-xl sm:mt-9">
                {t("subtitle")}
              </p>
            </motion.div>
          </Parallax>

          <Parallax speed="lift" className="services-hero-visual-col hidden min-w-0 md:block">
            <ServicesHeroVisual />
          </Parallax>
        </div>

        <div className="services-hero-visual-mobile mt-10 md:hidden">
          <ServicesHeroVisual compact />
        </div>
      </Container>

      <div className="premium-divider absolute bottom-0 left-4 right-4 sm:left-8 sm:right-8" />
    </ParallaxSection>
  );
}
