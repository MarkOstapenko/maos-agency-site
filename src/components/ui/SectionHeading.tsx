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
      transition={{ duration: 0.7, ease: easeOut }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span className="premium-badge premium-eyebrow mb-6 inline-flex sm:mb-7">
          {badge}
        </span>
      )}
      <h2 className="text-display-sm">{title}</h2>
      {subtitle && (
        <>
          <div
            className={cn(
              "premium-divider mt-6 sm:mt-7",
              align === "center" ? "mx-auto max-w-[8rem]" : "max-w-[10rem]"
            )}
          />
          <p className="text-body-lg mt-6 max-w-xl sm:mt-7">{subtitle}</p>
        </>
      )}
    </motion.div>
  );
}
