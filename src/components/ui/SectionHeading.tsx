"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, ease: easeOut }}
      className={cn(
        "section-heading max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span className="premium-badge premium-eyebrow mb-5 inline-flex sm:mb-6">
          {badge}
        </span>
      )}
      <h2 className="text-display-sm">{title}</h2>
      {subtitle && (
        <>
          <div
            className={cn(
              "premium-divider mt-5 sm:mt-6",
              align === "center" ? "mx-auto max-w-[7rem]" : "max-w-[9rem]"
            )}
          />
          <p
            className={cn(
              "text-body-lg mt-5 sm:mt-6",
              align === "center" ? "mx-auto max-w-xl" : "max-w-lg"
            )}
          >
            {subtitle}
          </p>
        </>
      )}
    </motion.div>
  );
}

