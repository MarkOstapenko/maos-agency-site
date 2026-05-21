"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { fadeUp, staggerContainer } from "@/lib/motion";

type PageHeroProps = {
  badge: string;
  title: string;
  subtitle: string;
};

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <GlowOrb className="left-1/2 top-0 h-72 w-72 -translate-x-1/2" />
      <div className="gradient-mesh pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary"
          >
            {badge}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-off-white sm:text-5xl lg:text-6xl"
          >
            <span className="text-glow-red">{title}</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-off-white/60"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
