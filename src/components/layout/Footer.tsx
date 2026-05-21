import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MotionReveal } from "@/components/ui/motion";

const navKeys = ["home", "services", "about"] as const;

export async function Footer({ className }: { className?: string }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={`site-footer relative ${className ?? ""}`}
    >
      <div className="site-footer-ambient pointer-events-none" aria-hidden />
      <div className="site-footer-topline pointer-events-none" aria-hidden />

      <Container className="relative">
        <div className="site-footer-grid">
          <MotionReveal variant="fadeUp" className="site-footer-primary">
            <div className="site-footer-brand">
              <Link href="/" className="brand-logo-mark-wrap inline-flex" aria-label={BRAND.name}>
                <BrandLogo size={44} className="h-11 w-11" />
              </Link>
              <p className="site-footer-logo mt-4">{BRAND.name}</p>
              <p className="site-footer-tagline">{t("tagline")}</p>
            </div>

            <div className="site-footer-cta">
              <span className="site-footer-cta-glow pointer-events-none" aria-hidden />
              <span className="site-footer-cta-edge pointer-events-none" aria-hidden />
              <div className="site-footer-cta-inner">
                <p className="premium-eyebrow text-primary/80">{t("ctaEyebrow")}</p>
                <h2 className="site-footer-cta-title">{t("ctaTitle")}</h2>
                <p className="site-footer-cta-sub">{t("ctaSubtitle")}</p>
                <a
                  href={BRAND.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium btn-shine site-footer-cta-btn mt-6 inline-flex w-full items-center justify-center gap-2 sm:mt-7 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                  {t("ctaButton")}
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                </a>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal
            variant="fadeUp"
            delay={0.08}
            className="site-footer-secondary"
          >
            <div className="site-footer-col">
              <p className="site-footer-col-label">{t("menu")}</p>
              <ul className="site-footer-nav">
                {navKeys.map((key) => (
                  <li key={key}>
                    <Link
                      href={key === "home" ? "/" : `/${key}`}
                      className="site-footer-nav-link"
                    >
                      {nav(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-footer-col site-footer-col-divider">
              <p className="site-footer-col-label">{nav("language")}</p>
              <LanguageSwitcher />
            </div>
          </MotionReveal>
        </div>

        <div className="site-footer-divider" aria-hidden />

        <MotionReveal variant="fadeIn" delay={0.12}>
          <div className="site-footer-social">
            <div className="site-footer-social-copy">
              <p className="site-footer-col-label">{t("social")}</p>
              <p className="site-footer-social-hint">{t("socialHint")}</p>
            </div>
            <SocialLinks variant="footer" />
          </div>
        </MotionReveal>

        <div className="site-footer-divider" aria-hidden />

        <MotionReveal variant="fadeIn" delay={0.16}>
          <div className="site-footer-bar">
            <p className="site-footer-copy">
              © {year} {BRAND.name}. {t("rights")}
            </p>
            <a
              href={BRAND.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-telegram"
            >
              {t("telegram")}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </MotionReveal>
      </Container>
    </footer>
  );
}
