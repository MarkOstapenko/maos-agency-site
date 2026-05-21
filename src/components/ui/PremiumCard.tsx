"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PremiumCardElement = "article" | "div" | "section" | "blockquote";

type PremiumCardProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  featured?: boolean;
  interactive?: boolean;
  as?: PremiumCardElement;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

export function PremiumCard({
  children,
  className,
  innerClassName,
  featured = false,
  interactive = true,
  as = "div",
  onHoverStart,
  onHoverEnd,
}: PremiumCardProps) {
  const Component = motion[as];

  return (
    <Component
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={cn(
        "premium-card group relative flex flex-col overflow-hidden",
        interactive && "premium-card-interactive",
        featured && "premium-card-featured",
        className
      )}
    >
      {interactive && (
        <div className="premium-card-glow pointer-events-none" aria-hidden />
      )}
      <div className={cn("premium-card-inner relative flex min-h-0 flex-1 flex-col", innerClassName)}>
        {children}
      </div>
    </Component>
  );
}
