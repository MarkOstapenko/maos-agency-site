"use client";

import { useEffect, useState } from "react";
import { useReducedMotion, useSpring, useMotionValueEvent } from "framer-motion";

type AnimatedValueProps = {
  value: number;
  format: (n: number) => string;
  className?: string;
};

export function AnimatedValue({ value, format, className }: AnimatedValueProps) {
  const reduceMotion = useReducedMotion();
  const spring = useSpring(value, { stiffness: 85, damping: 22, mass: 0.35 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    spring.set(value);
  }, [value, spring, reduceMotion]);

  useMotionValueEvent(spring, "change", (latest) => {
    if (!reduceMotion) setDisplay(latest);
  });

  return <span className={className}>{format(display)}</span>;
}
