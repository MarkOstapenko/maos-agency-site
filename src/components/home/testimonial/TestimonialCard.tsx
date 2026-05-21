"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { cn } from "@/lib/utils";
import { MotionItem } from "@/components/ui/motion";
import { TestimonialStars } from "./TestimonialStars";

export type TestimonialKey =
  | "novaRetail"
  | "techFlow"
  | "growthLab"
  | "mediaHub"
  | "scaleUp"
  | "primeLog";

const avatarGradients = [
  "from-primary/40 to-primary/10",
  "from-rose-500/35 to-primary/15",
  "from-violet-500/30 to-primary/10",
  "from-amber-500/25 to-primary/15",
  "from-cyan-500/25 to-primary/10",
  "from-emerald-500/25 to-primary/10",
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
  const [hovered, setHovered] = useState(false);

  const initials = t(`items.${testimonialKey}.initials`);
  const gradient = avatarGradients[index % avatarGradients.length];

  return (
    <MotionItem className={featured ? "lg:col-span-2" : undefined}>
      <PremiumCard
        as="blockquote"
        featured={featured}
        className={cn("h-full", featured && "lg:flex-row lg:items-stretch")}
        innerClassName={featured ? "lg:flex-row lg:items-stretch" : undefined}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div
          className={cn(
            "card-pad flex flex-1 flex-col",
            featured && "lg:min-w-0 lg:flex-[1.4] lg:border-r lg:border-white/6"
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div
              className={cn(
                "premium-card-icon h-10 w-10 text-primary/80 transition-transform duration-500 group-hover:rotate-3",
                featured && "premium-card-icon-featured"
              )}
            >
              <Quote className="h-5 w-5" />
            </div>
            <TestimonialStars active={hovered} />
          </div>

          <motion.p
            className={cn(
              "testimonial-quote flex-1 font-medium leading-relaxed text-off-white",
              featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
            )}
            animate={{ opacity: hovered ? 1 : 0.92 }}
            transition={{ duration: 0.35 }}
          >
            {t(`items.${testimonialKey}.quote`)}
          </motion.p>

          {featured && (
            <p className="text-caption mt-4 font-mono text-primary/80">
              {t(`items.${testimonialKey}.highlight`)}
            </p>
          )}
        </div>

        <footer
          className={cn(
            "flex items-center gap-4 border-t border-white/6 bg-black/25 card-pad-sm",
            featured && "lg:w-[min(100%,280px)] lg:flex-shrink-0 lg:flex-col lg:justify-center lg:border-t-0 lg:border-l lg:border-white/6"
          )}
        >
          <div
            className={cn(
              "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br font-mono text-sm font-semibold text-off-white transition-shadow duration-500",
              gradient,
              featured && "h-14 w-14 text-base",
              hovered && "shadow-[0_0_24px_rgb(227_42_57/0.28)]"
            )}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-off-white">
              {t(`items.${testimonialKey}.name`)}
            </p>
            <p className="text-caption mt-0.5 truncate">
              {t(`items.${testimonialKey}.role`)}
            </p>
            <p className="premium-eyebrow mt-2 truncate text-[9px] text-muted sm:text-[10px]">
              {t(`items.${testimonialKey}.company`)}
            </p>
          </div>
          <span className="testimonial-verified hidden rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary sm:inline-flex lg:hidden xl:inline-flex">
            {t("verified")}
          </span>
        </footer>
      </PremiumCard>
    </MotionItem>
  );
}
