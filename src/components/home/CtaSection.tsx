"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact";
import { Container } from "@/components/ui/Container";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { scaleIn } from "@/lib/motion";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <ParallaxSection id="contact" className="section-y section-defer relative overflow-hidden">
      <SectionAtmosphere variant="cta" />

      <Container className="relative max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={scaleIn}
          className="section-grid lg:grid-cols-2 lg:items-start"
        >
          <Parallax speed="slow">
            <div className="premium-card premium-card-interactive cta-panel group relative flex flex-col justify-center lg:sticky lg:top-28">
              <div className="premium-card-glow pointer-events-none" aria-hidden />
              <div className="relative">
                <h2 className="text-display-sm">{t("title")}</h2>
                <div className="premium-divider mt-5 max-w-[7rem]" />
                <p className="text-body-lg mt-5 max-w-md">{t("subtitle")}</p>
                <ul className="mt-6 space-y-2.5">
                  {(["point1", "point2", "point3"] as const).map((key) => (
                    <li key={key} className="text-body flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Parallax>

          <Parallax speed="lift">
            <ContactForm source="home-cta" />
          </Parallax>
        </motion.div>
      </Container>
    </ParallaxSection>
  );
}
