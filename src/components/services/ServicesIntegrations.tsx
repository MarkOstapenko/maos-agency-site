"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Parallax, ParallaxSection } from "@/components/ui/Parallax";
import { IntegrationsEcosystem } from "./integrations/IntegrationsEcosystem";

export function ServicesIntegrations() {
  const t = useTranslations("servicesPage.integrations");

  return (
    <ParallaxSection className="integrations-section section-band section-y relative overflow-hidden">
      <div className="integrations-ambient pointer-events-none absolute inset-0" aria-hidden />
      <div className="integrations-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="integrations-grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative">
        <Parallax speed="subtle" className="section-head">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <Parallax speed="medium">
          <IntegrationsEcosystem />
        </Parallax>
      </Container>
    </ParallaxSection>
  );
}
