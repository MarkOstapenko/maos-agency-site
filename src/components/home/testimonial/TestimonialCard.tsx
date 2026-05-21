"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { MotionItem } from "@/components/ui/motion";

export type TestimonialKey =
  | "novaRetail"
  | "techFlow"
  | "growthLab"
  | "mediaHub"
  | "scaleUp"
  | "primeLog";

const avatarGradients = [
  "from-white/12 to-white/[0.03]",
  "from-primary/20 to-white/[0.04]",
  "from-white/10 to-primary/[0.06]",
  "from-white/12 to-white/[0.03]",
  "from-primary/16 to-white/[0.04]",
  "from-white/10 to-white/[0.02]",
];

type TestimonialCardProps = {
  testimonialKey: TestimonialKey;
  index: number;
  featured?: boolean;
};

export function TestimonialCard({
  testimonialKey,
  index,
  featured = false,
}: TestimonialCardProps) {
  const t = useTranslations("testimonials");

  const initials = t(`items.${testimonialKey}.initials`);
  const gradient = avatarGradients[index % avatarGradients.length];
  const highlight = featured ? t(`items.${testimonialKey}.highlight`) : null;

  return (
    <MotionItem className={featured ? "lg:col-span-2" : undefined}>
      <motion.blockquote
        className={cn(
          "testimonial-card group relative flex h-full flex-col",
          featured && "testimonial-card-featured"
        )}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="testimonial-card-glow pointer-events-none" aria-hidden />
        <span className="testimonial-card-edge pointer-events-none" aria-hidden />

        <div className="testimonial-card-inner flex flex-1 flex-col">
          <Quote
            className="testimonial-card-quote-icon shrink-0"
            strokeWidth={1.25}
            aria-hidden
          />

          <p
            className={cn(
              "testimonial-card-quote flex-1",
              featured && "testimonial-card-quote-featured"
            )}
          >
            {t(`items.${testimonialKey}.quote`)}
          </p>

          {highlight && (
            <p className="testimonial-card-metric">{highlight}</p>
          )}

          <footer className="testimonial-card-author">
            <div
              className={cn(
                "testimonial-card-avatar bg-gradient-to-br font-medium text-off-white",
                gradient
              )}
              aria-hidden
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="testimonial-card-name">
                {t(`items.${testimonialKey}.name`)}
              </p>
              <p className="testimonial-card-meta">
                {t(`items.${testimonialKey}.role`)}
              </p>
              <p className="testimonial-card-company">
                {t(`items.${testimonialKey}.company`)}
              </p>
            </div>
          </footer>
        </div>
      </motion.blockquote>
    </MotionItem>
  );
}
