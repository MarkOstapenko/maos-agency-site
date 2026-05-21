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
};

export function TelegramButton({
  children,
  variant = "primary",
  className,
  size = "md",
}: TelegramButtonProps) {
  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-sm sm:py-4 sm:text-base",
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
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={tapScale}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(variants[variant], sizes[size], className)}
    >
      <Send className="h-4 w-4 opacity-90" />
      {children}
    </motion.a>
  );
}
