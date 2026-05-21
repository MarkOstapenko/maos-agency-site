"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Parallax, ParallaxSection, ParallaxScroll } from "@/components/ui/Parallax";
import { MotionStagger, MotionReveal } from "@/components/ui/motion";
import {
  TestimonialCard,
  type TestimonialKey,
} from "./testimonial/TestimonialCard";
import { TestimonialStars } from "./testimonial/TestimonialStars";

const testimonials: { key: TestimonialKey; featured?: boolean }[] = [
  { key: "novaRetail", featured: true },
  { key: "techFlow" },
  { key: "growthLab" },
  { key: "mediaHub" },
  { key: "scaleUp" },
  { key: "primeLog" },
];

export function Testimonials() {
  const t = useTranslations("testimonials");

  const cardSpeeds = ["slow", "fast", "medium", "fast", "medium", "fast"] as const;

  return (
    <ParallaxSection className="section-y section-defer relative overflow-hidden">
      <ParallaxScroll speed="slow" className="pointer-events-none absolute inset-0 opacity-60">
        <div className="red-glow-spot absolute inset-0" />
      </ParallaxScroll>
      <Container className="relative">
        <Parallax speed="subtle" className="mb-10 sm:mb-12">
          <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <Parallax speed="fast">
          <MotionReveal className="mx-auto mb-10 max-w-xl sm:mb-14">
            <div className="testimonial-rating-panel premium-card premium-card-featured flex flex-col items-center gap-4 card-pad sm:flex-row sm:justify-between">
          <div className="flex items-baseline gap-3">
            <motion.span
              className="font-mono text-4xl font-semibold tracking-tight text-primary sm:text-5xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t("ratingValue")}
            </motion.span>
            <div className="text-left">
              <TestimonialStars active className="mb-1" />
              <p className="text-caption">{t("ratingLabel")}</p>
            </div>
          </div>
          <p className="text-body text-center text-sm sm:max-w-[12rem] sm:text-right">
            {t("ratingNote")}
          </p>
            </div>
        </MotionReveal>
        </Parallax>

        <MotionStagger className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {testimonials.map((item, i) => (
            <Parallax key={item.key} speed={cardSpeeds[i]}>
              <TestimonialCard
                testimonialKey={item.key}
                index={i}
                featured={item.featured}
              />
            </Parallax>
          ))}
        </MotionStagger>
      </Container>
    </ParallaxSection>
  );
}
