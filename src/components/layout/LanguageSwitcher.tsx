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
};

export function LanguageSwitcher({ className, size = "md" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const padding = size === "sm" ? "px-3 py-2" : "px-3.5 py-2";
  const text = size === "sm" ? "text-[10px]" : "text-[11px]";

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.06] bg-black/40 p-0.5",
        "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]",
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
            onClick={() => router.replace(pathname, { locale: code })}
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
