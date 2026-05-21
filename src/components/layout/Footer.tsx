import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MotionReveal } from "@/components/ui/motion";

export async function Footer({ className }: { className?: string }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={`relative border-t border-white/5 bg-surface/90 backdrop-blur-sm ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="mx-auto max-w-7xl py-14 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <MotionReveal variant="fadeUp">
            <div>
              <p className="text-xl font-semibold tracking-tight text-off-white">
                {BRAND.name}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                {t("tagline")}
              </p>
              <a
                href={BRAND.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                {t("telegram")}
              </a>
              <div className="mt-8">
                <p className="premium-label mb-4">{t("social")}</p>
                <SocialLinks />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal
            variant="fadeUp"
            delay={0.1}
            className="flex flex-col gap-10 sm:flex-row sm:gap-20 md:flex-col md:gap-10"
          >
            <div>
              <p className="premium-label mb-4">{nav("language")}</p>
              <LanguageSwitcher />
            </div>
            <div>
              <p className="premium-label mb-4">{t("menu")}</p>
              <ul className="space-y-3">
                {(["home", "services", "about"] as const).map((key) => (
                  <li key={key}>
                    <Link
                      href={key === "home" ? "/" : `/${key}`}
                      className="inline-flex min-h-[44px] items-center text-sm font-medium text-muted transition-colors hover:text-off-white active:text-off-white"
                    >
                      {nav(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal variant="fadeIn" delay={0.2}>
          <div className="premium-divider mt-12" />
          <p className="mt-6 text-center text-xs text-subtle sm:text-left">
            © {year} {BRAND.name}. {t("rights")}
          </p>
        </MotionReveal>
      </div>
    </footer>
  );
}
