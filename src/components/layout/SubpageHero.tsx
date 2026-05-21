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
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-24">
      <div className="red-glow-bg pointer-events-none absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-[min(90vw,360px)] w-[min(95vw,520px)] -translate-x-1/2 rounded-full bg-primary/12 blur-[100px]"
        animate={{ opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="gradient-mesh pointer-events-none absolute inset-0" />
      <div
        className="grid-pattern pointer-events-none absolute inset-0 opacity-25"
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
          <h1 className="text-display mt-7 max-w-4xl leading-[1.06] sm:mt-9 sm:leading-[1.04]">
            <span className="block text-3xl sm:text-[2.75rem] lg:text-[3.25rem]">{title}</span>
            <span className="mt-2 block break-words text-3xl text-gradient-hero text-glow-red sm:text-[2.75rem] lg:text-[3.25rem]">
              {titleHighlight}
            </span>
          </h1>
          <p className="premium-accent-line text-body-lg mt-7 max-w-xl sm:mt-9">
            {subtitle}
          </p>
        </motion.div>
      </Container>
      <div className="premium-divider absolute bottom-0 left-4 right-4 sm:left-8 sm:right-8" />
    </section>
  );
}
