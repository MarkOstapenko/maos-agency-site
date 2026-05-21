"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Parallax, ParallaxSection, ParallaxScroll } from "@/components/ui/Parallax";
import type { SectionAtmosphereVariant } from "@/lib/section-atmosphere";

type SubpageHeroProps = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  atmosphere?: SectionAtmosphereVariant;
};

export function SubpageHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  atmosphere = "subpage",
}: SubpageHeroProps) {
  return (
    <ParallaxSection className="relative overflow-hidden pt-[calc(6.5rem+env(safe-area-inset-top,0px))] pb-12 sm:pt-36 sm:pb-24">
      <SectionAtmosphere variant={atmosphere} />
      <ParallaxScroll speed="bg" className="pointer-events-none absolute inset-0">
        <div className="red-glow-bg absolute inset-0" />
      </ParallaxScroll>

      <ParallaxScroll speed="slow" className="pointer-events-none absolute left-1/2 top-0 w-full -translate-x-1/2">
        <motion.div
          className="mx-auto h-[min(90vw,360px)] w-[min(95vw,520px)] rounded-full bg-primary/12 blur-[100px]"
          animate={{ opacity: [0.2, 0.32, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </ParallaxScroll>

      <ParallaxScroll speed="medium" className="pointer-events-none absolute inset-0">
        <div className="gradient-mesh absolute inset-0" />
      </ParallaxScroll>

      <ParallaxScroll speed="fast" className="pointer-events-none absolute inset-0">
        <div
          className="grid-pattern absolute inset-0 opacity-25"
          style={{
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 0%, black, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 0%, black, transparent 72%)",
          }}
        />
      </ParallaxScroll>

      <Container className="relative min-w-0">
        <Parallax speed="slow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="premium-badge premium-eyebrow">{badge}</span>
            <h1 className="text-display hero-headline mt-6 max-w-4xl leading-[1.08] sm:mt-9 sm:leading-[1.04]">
              <span className="block text-[clamp(1.75rem,6vw,1.875rem)] sm:text-[2.75rem] lg:text-[3.25rem]">
                {title}
              </span>
              <span className="mt-1.5 block break-words text-[clamp(1.65rem,6.5vw,1.875rem)] text-gradient-hero text-glow-red sm:mt-2 sm:text-[2.75rem] lg:text-[3.25rem]">
                {titleHighlight}
              </span>
            </h1>
            <p className="premium-accent-line text-body-lg mt-7 max-w-xl sm:mt-9">
              {subtitle}
            </p>
          </motion.div>
        </Parallax>
      </Container>
      <div className="premium-divider absolute bottom-0 left-4 right-4 sm:left-8 sm:right-8" />
    </ParallaxSection>
  );
}
