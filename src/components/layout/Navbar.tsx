"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";
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
        <nav className="premium-nav mt-3 flex items-center justify-between gap-2 sm:mt-4 sm:gap-3">
          <Link href="/" className="group flex min-w-0 max-w-[55%] items-center gap-2.5 sm:max-w-none">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/25 to-primary/5 text-sm font-bold text-primary shadow-[0_0_20px_rgb(227_42_57/0.2)]"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
              <span className="relative">M</span>
            </motion.span>
            <span className="hidden truncate text-sm font-semibold tracking-tight text-off-white min-[400px]:inline">
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
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2 text-off-white/80 transition-colors hover:border-white/15 hover:text-off-white lg:hidden"
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
                    className="rounded-xl px-3 py-3 text-[15px] font-medium text-off-white/75 transition-colors hover:bg-white/[0.04] hover:text-off-white"
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
