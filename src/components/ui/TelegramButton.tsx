"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { tapScale } from "@/lib/motion";

type TelegramButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  /** Overrides default accessible name (includes new-tab hint) */
  ariaLabel?: string;
};

export function TelegramButton({
  children,
  variant = "primary",
  className,
  size = "md",
  onClick,
  ariaLabel,
}: TelegramButtonProps) {
  const sizes = {
    sm: "min-h-[44px] px-5 py-2.5 text-xs",
    md: "min-h-[44px] px-6 py-3 text-sm",
    lg: "min-h-[48px] px-8 py-3.5 text-sm sm:min-h-[44px] sm:py-4 sm:text-base",
  };

  const variants = {
    primary: "btn-premium btn-shine text-off-white",
    outline: "btn-ghost-premium",
    ghost: "text-muted hover:bg-white/5 hover:text-off-white",
  };

  return (
    <motion.a
      href={BRAND.telegram}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={
        ariaLabel ?? `${typeof children === "string" ? children : BRAND.telegramHandle} (${BRAND.telegramHandle}, opens in new tab)`
      }
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={tapScale}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(variants[variant], sizes[size], className)}
    >
      <Send className="h-4 w-4 opacity-90" />
      {children}
    </motion.a>
  );
}
