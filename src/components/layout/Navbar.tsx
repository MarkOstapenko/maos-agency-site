"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { IconButton } from "@/components/ui/IconButton";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import { useLenis } from "./smooth-scroll";

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonId = useId();

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
      return () => lenis.start();
    }

    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <div className="site-header-inner mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 lg:px-8">
        <nav
          className={cn(
            "premium-nav",
            scrolled && "premium-nav--scrolled",
            open && "premium-nav--menu-open"
          )}
          aria-label={t("menu")}
        >
          <div className="premium-nav-atmosphere" aria-hidden>
            <span className="premium-nav-mesh" />
            <span className="premium-nav-shine" />
            <span className="premium-nav-glow" />
            <span className="premium-nav-border-glow" />
          </div>

          <div className="premium-nav-inner">
            <div className="premium-nav-zone premium-nav-zone--start">
              <Link
              href="/"
              className="premium-nav-brand group flex min-w-0 max-w-[58%] items-center gap-2.5 sm:max-w-none sm:gap-3"
              aria-label={BRAND.name}
            >
              <motion.span
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                className="brand-logo-mark-wrap shrink-0"
              >
                <BrandLogo size={32} priority />
              </motion.span>
              <span className="premium-nav-brand-text truncate max-[359px]:text-[13px]">
                {BRAND.name}
              </span>
              </Link>
            </div>

            <div className="premium-nav-zone premium-nav-zone--center hidden lg:flex">
              <div className="nav-rail" role="list">
                {NAV_LINKS.map(({ href, key }) => {
                  const active = isNavActive(pathname, href);
                  return (
                    <Link
                      key={key}
                      href={href}
                      role="listitem"
                      className={cn("nav-link", active && "nav-link--active")}
                      aria-current={active ? "page" : undefined}
                    >
                      {active && (
                        <motion.span
                          layoutId={reduceMotion ? undefined : "nav-active-pill"}
                          className="nav-link-indicator"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                          aria-hidden
                        />
                      )}
                      <span className="nav-link-label">{t(key)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="premium-nav-zone premium-nav-zone--end">
              <div className="premium-nav-actions">
              <LanguageSwitcher
                className="nav-lang hidden shrink-0 lg:inline-flex"
                size="sm"
              />

              <span className="nav-divider hidden lg:block" aria-hidden />

              <div className="hidden md:flex">
                <TelegramButton size="sm" className="nav-cta">
                  {t("cta")}
                </TelegramButton>
              </div>

              <IconButton
                id={menuButtonId}
                type="button"
                size="md"
                active={open}
                className="nav-menu-btn touch-target relative z-[51] lg:hidden"
                onClick={toggleMenu}
                label={open ? t("closeMenu") : t("openMenu")}
                aria-expanded={open}
                aria-controls="mobile-menu-dialog"
              >
                {open ? (
                  <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
                ) : (
                  <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />
                )}
              </IconButton>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <MobileMenu
        open={open}
        onClose={closeMenu}
        menuButtonId={menuButtonId}
      />
    </header>
  );
}
