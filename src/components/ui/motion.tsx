"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewport,
  cardHover,
  tapScale,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type VariantName = "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight";

const variantMap = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
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

type MotionHoverCardProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function MotionHoverCard({
  children,
  className,
  ...props
}: MotionHoverCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      whileHover={cardHover}
      whileTap={tapScale}
      transition={{ duration: 0.5 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
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
