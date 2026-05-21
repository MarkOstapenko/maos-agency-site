"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { TelegramButton } from "@/components/ui/TelegramButton";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/about", key: "about" as const },
];

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="premium-nav mt-4 flex items-center justify-between gap-2 sm:mt-5 sm:gap-3">
          <Link href="/" className="group flex min-w-0 max-w-[55%] items-center gap-2.5 sm:max-w-none">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-black/40 p-1"
            >
              <BrandLogo size={28} priority />
            </motion.span>
            <span className="hidden truncate text-sm font-medium tracking-tight text-off-white min-[400px]:inline">
              {BRAND.name}
            </span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map(({ href, key }) => (
              <Link key={key} href={href} className="nav-link group relative">
                {t(key)}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher className="shrink-0" />

            <div className="hidden md:flex">
              <TelegramButton size="sm">{t("cta")}</TelegramButton>
            </div>

            <button
              type="button"
              className="rounded-xl border border-white/8 bg-white/3 p-2 text-muted transition-colors hover:border-white/15 hover:text-off-white lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="premium-card mt-2 overflow-hidden p-4 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map(({ href, key }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-white/4 hover:text-off-white"
                  >
                    {t(key)}
                  </Link>
                ))}
                <div className="premium-divider my-3" />
                <TelegramButton className="w-full">{t("cta")}</TelegramButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
