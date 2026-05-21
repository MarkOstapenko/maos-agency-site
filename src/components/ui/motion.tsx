"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewport } from "@/lib/motion";

type VariantName = "fadeUp" | "fadeIn";

const variantMap = {
  fadeUp,
  fadeIn,
};

type MotionRevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: VariantName;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function MotionReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  as = "div",
}: MotionRevealProps) {
  const Component = motion[as];
  return (
    <Component
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variantMap[variant]}
      className={className}
    >
      {children}
    </Component>
  );
}

type MotionStaggerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
};

export function MotionStagger({
  children,
  className,
  as = "div",
}: MotionStaggerProps) {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </Component>
  );
}

export function MotionItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
