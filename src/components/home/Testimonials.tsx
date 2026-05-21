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
      <ParallaxScroll speed="slow" className="pointer-events-none absolute inset-0 opacity-40">
        <div className="red-glow-spot absolute inset-0" />
      </ParallaxScroll>

      <Container className="relative">
        <Parallax speed="subtle" className="section-head">
          <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <MotionReveal className="section-head">
          <div className="testimonial-rating mx-auto flex max-w-lg flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-10 sm:text-left">
            <div className="flex items-baseline gap-3">
              <motion.span
                className="testimonial-rating-value font-mono tabular-nums"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {t("ratingValue")}
              </motion.span>
              <div>
                <TestimonialStars className="mb-1.5 justify-center sm:justify-start" />
                <p className="text-caption text-muted">{t("ratingLabel")}</p>
              </div>
            </div>
            <p className="text-caption max-w-[16rem] text-subtle sm:max-w-[11rem]">
              {t("ratingNote")}
            </p>
          </div>
        </MotionReveal>

        <MotionStagger className="section-grid lg:grid-cols-2">
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
