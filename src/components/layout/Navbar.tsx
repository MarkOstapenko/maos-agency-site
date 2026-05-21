"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { IconButton } from "@/components/ui/IconButton";
import { TelegramButton } from "@/components/ui/TelegramButton";
import { NAV_LINKS } from "@/lib/nav-links";
import { useLenis } from "./smooth-scroll";

export function Navbar() {
  const t = useTranslations("nav");
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const menuButtonId = useId();

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((prev) => !prev);

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
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <div className="mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 lg:px-8">
        <nav className="premium-nav mt-3 flex items-center justify-between gap-2 sm:mt-5 sm:gap-3">
          <Link href="/" className="group flex min-w-0 max-w-[62%] items-center gap-2 sm:max-w-none">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-black/40 p-1"
            >
              <BrandLogo size={28} priority />
            </motion.span>
            <span className="truncate text-sm font-medium tracking-tight text-off-white max-[359px]:text-[13px]">
              {BRAND.name}
            </span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map(({ href, key }) => (
              <Link key={key} href={href} className="nav-link group relative">
                {t(key)}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher className="hidden shrink-0 lg:inline-flex" />

            <div className="hidden md:flex">
              <TelegramButton size="sm">{t("cta")}</TelegramButton>
            </div>

            <IconButton
              id={menuButtonId}
              type="button"
              size="md"
              active={open}
              className="touch-target relative z-[51] lg:hidden"
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
