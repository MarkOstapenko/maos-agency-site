"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span className="premium-badge premium-eyebrow mb-5 inline-flex sm:mb-6">
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <>
          <div
            className={cn(
              "premium-divider mt-5",
              align === "center" ? "mx-auto max-w-xs" : "max-w-md"
            )}
          />
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            {subtitle}
          </p>
        </>
      )}
    </motion.div>
  );
}
