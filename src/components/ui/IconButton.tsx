"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut, tapScale } from "@/lib/motion";

type IconButtonSize = "sm" | "md";

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "icon-btn-sm",
  md: "icon-btn-md",
};

export type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: IconButtonSize;
  /** Accessible name (required) */
  label: string;
  active?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
  disabled?: boolean;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export function IconButton({
  children,
  className,
  size = "md",
  label,
  active = false,
  href,
  target,
  rel,
  type = "button",
  onClick,
  id,
  disabled,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: IconButtonProps) {
  const classes = cn(
    "icon-btn group relative inline-flex shrink-0 items-center justify-center",
    sizeClasses[size],
    active && "icon-btn-active",
    className
  );

  const motionProps = {
    whileHover: { y: -2, scale: 1.04 },
    whileTap: tapScale,
    transition: { duration: 0.32, ease: easeOut },
  };

  const inner = (
    <>
      <span className="icon-btn-glow pointer-events-none" aria-hidden />
      <span className="icon-btn-edge pointer-events-none" aria-hidden />
      <span className="icon-btn-surface relative flex items-center justify-center">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={label}
        title={label}
        className={classes}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={classes}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
