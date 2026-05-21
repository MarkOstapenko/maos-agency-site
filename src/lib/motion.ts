import type { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const viewport = { once: true, margin: "-48px" as const };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: easeOut },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.55, delay, ease: easeOut },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: easeOut },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

/** @deprecated Use pageTransition */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.988,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 1.008,
    transition: {
      duration: 0.48,
      ease: easeOut,
    },
  },
};

export const pageCurtain: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0,
    transition: { duration: 0.72, ease: easeOut },
  },
  exit: {
    opacity: 0.55,
    transition: { duration: 0.32, ease: easeOut },
  },
};

export const cardHover = {
  y: -4,
  transition: { duration: 0.35, ease: easeOut },
};

export const tapScale = { scale: 0.98 };
