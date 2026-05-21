"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";
import type { IntegrationPosition } from "./integration-layout";

type IntegrationNodeProps = {
  label: string;
  icon: LucideIcon;
  position: IntegrationPosition;
  index: number;
};

export function IntegrationNode({
  label,
  icon: Icon,
  position,
  index,
}: IntegrationNodeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "integrations-node absolute z-10",
        !reduceMotion && "integrations-node-float"
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        animationDelay: `${index * 0.4}s`,
        animationDuration: `${4.2 + (index % 4) * 0.5}s`,
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: 0.05 * index, ease: easeOut }}
    >
      <span className="integrations-node-glow pointer-events-none" aria-hidden />
      <span className="integrations-node-edge pointer-events-none" aria-hidden />
      <span className="integrations-node-inner">
        <span className="integrations-node-icon">
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="integrations-node-label">{label}</span>
      </span>
    </motion.div>
  );
}
