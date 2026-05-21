"use client";

import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import { pageCurtain, pageTransition } from "@/lib/motion";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (reduceMotion) {
    return <div className="page-transition-shell">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="page-transition-shell"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
      >
        <motion.div
          className="page-transition-curtain"
          aria-hidden
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageCurtain}
        />
        <div className="page-transition-content">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
}
