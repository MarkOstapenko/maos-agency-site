"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type TestimonialStarsProps = {
  count?: number;
  active?: boolean;
  className?: string;
};

export function TestimonialStars({
  count = 5,
  active = false,
  className,
}: TestimonialStarsProps) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={
            active
              ? { scale: [1, 1.2, 1], opacity: 1 }
              : { scale: 1, opacity: 0.85 }
          }
          transition={{ delay: active ? i * 0.05 : 0, duration: 0.35 }}
        >
          <Star
            className={cn(
              "h-3.5 w-3.5 sm:h-4 sm:w-4",
              active ? "fill-primary text-primary" : "fill-primary/70 text-primary/70"
            )}
          />
        </motion.span>
      ))}
    </div>
  );
}
