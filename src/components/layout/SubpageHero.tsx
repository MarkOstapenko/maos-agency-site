"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

type SubpageHeroProps = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
};

export function SubpageHero({
  badge,
  title,
  titleHighlight,
  subtitle,
}: SubpageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
      <div className="red-glow-bg pointer-events-none absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-[min(90vw,380px)] w-[min(95vw,560px)] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="gradient-mesh pointer-events-none absolute inset-0" />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-80" />
      <div
        className="grid-pattern pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 0%, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 0%, black, transparent 72%)",
        }}
      />

      <Container className="relative min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="premium-badge premium-eyebrow">{badge}</span>
          <h1 className="mt-6 max-w-4xl font-bold leading-[1.08] sm:mt-8 sm:leading-[1.05]">
            <span className="block text-3xl sm:text-5xl lg:text-6xl">{title}</span>
            <span className="mt-1.5 block break-words text-3xl text-gradient-hero text-glow-red sm:text-5xl lg:text-6xl">
              {titleHighlight}
            </span>
          </h1>
          <p className="premium-accent-line mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:mt-8 sm:text-lg">
            {subtitle}
          </p>
        </motion.div>
      </Container>
      <div className="premium-divider absolute bottom-0 left-4 right-4 sm:left-8 sm:right-8" />
    </section>
  );
}
