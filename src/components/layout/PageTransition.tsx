"use client";

import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import {
  pageCurtain,
  pageTransition,
  pageTransitionMobile,
} from "@/lib/motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { scrollForRouteChange, useLenis } from "./smooth-scroll";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    scrollForRouteChange(lenis, window.location.hash);

    const main = document.getElementById("main");
    requestAnimationFrame(() => main?.focus({ preventScroll: true }));
  }, [pathname, lenis]);

  if (reduceMotion) {
    return <div className="page-transition-shell">{children}</div>;
  }

  const variants = isMobile ? pageTransitionMobile : pageTransition;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        className="page-transition-shell"
        initial="hidden"
        animate="visible"
        variants={variants}
        onAnimationComplete={() => {
          requestAnimationFrame(() => {
            lenis?.resize();
            const hash = window.location.hash;
            if (hash) scrollForRouteChange(lenis, hash);
          });
        }}
      >
        {!isMobile && (
          <motion.div
            className="page-transition-curtain"
            aria-hidden
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageCurtain}
          />
        )}
        <div className="page-transition-content">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
}
