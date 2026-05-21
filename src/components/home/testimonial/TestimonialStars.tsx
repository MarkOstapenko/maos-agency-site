"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type TestimonialStarsProps = {
  count?: number;
  className?: string;
};

export function TestimonialStars({ count = 5, className }: TestimonialStarsProps) {
  return (
    <div className={cn("flex gap-1", className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-primary/50 text-primary/50"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}
