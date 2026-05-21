"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const locales = [
  { code: "uk" as const, label: "UA" },
  { code: "en" as const, label: "EN" },
] as const;

type LanguageSwitcherProps = {
  className?: string;
  size?: "sm" | "md";
  variant?: "default" | "menu";
  onLocaleChange?: () => void;
};

export function LanguageSwitcher({
  className,
  size = "md",
  variant = "default",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const isMenu = variant === "menu";
  const padding = isMenu
    ? "min-h-[48px] min-w-[4.5rem] px-5 py-2.5"
    : size === "sm"
      ? "min-h-[44px] px-3.5 py-2"
      : "min-h-[44px] px-4 py-2";
  const text = isMenu ? "text-sm" : "text-[11px]";

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.06] bg-black/40 p-0.5",
        "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]",
        isMenu && "mobile-menu-lang border-white/10 bg-black/60 p-1",
        className
      )}
    >
      {locales.map(({ code, label }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={isActive}
            aria-label={`${label} — ${t("language")}`}
            onClick={() => {
              router.replace(pathname, { locale: code });
              onLocaleChange?.();
            }}
            className={cn(
              "rounded-full font-semibold uppercase tracking-[0.12em] transition-all duration-300",
              padding,
              text,
              isActive
                ? "bg-primary text-off-white shadow-[0_0_10px_rgb(227_42_57/0.22)]"
                : "text-subtle hover:text-off-white"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
