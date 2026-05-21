"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { BRAND } from "@/lib/constants";
import { easeOut } from "@/lib/motion";
import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: 0.32, ease: easeOut } },
};

const panelVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeOut, staggerChildren: 0.07, delayChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.28, ease: easeOut, staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.25, ease: easeOut },
  },
};

const reducedPanelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  menuButtonId: string;
};

export function MobileMenu({ open, onClose, menuButtonId }: MobileMenuProps) {
  const t = useTranslations("nav");
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const panelMotion = reduceMotion ? reducedPanelVariants : panelVariants;
  const itemMotion = reduceMotion ? reducedItemVariants : itemVariants;

  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    if (open) {
      main?.setAttribute("inert", "");
      main?.setAttribute("aria-hidden", "true");
      footer?.setAttribute("inert", "");
      footer?.setAttribute("aria-hidden", "true");
    } else {
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
    }
    return () => {
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !panelRef.current) return;

    const root = panelRef.current;
    const focusables = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const raf = requestAnimationFrame(() => first.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    const trigger = document.getElementById(menuButtonId);
    requestAnimationFrame(() => trigger?.focus());
  }, [open, menuButtonId]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mobile-menu-backdrop"
            className="mobile-menu-backdrop fixed inset-0 z-[48] lg:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden
            onClick={onClose}
          />

          <motion.div
            key="mobile-menu-panel"
            ref={panelRef}
            id="mobile-menu-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-lenis-prevent
            className="mobile-menu fixed inset-0 z-[49] flex flex-col lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.42, ease: easeOut }}
          >
            <div className="mobile-menu-glow pointer-events-none absolute inset-0" aria-hidden />
            <div className="mobile-menu-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

            <motion.div
              className="relative flex flex-1 flex-col px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(5.25rem+env(safe-area-inset-top,0px))]"
              variants={panelMotion}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p id={titleId} className="sr-only">
                {t("menu")}
              </p>

              <nav
                className="flex flex-1 flex-col justify-center"
                aria-label={t("menu")}
              >
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ href, key }, index) => (
                    <motion.li key={key} variants={itemMotion}>
                      <Link
                        href={href}
                        onClick={onClose}
                        className={cn(
                          "mobile-menu-link group flex min-h-[52px] items-center gap-3 py-2",
                          "rounded-2xl px-2 transition-colors active:bg-white/[0.04]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        )}
                      >
                        <span className="mobile-menu-link-index font-mono text-xs text-primary/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mobile-menu-link-text">{t(key)}</span>
                        <ArrowUpRight
                          className="ml-auto h-5 w-5 shrink-0 text-primary/0 transition-all duration-300 group-hover:text-primary/70 group-focus-visible:text-primary/70"
                          aria-hidden
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                variants={itemMotion}
                className="mt-auto flex flex-col gap-6 border-t border-white/[0.06] pt-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="premium-label mb-3">{t("language")}</p>
                    <LanguageSwitcher
                      variant="menu"
                      onLocaleChange={onClose}
                    />
                  </div>
                  <p className="text-caption hidden text-subtle sm:block sm:max-w-[10rem] sm:text-right">
                    {BRAND.name}
                  </p>
                </div>

                <TelegramButton
                  size="lg"
                  className="btn-mobile-full w-full"
                  onClick={onClose}
                >
                  {t("cta")}
                </TelegramButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
